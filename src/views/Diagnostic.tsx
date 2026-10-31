import { useMemo, useState } from 'react'
import { diagnosticItems, diagReadingTexts, diagSpeaking } from '../content'
import { VoiceTry } from '../components/Listening'
import { Card, Header, pct, Progress, Speak } from '../components/ui'
import { LEVELS, scoreDiagnostic } from '../lib/diagnostic'
import { useStore, useStudyTimer } from '../store'
import { SKILL_ES, type Skill } from '../types'

const SECTION_ES: Record<string, string> = { grammar: 'Gramática', vocabulary: 'Vocabulario', listening: 'Escucha', reading: 'Lectura' }

export function DiagnosticView() {
  const { profile, updateProfile, record } = useStore()
  useStudyTimer()
  const [stage, setStage] = useState<'intro' | 'test' | 'speaking' | 'result'>(profile.diagnostic ? 'result' : 'intro')
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [sp, setSp] = useState(0)
  const items = diagnosticItems
  const result = profile.diagnostic

  const finishTest = async (all: boolean[]) => {
    const r = scoreDiagnostic(items.map((it, k) => ({ level: it.level, skill: it.skill, correct: all[k] })))
    await updateProfile((p) => ({ ...p, diagnostic: r }))
  }

  if (stage === 'intro')
    return (
      <div>
        <Header title="Prueba diagnóstica" subtitle="60 preguntas + 5 tareas de habla · 30–40 minutos" back="#/" />
        <Card>
          <p>Evalúa gramática (20), vocabulario (15), comprensión auditiva (15) y lectura (10), desde A1 hasta B2. Al final verás tu nivel estimado y tus habilidades más débiles.</p>
          <p className="warn-box">
            Esta prueba es una <b>estimación orientativa</b> para organizar tu estudio. <b>No equivale a una certificación oficial</b> (como Cambridge, TOEFL o IELTS). Para una referencia externa gratuita puedes usar EF SET.
          </p>
          <p className="muted small">Responde sin diccionario. Si no sabes, elige la opción que te parezca más probable: es normal no saber las preguntas difíciles.</p>
          <button className="btn primary" onClick={() => setStage('test')}>
            Empezar prueba
          </button>
        </Card>
      </div>
    )

  if (stage === 'test') {
    const it = items[i]
    const ex = it.exercise
    const text = it.textId ? diagReadingTexts[it.textId] : undefined
    return (
      <div>
        <Header title="Prueba diagnóstica" subtitle={`${SECTION_ES[it.skill]} · pregunta ${i + 1} de ${items.length}`} />
        <Progress value={i} max={items.length} />
        <Card>
          {it.audio && (
            <div className="audio-row">
              <p className="muted small">Escucha (puedes repetir hasta 2 veces):</p>
              <LimitedSpeak key={it.id} text={it.audio} />
            </div>
          )}
          {text && <p className="reading-text">{text.text}</p>}
          {ex.kind === 'choice' && (
            <>
              <p className="prompt">{ex.prompt}</p>
              <div className="options">
                {ex.options.map((o, k) => (
                  <button
                    key={k}
                    className="option"
                    onClick={async () => {
                      const ok = k === ex.answer
                      const all = [...answers, ok]
                      setAnswers(all)
                      record([{ skill: it.skill, itemId: it.id, correct: ok, given: o, expected: ex.options[ex.answer], source: 'diagnostic' }])
                      if (i + 1 < items.length) setI(i + 1)
                      else {
                        await finishTest(all)
                        setStage('speaking')
                      }
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    )
  }

  if (stage === 'speaking') {
    const t = diagSpeaking[sp]
    return (
      <div>
        <Header title="Tareas de habla (sin puntaje)" subtitle={`Tarea ${sp + 1} de ${diagSpeaking.length}`} />
        <Card>
          <p className="muted small">Estas tareas no suman puntaje: la app no puede evaluar tu pronunciación de forma confiable. Sirven para que te escuches y compares tu progreso en el mes 3.</p>
          <div className="bubble other">
            {t.prompt} <Speak text={t.prompt} alt />
          </div>
          <p className="muted small">{t.es} Habla entre 30 y 60 segundos.</p>
          <VoiceTry key={sp} onResult={(heard) => record([{ skill: 'speaking', itemId: `diag-speak-${sp + 1}`, correct: true, given: heard, source: 'diagnostic' }])} />
          <div className="row">
            <button className="btn" onClick={() => setStage('result')}>
              Saltar tareas de habla
            </button>
            <button className="btn primary" onClick={() => (sp + 1 < diagSpeaking.length ? setSp(sp + 1) : setStage('result'))}>
              {sp + 1 < diagSpeaking.length ? 'Siguiente tarea →' : 'Ver resultado'}
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return <DiagnosticResultView onRetake={() => { setI(0); setAnswers([]); setSp(0); setStage('intro') }} result={result} />
}

function LimitedSpeak({ text }: { text: string }) {
  const [left, setLeft] = useState(2)
  return (
    <div onClickCapture={(e) => (left > 0 ? setLeft(left - 1) : e.stopPropagation())}>
      {left > 0 ? <Speak text={text} rate={0.9} label={`Escuchar (${left})`} /> : <span className="muted small">Ya no quedan reproducciones.</span>}
    </div>
  )
}

function DiagnosticResultView({ result, onRetake }: { result: ReturnType<typeof useStore>['profile']['diagnostic']; onRetake: () => void }) {
  const levels = useMemo(() => LEVELS, [])
  if (!result) return null
  return (
    <div>
      <Header title="Resultado del diagnóstico" subtitle={`Realizado el ${result.date}`} back="#/" />
      <Card className="hero-result">
        <p className="muted">Nivel estimado</p>
        <p className="level-big">{result.label}</p>
        <p className="small muted">Estimación orientativa. No equivale a una certificación oficial.</p>
      </Card>
      <Card>
        <h3>Aciertos por nivel</h3>
        {levels.map((l) => (
          <div key={l} className="bar-row">
            <span>{l}</span>
            <Progress value={result.byLevel[l].correct} max={result.byLevel[l].total} />
            <span>
              {result.byLevel[l].correct}/{result.byLevel[l].total}
            </span>
          </div>
        ))}
        <p className="small muted">Regla: alcanzas un nivel si aciertas al menos 60% de sus preguntas y alcanzaste los anteriores.</p>
      </Card>
      <Card>
        <h3>Aciertos por habilidad</h3>
        {Object.entries(result.bySkill).map(([s, v]) => (
          <div key={s} className="bar-row">
            <span>{SKILL_ES[s as Skill]}</span>
            <Progress value={v.correct} max={v.total} />
            <span>{pct(v.correct, v.total)}</span>
          </div>
        ))}
        <p>
          <b>A reforzar:</b> {result.weak.map((s) => SKILL_ES[s]).join(', ')}
        </p>
      </Card>
      <Card>
        <p>
          El plan empieza por la lección 1 aunque tengas buen nivel: las primeras lecciones son rápidas y construyen tu vocabulario de Data Analyst. Si sientes que una lección es demasiado fácil, complétala rápido y avanza.
        </p>
        <div className="row">
          <a className="btn primary" href="#/">
            Ir a mi plan de hoy
          </a>
          <button className="btn" onClick={onRetake}>
            Repetir diagnóstico
          </button>
        </div>
      </Card>
    </div>
  )
}
