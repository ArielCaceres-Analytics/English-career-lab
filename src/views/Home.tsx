import { topicById } from '../content'
import { Icon, type IconName } from '../components/icons'
import { dueCards } from '../components/Review'
import { Card, Progress, Speak } from '../components/ui'
import { currentLesson, LESSONS, lessonDialogue, lessonExercises, lessonPhrase, lessonsDone, weekOf, WEEKS } from '../lib/plan'
import { today } from '../lib/normalize'
import { errorsByTopic, streak } from '../lib/stats'
import { PROFILE } from '../profile'
import { LESSON_STEPS, useStore } from '../store'
import type { StepKey } from '../types'
import { STEP_INFO } from './Lesson'
import { weekendUnlocked } from './Weekend'

const isWeekend = () => [0, 6].includes(new Date().getDay())

const STEP_ICON: Record<StepKey, IconName> = { review: 'review', grammar: 'grammar', listening: 'listening', output: 'speaking', da: 'data' }
const STEP_SKILL: Record<StepKey, string> = { review: 'vocabulary', grammar: 'grammar', listening: 'listening', output: 'speaking', da: 'data' }

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 19 ? 'Good afternoon' : 'Good evening'
}

/** Anillo de minutos de hoy contra la meta del día. */
function Ring({ value, max }: { value: number; max: number }) {
  const r = 42
  const c = 2 * Math.PI * r
  const pct = Math.min(1, max ? value / max : 0)
  return (
    <div className="ring" role="img" aria-label={`${value} de ${max} minutos hoy`}>
      <svg viewBox="0 0 100 100" width="112" height="112">
        <circle cx="50" cy="50" r={r} className="ring-bg" />
        <circle cx="50" cy="50" r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <div className="ring-txt">
        <b>{value}</b>
        <span>/ {max} min</span>
      </div>
    </div>
  )
}

const HOW: { icon: IconName; en: string; es: string; d: string }[] = [
  { icon: 'listening', en: 'Listen first', es: 'Escucha primero', d: 'Oye el diálogo sin leer. Luego activa la transcripción para revisar lo que no entendiste.' },
  { icon: 'speaking', en: 'Say it out loud', es: 'Dilo en voz alta', d: 'Repite cada frase (shadowing) y grábate. Hablar desde el día 1 es lo que más acelera.' },
  { icon: 'review', en: 'Fix your mistakes', es: 'Corrige tus errores', d: 'Cada error vuelve al día siguiente y se repite hasta que lo aciertes 3 veces seguidas.' },
  { icon: 'check', en: 'Prove it', es: 'Demuéstralo', d: 'El domingo, el mini-test y la conversación simulada confirman lo que dominas.' },
]

