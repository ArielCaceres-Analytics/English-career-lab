import { dueCards } from '../components/Review'
import { Card, Progress, Speak } from '../components/ui'
import { currentLesson, LESSONS, lessonDialogue, lessonExercises, lessonPhrase, lessonsDone, weekOf, WEEKS } from '../lib/plan'
import { today } from '../lib/normalize'
import { streak } from '../lib/stats'
import { LESSON_STEPS, useStore } from '../store'
import { weekendUnlocked } from './Weekend'

const isWeekend = () => [0, 6].includes(new Date().getDay())

export function Home() {
  const { profile, days, cards } = useStore()
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

  return (
    <div className="home">
      <header className="hero">
        <div>
          <p className="muted">Hola, Ariel 👋</p>
          <h1>Tu plan de hoy</h1>
          <p className="muted small">
            Fase 1 · Semana {week} de {WEEKS} · Meta: conversación básica al mes 3
          </p>
        </div>
        <div className="streak" title="Días seguidos con 20+ minutos de estudio o una lección completada">
          <span className="flame">🔥</span>
          <b>{st}</b>
          <span className="small">{st === 1 ? 'día' : 'días'}</span>
        </div>
      </header>

      {!profile.diagnostic && (
        <Card className="cta">
          <h3>Empieza con la prueba diagnóstica</h3>
          <p>60 preguntas para estimar tu nivel (A1–B2) e identificar tus habilidades débiles. Toma unos 30 minutos.</p>
          <a className="btn primary" href="#/diagnostic">
            Hacer diagnóstico
          </a>
        </Card>
      )}

      <Card>
        <div className="goal-row">
          <div>
            <p className="muted small">Minutos de estudio hoy</p>
            <p className="big">
              {minutes} <span className="muted">/ {goal} min</span>
            </p>
          </div>
          <div className="muted small right">{isWeekend() ? 'Fin de semana: 60 min' : 'Lunes a viernes: 45 min'}</div>
        </div>
        <Progress value={minutes} max={goal} />
      </Card>

      <Card className="lesson-card">
          {allDone ? (
            <>
              <h3>🎉 Completaste las 65 lecciones de la fase 1</h3>
              <p>Haz la evaluación del mes 3 repitiendo el diagnóstico y sigue con tus repasos diarios.</p>
            </>
          ) : (
            <>
              <p className="muted small">Lección {n} de {LESSONS}</p>
              <h3>{lessonExercises(n, profile, new Set()).title}</h3>
              <p className="muted">
                Diálogo: {lessonDialogue(n).title} · {stepsDone}/5 bloques
              </p>
              <Progress value={stepsDone} max={5} />
              <a className="btn primary big-btn" href={`#/lesson/${n}`}>
                {stepsDone ? 'Continuar lección' : 'Empezar lección'} →
              </a>
            </>
          )}
        </Card>

      <Card className="lesson-card">
        <p className="muted small">Sesión de fin de semana · Semana {wkWeek}</p>
        <h3>Sábado: lectura y repaso · Domingo: test y conversación</h3>
        {weekendUnlocked(wkWeek, profile.lessons) ? (
          <>
            <Progress value={wkDone} max={6} />
            <a className={`btn ${isWeekend() ? 'primary big-btn' : ''}`} href={`#/weekend/${wkWeek}`}>
              {wkDone ? 'Continuar sesión' : 'Abrir sesión'} →
            </a>
          </>
        ) : (
          <p className="muted small">🔒 Se desbloquea al completar tu primera lección de la semana.</p>
        )}
      </Card>

      <div className="grid2">
        <Card>
          <p className="muted small">Repasos pendientes hoy</p>
          <p className="big">{due.length}</p>
          <p className="small muted">
            {due.length - dueErrors} tarjetas · {dueErrors} errores
          </p>
          <a className="btn" href="#/practice/review">
            Repasar ahora
          </a>
        </Card>
        <Card>
          <p className="muted small">Frase Data Analyst del día</p>
          <p className="phrase">“{phrase.phrase}”</p>
          <p className="small muted">{phrase.es}</p>
          <Speak text={phrase.phrase} label="Escuchar" />
        </Card>
      </div>
    </div>
  )
}
