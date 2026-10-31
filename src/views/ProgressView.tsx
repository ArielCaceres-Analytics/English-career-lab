import { exerciseById, topicById, vocabOrder } from '../content'
import { Card, Header, pct, Progress } from '../components/ui'
import { LESSONS, lessonsDone } from '../lib/plan'
import { accuracyBySkill, errorsByTopic, frequentErrors, minutesSeries, streak, vocabCounts } from '../lib/stats'
import { useStore } from '../store'
import { SKILL_ES, type Skill } from '../types'

export function ProgressView() {
  const { profile, attempts, days, cards } = useStore()
  const totalMin = Math.round([...days.values()].reduce((s, d) => s + d.seconds, 0) / 60)
  const series = minutesSeries(days, 14)
  const maxMin = Math.max(45, ...series.map((s) => s.minutes))
  const weekMin = series.slice(-7).reduce((s, d) => s + d.minutes, 0)
  const acc = accuracyBySkill(attempts)
  const graded = attempts.filter((a) => a.source !== 'diagnostic' && !a.itemId.includes('-done:') && !a.itemId.startsWith('iq:'))
  const correct = graded.filter((a) => a.correct).length
  const voc = vocabCounts(cards)
  const errors = frequentErrors(attempts)
  const topics = [...errorsByTopic(attempts).entries()].filter(([, v]) => v.wrong > 0).sort((a, b) => b[1].wrong / b[1].total - a[1].wrong / a[1].total).slice(0, 5)
  const activities = [...days.values()].reduce((s, d) => s + d.activities, 0)
  const dict = attempts.filter((a) => a.itemId.startsWith('dict:')).slice(-20)
  const dictAcc = dict.length ? dict.reduce((s, a) => s + (a.score ?? 0), 0) / dict.length : null
  const speakPractices = attempts.filter((a) => a.skill === 'speaking' && (a.itemId.includes('-done:') || a.itemId.startsWith('iq:'))).length
  const speakSR = attempts.filter((a) => a.skill === 'speaking' && a.score !== undefined)
  const writing = attempts.filter((a) => a.skill === 'writing' && /^w\d+:try/.test(a.itemId))
  const tests = Object.entries(profile.weekends).filter(([, w]) => w.testScore !== undefined)

  const skills: Skill[] = ['grammar', 'vocabulary', 'listening', 'reading']
  return (
    <div>
      <Header title="Mi progreso" subtitle="Solo datos reales registrados en este dispositivo" />
      <div className="stats-grid">
        <Card>
          <p className="muted small">Minutos totales</p>
          <p className="big">{totalMin}</p>
          <p className="small muted">{weekMin} en los últimos 7 días</p>
        </Card>
        <Card>
          <p className="muted small">Racha</p>
          <p className="big">🔥 {streak(days, profile)}</p>
          <p className="small muted">días seguidos</p>
        </Card>
        <Card>
          <p className="muted small">Lecciones</p>
          <p className="big">
            {lessonsDone(profile)} <span className="muted">/ {LESSONS}</span>
          </p>
          <p className="small muted">{activities} bloques completados</p>
        </Card>
        <Card>
          <p className="muted small">Respuestas correctas</p>
          <p className="big">{pct(correct, graded.length)}</p>
          <p className="small muted">
            {correct} de {graded.length} respuestas
          </p>
        </Card>
      </div>

      <Card>
        <h3>Minutos por día (últimos 14 días)</h3>
        <div className="chart" role="img" aria-label="Minutos de estudio por día">
          {series.map((s) => (
            <div key={s.date} className="col" title={`${s.date}: ${s.minutes} min`}>
              <span className="val">{s.minutes || ''}</span>
              <div className={`bar${s.minutes >= 45 ? ' met' : ''}`} style={{ height: `${(s.minutes / maxMin) * 100}%` }} />
              <span className="lbl">{s.date.slice(8)}</span>
            </div>
          ))}
        </div>
        <p className="small muted">Las barras verdes alcanzaron la meta de 45 minutos.</p>
      </Card>

      <Card>
        <h3>Rendimiento por habilidad</h3>
        {skills.map((s) => (
          <div key={s} className="bar-row">
            <span>{SKILL_ES[s]}</span>
            <Progress value={acc[s].correct} max={acc[s].total || 1} />
            <span>{acc[s].total ? `${pct(acc[s].correct, acc[s].total)} (${acc[s].total})` : 'sin datos'}</span>
          </div>
        ))}
        <div className="bar-row">
          <span>Dictado (palabras)</span>
          <Progress value={dictAcc ?? 0} max={1} />
          <span>{dictAcc === null ? 'sin datos' : `${Math.round(dictAcc * 100)}% · meta 80%`}</span>
        </div>
        <div className="bar-row">
          <span>Speaking</span>
          <span className="grow small">
            {speakPractices} turnos practicados
            {speakSR.length > 0 && ` · palabras reconocidas por el navegador: ${Math.round((speakSR.reduce((s, a) => s + (a.score ?? 0), 0) / speakSR.length) * 100)}% (${speakSR.length} intentos, no es evaluación fonética)`}
          </span>
        </div>
        <div className="bar-row">
          <span>Escritura</span>
          <span className="grow small">{writing.length ? `${writing.filter((w) => w.correct).length} de ${writing.length} textos cumplieron todos los criterios` : 'sin datos'}</span>
        </div>
      </Card>

      <div className="grid2">
        <Card>
          <h3>Vocabulario</h3>
          <p>
            <b>{profile.introducedWords}</b> introducidas de {vocabOrder.length}
          </p>
          <p>
            <b>{voc.learning}</b> aprendiendo · <b>{voc.known}</b> dominadas
          </p>
          <Progress value={voc.known} max={1000} />
          <p className="small muted">Meta del mes 3: 1,000 generales + 150 de trabajo.</p>
        </Card>
        <Card>
          <h3>Mini-tests semanales</h3>
          {tests.length ? (
            <ul className="plain">
              {tests.map(([w, t]) => (
                <li key={w}>
                  Semana {w}: <b>{t.testScore}/15</b> ({pct(t.testScore ?? 0, 15)})
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Aún no hiciste ningún mini-test.</p>
          )}
          {profile.diagnostic && (
            <p className="small">
              Diagnóstico ({profile.diagnostic.date}): <b>{profile.diagnostic.label}</b>
            </p>
          )}
        </Card>
      </div>

      <Card>
        <h3>Errores frecuentes</h3>
        {topics.length > 0 && (
          <>
            <p className="muted small">Temas con más errores:</p>
            <ul className="plain">
              {topics.map(([id, v]) => (
                <li key={id}>
                  <a href={`#/practice/grammar/${id}`}>{topicById[id]?.titleEs ?? id}</a>: {v.wrong} errores de {v.total}
                </li>
              ))}
            </ul>
          </>
        )}
        {errors.length ? (
          <ul className="wrong-list">
            {errors.map((e) => {
              const ex = exerciseById[e.itemId]?.exercise
              const prompt = ex ? (ex.kind === 'order' ? ex.sentence : ex.prompt) : e.itemId
              return (
                <li key={e.itemId}>
                  {prompt} — respondiste “{e.given}”, correcto: <b>{e.expected}</b> <span className="muted">({e.wrong}×)</span>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="muted">Sin errores registrados todavía.</p>
        )}
      </Card>

      <Card>
        <details>
          <summary>
            <b>Cómo se calculan estos números</b>
          </summary>
          <ul className="small">
            <li>
              <b>Minutos</b>: se suman 10 segundos cada 10 segundos solo si la app está visible y tocaste, escribiste o desplazaste la pantalla en los últimos 2 minutos.
            </li>
            <li>
              <b>Racha</b>: días seguidos con al menos 20 minutos o una lección completada.
            </li>
            <li>
              <b>Gramática, escucha y lectura</b>: % de respuestas correctas validadas automáticamente (sin contar el diagnóstico).
            </li>
            <li>
              <b>Vocabulario</b>: en las tarjetas tú calificas si la recordaste (“Otra vez” cuenta como incorrecta); en los mini-tests la respuesta se valida automáticamente.
            </li>
            <li>
              <b>Dictado</b>: % de palabras escritas correctamente en tus últimas 20 frases (sin importar mayúsculas ni puntuación).
            </li>
            <li>
              <b>Palabra dominada</b>: su intervalo de repaso llegó a 21 días o más (algoritmo SM-2).
            </li>
            <li>
              <b>Speaking</b>: se cuentan los turnos practicados. Si el navegador transcribe tu voz, se muestra qué % de las palabras del modelo reconoció; no es una evaluación de pronunciación.
            </li>
            <li>
              <b>Escritura</b>: un texto aprueba si cumple la longitud, todos los elementos pedidos y no tiene ninguno de los errores frecuentes que la app revisa.
            </li>
          </ul>
        </details>
      </Card>
    </div>
  )
}