export function Home() {
  const { profile, days, cards, attempts } = useStore()
  const n = currentLesson(profile)
  const allDone = lessonsDone(profile) >= LESSONS
  const goal = isWeekend() ? 60 : 45
  const minutes = Math.round((days.get(today())?.seconds ?? 0) / 60)
  const st = streak(days, profile)
  const due = dueCards(cards)
  const dueErrors = due.filter((c) => c.kind === 'error').length
  const lesson = profile.lessons[n]
  const stepsDone = LESSON_STEPS.filter((s) => lesson?.steps[s]).length
  const week = weekOf(n)
  // Fin de semana: la sesión de la semana más reciente con lecciones hechas.
  const wkWeek = weekendUnlocked(week, profile.lessons) ? week : Math.max(1, week - 1)
  const wk = profile.weekends[wkWeek]
  const wkDone = wk ? Object.values(wk.steps).filter(Boolean).length : 0
  const phrase = lessonPhrase(n)
  const hard = [...errorsByTopic(attempts).entries()]
    .filter(([id, v]) => v.wrong > 0 && topicById[id])
    .sort((a, b) => b[1].wrong / b[1].total - a[1].wrong / a[1].total)
    .slice(0, 3)

  return (
    <div className="home">
      <header className="home-hero">
        <div className="home-hero-txt">
          <p className="hello">
            {greeting()}, {PROFILE.name}
          </p>
          <h1>Today's plan</h1>
          <p className="es">
            Tu plan de hoy · Fase 1 · Semana {week} de {WEEKS}
          </p>
          <div className="pills">
            <span className="pill" title="Nivel estimado por la prueba diagnóstica">
              <Icon name="target" size={16} /> {profile.diagnostic ? `Nivel ${profile.diagnostic.level}` : 'Nivel: sin diagnóstico'}
            </span>
            <span className="pill" title="Días seguidos con 20+ minutos de estudio o una lección completada">
              <Icon name="flame" size={16} /> {st} {st === 1 ? 'día' : 'días'} de racha
            </span>
            <span className="pill">
              <Icon name="calendar" size={16} /> Meta: conversación básica al mes 3
            </span>
          </div>
        </div>
        <Ring value={minutes} max={goal} />
      </header>

      {!profile.diagnostic && (
        <Card className="cta">
          <div className="cta-row">
            <div>
              <h3>Start with the placement test</h3>
              <p>Empieza con la prueba diagnóstica: 60 preguntas para estimar tu nivel (A1–B2) y detectar tus habilidades débiles. Toma unos 30 minutos.</p>
            </div>
            <a className="btn primary" href="#/diagnostic">
              Hacer diagnóstico <Icon name="arrow" size={18} />
            </a>
          </div>
        </Card>
      )}

      <Card className="session">
        {allDone ? (
          <>
            <h3>Completaste las 65 lecciones de la fase 1</h3>
            <p>Haz la evaluación del mes 3 repitiendo el diagnóstico y sigue con tus repasos diarios.</p>
          </>
        ) : (
          <>
            <div className="section-title">
              <div>
                <h2>Today's session</h2>
                <p className="es">
                  Sesión de hoy · Lección {n} de {LESSONS} · {stepsDone}/5 bloques
                </p>
              </div>
              <span className="time-chip">
                <Icon name="clock" size={16} /> 45 min
              </span>
            </div>
            <h3 className="session-topic">{lessonExercises(n, profile, new Set()).title}</h3>
            <p className="muted">Diálogo: {lessonDialogue(n).title}</p>
            <ol className="blocks">
              {LESSON_STEPS.map((s) => {
                const done = !!lesson?.steps[s]
                return (
                  <li key={s} className={`block sk-${STEP_SKILL[s]}${done ? ' done' : ''}`}>
                    <span className="block-ic">
                      <Icon name={done ? 'check' : STEP_ICON[s]} size={18} />
                    </span>
                    <span className="grow">{STEP_INFO[s].title}</span>
                    <span className="muted small">{STEP_INFO[s].min} min</span>
                  </li>
                )
              })}
            </ol>
            <a className="btn primary big-btn" href={`#/lesson/${n}`}>
              {stepsDone ? 'Continuar lección' : 'Empezar lección'} <Icon name="arrow" size={18} />
            </a>
          </>
        )}
      </Card>

      <div className="grid2">
        <Card>
          <div className="mini-head">
            <span className="mini-ic sk-vocabulary">
              <Icon name="review" />
            </span>
            <div>
              <b>Reviews due</b>
              <p className="es">Repasos pendientes hoy</p>
            </div>
          </div>
          <p className="big">{due.length}</p>
          <p className="small muted">
            {due.length - dueErrors} tarjetas · {dueErrors} errores
          </p>
          <a className="btn" href="#/practice/review">
            Repasar ahora
          </a>
        </Card>
        <Card className="da-card">
          <div className="mini-head">
            <span className="mini-ic sk-data">
              <Icon name="data" />
            </span>
            <div>
              <b>Data Analyst phrase</b>
              <p className="es">Frase de trabajo del día</p>
            </div>
          </div>
          <p className="phrase">“{phrase.phrase}”</p>
          <p className="small muted">{phrase.es}</p>
          <Speak text={phrase.phrase} label="Escuchar" />
        </Card>
      </div>

      <Card>
        <div className="mini-head">
          <span className="mini-ic sk-reading">
            <Icon name="calendar" />
          </span>
          <div>
            <b>Weekend session · Semana {wkWeek}</b>
            <p className="es">Sábado: lectura y repaso · Domingo: test y conversación (60 min cada día)</p>
          </div>
        </div>
        {weekendUnlocked(wkWeek, profile.lessons) ? (
          <>
            <Progress value={wkDone} max={6} />
            <a className={`btn ${isWeekend() ? 'primary' : ''}`} href={`#/weekend/${wkWeek}`} style={{ marginTop: '0.8rem' }}>
              {wkDone ? 'Continuar sesión' : 'Abrir sesión'} <Icon name="arrow" size={18} />
            </a>
          </>
        ) : (
          <p className="muted small locked-line">
            <Icon name="lock" size={16} /> Se desbloquea al completar tu primera lección de la semana.
          </p>
        )}
      </Card>

      <Card>
        <div className="mini-head">
          <span className="mini-ic sk-speaking">
            <Icon name="alert" />
          </span>
          <div>
            <b>What you struggle with most</b>
            <p className="es">Lo que más te cuesta</p>
          </div>
        </div>
        {hard.length ? (
          <>
            <ul className="hard">
              {hard.map(([id, v]) => (
                <li key={id}>
                  <a href={`#/practice/grammar/${id}`}>{topicById[id].titleEs}</a>
                  <Progress value={v.wrong} max={v.total} />
                  <span className="muted small">
                    {v.wrong} de {v.total} con error
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn" href="#/practice/review">
              Repasar mis errores <Icon name="arrow" size={18} />
            </a>
          </>
        ) : (
          <p className="muted small">Aún no hay errores registrados. Cuando practiques, aquí verás los temas que más te cuestan para repasarlos primero.</p>
        )}
      </Card>

      <section className="how">
        <h2>How to study</h2>
        <p className="es">Cómo estudiar cada día</p>
        <div className="how-grid">
          {HOW.map((h, i) => (
            <div key={h.en} className="how-step">
              <span className="how-n">{i + 1}</span>
              <Icon name={h.icon} size={22} />
              <b>{h.en}</b>
              <span className="es">{h.es}</span>
              <p className="small muted">{h.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
