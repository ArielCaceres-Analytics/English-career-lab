import { useMemo, useState } from 'react'
import { ExerciseRunner } from '../components/Exercise'
import { InterviewBlock, ReadingBlock, RolePlay } from '../components/Output'
import { ReviewSession } from '../components/Review'
import { Card, Header } from '../components/ui'
import { weekendContent, weeklyTest } from '../lib/plan'
import { useStore, useStudyTimer } from '../store'
import type { WeekendStepKey } from '../types'

const STEPS: { key: WeekendStepKey; title: string; day: string; min: number }[] = [
  { key: 'reading1', title: 'Lectura graduada 1', day: 'Sábado', min: 20 },
  { key: 'reading2', title: 'Lectura graduada 2', day: 'Sábado', min: 20 },
  { key: 'review', title: 'Repaso de la semana', day: 'Sábado', min: 20 },
  { key: 'test', title: 'Mini-test semanal (15 preguntas)', day: 'Domingo', min: 20 },
  { key: 'conversation', title: 'Conversación simulada', day: 'Domingo', min: 25 },
  { key: 'interview', title: 'Pregunta de entrevista', day: 'Domingo', min: 15 },
]

export function weekendUnlocked(week: number, lessons: Record<number, { completed?: string }>) {
  for (let n = (week - 1) * 5 + 1; n <= week * 5; n++) if (lessons[n]?.completed) return true
  return false
}

export function WeekendView({ week }: { week: number }) {
  const { profile, completeWeekendStep } = useStore()
  useStudyTimer()
  const c = weekendContent(week)
  const state = profile.weekends[week]
  const [step, setStep] = useState<WeekendStepKey>(STEPS.find((s) => !state?.steps[s.key])?.key ?? 'reading1')
  const test = useMemo(() => weeklyTest(week, profile), [week]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!weekendUnlocked(week, profile.lessons))
    return (
      <div>
        <Header title={`Fin de semana · Semana ${week}`} back="#/" />
        <Card>🔒 Completa al menos una lección de la semana {week} para desbloquear esta sesión.</Card>
      </div>
    )

  const done = async (k: WeekendStepKey, score?: number) => {
    await completeWeekendStep(week, k, score)
    const next = STEPS.find((s) => s.key !== k && !profile.weekends[week]?.steps[s.key])
    if (next) setStep(next.key)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <Header title={`Fin de semana · Semana ${week}`} subtitle="Sábado 60 min (lectura + repaso) · Domingo 60 min (test + conversación)" back="#/" />
      {state?.testScore !== undefined && <Card className="success">Mini-test: {state.testScore} / 15</Card>}
      <nav className="steps">
        {STEPS.map((s, i) => (
          <button key={s.key} className={`step${step === s.key ? ' on' : ''}${state?.steps[s.key] ? ' done' : ''}`} onClick={() => setStep(s.key)}>
            <span className="step-n">{state?.steps[s.key] ? '✓' : i + 1}</span>
            <span className="step-t">
              {s.title} <span className="muted small">· {s.day}</span>
            </span>
            <span className="step-m">{s.min} min</span>
          </button>
        ))}
      </nav>
      <Card>
        {step === 'reading1' && c.readings[0] && <ReadingBlock key="r1" r={c.readings[0]} source="lesson" onDone={() => done('reading1')} />}
        {step === 'reading2' && c.readings[1] && <ReadingBlock key="r2" r={c.readings[1]} source="lesson" onDone={() => done('reading2')} />}
        {step === 'review' && (
          <>
            <h3>Repaso de la semana</h3>
            <p className="muted small">Tarjetas vencidas y errores pendientes (hasta 80).</p>
            <ReviewSession limit={80} onDone={() => done('review')} />
          </>
        )}
        {step === 'test' && (
          <>
            <h3>Mini-test semanal</h3>
            <p className="muted small">10 preguntas de la gramática de la semana y 5 del vocabulario que ya estudiaste. Los errores pasan al repaso.</p>
            <ExerciseRunner exercises={test} skill="grammar" skillFor={(e) => (e.id.startsWith('wt') ? 'vocabulary' : 'grammar')} source="test" onDone={(ok) => done('test', ok)} doneLabel="Guardar resultado →" />
          </>
        )}
        {step === 'conversation' && c.speaking && (
          <>
            <h3>
              Conversación simulada: {c.speaking.title} <span className="muted">· {c.speaking.titleEs}</span>
            </h3>
            <RolePlay task={c.speaking} onDone={() => done('conversation')} />
          </>
        )}
        {step === 'interview' && (
          <>
            <h3>Simulador de entrevista</h3>
            <InterviewBlock q={c.interview} onDone={() => done('interview')} />
          </>
        )}
      </Card>
    </div>
  )
}
