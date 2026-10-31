import { useEffect, useMemo, useState } from 'react'
import { topicById, vocabOrder, writingTasks, speakingTasks } from '../content'
import { ExerciseRunner } from '../components/Exercise'
import { ListeningBlock, VoiceTry } from '../components/Listening'
import { RolePlay, Theory, WritingBlock } from '../components/Output'
import { ReviewSession } from '../components/Review'
import { Card, Header, Speak } from '../components/ui'
import { currentLesson, lessonDialogue, lessonExercises, lessonOutput, lessonPhrase, LESSON_TOPIC, weekOf } from '../lib/plan'
import { today, wordDiff } from '../lib/normalize'
import { LESSON_STEPS, useStore, useStudyTimer } from '../store'
import type { StepKey } from '../types'

const STEP_INFO: Record<StepKey, { title: string; min: number }> = {
  review: { title: 'Repaso espaciado y palabras nuevas', min: 10 },
  grammar: { title: 'Gramática del día', min: 10 },
  listening: { title: 'Escucha: diálogo, dictado y shadowing', min: 10 },
  output: { title: 'Hablar o escribir', min: 10 },
  da: { title: 'Frase Data Analyst y cierre', min: 5 },
}

/** Introduce las palabras nuevas de la lección una sola vez. */
function useIntroduceWords(n: number) {
  const { profile, addCards, updateProfile } = useStore()
  useEffect(() => {
    if (profile.lessons[n]?.introduced !== undefined) return
    const from = profile.introducedWords
    const words = vocabOrder.slice(from, from + profile.newWordsPerDay)
    addCards(
      words.map((w) => w.id),
      'vocab',
    ).then(() =>
      updateProfile((p) => ({
        ...p,
        introducedWords: from + words.length,
        lessons: { ...p.lessons, [n]: { ...(p.lessons[n] ?? { steps: {} }), introduced: words.length } },
      })),
    )
  }, [n]) // eslint-disable-line react-hooks/exhaustive-deps
}

export function LessonView({ n }: { n: number }) {
  const { profile, completeStep, attempts } = useStore()
  useStudyTimer()
  const cur = currentLesson(profile)
  const state = profile.lessons[n]
  const firstPending = LESSON_STEPS.find((s) => !state?.steps[s]) ?? 'review'
  const [step, setStep] = useState<StepKey>(firstPending)
  const locked = n > cur

  const wrongOrUnseen = useMemo(() => {
    const okIds = new Set(attempts.filter((a) => a.correct).map((a) => a.itemId))
    const all = new Set<string>()
    Object.values(topicById).forEach((t) => t.exercises.forEach((e) => !okIds.has(e.id) && all.add(e.id)))
    return all
  }, [n]) // eslint-disable-line react-hooks/exhaustive-deps
  const grammar = useMemo(() => lessonExercises(n, profile, wrongOrUnseen), [n]) // eslint-disable-line react-hooks/exhaustive-deps

  if (locked)
    return (
      <div>
        <Header title={`Lección ${n}`} back="#/" />
        <Card>🔒 Completa la lección {cur} para desbloquear esta.</Card>
      </div>
    )

  const finish = async (s: StepKey) => {
    await completeStep(n, s)
    const idx = LESSON_STEPS.indexOf(s)
    const next = LESSON_STEPS.slice(idx + 1).find((k) => !profile.lessons[n]?.steps[k]) ?? LESSON_STEPS.find((k) => k !== s && !profile.lessons[n]?.steps[k])
    if (next) setStep(next)
    else setStep('da')
    window.scrollTo(0, 0)
  }

  const out = lessonOutput(n)
  const topic = LESSON_TOPIC[n - 1]
  const done = !!state?.completed

  return (
    <div>
      <Header title={`Lección ${n} · Semana ${weekOf(n)}`} subtitle={`${grammar.title} · 45 minutos · 70% práctica`} back="#/" />
      {done && <Card className="success">✅ Lección completada el {state.completed}. Puedes repetir cualquier bloque.</Card>}
      <nav className="steps">
        {LESSON_STEPS.map((s, i) => (
          <button key={s} className={`step${step === s ? ' on' : ''}${state?.steps[s] ? ' done' : ''}`} onClick={() => setStep(s)}>
            <span className="step-n">{state?.steps[s] ? '✓' : i + 1}</span>
            <span className="step-t">{STEP_INFO[s].title}</span>
            <span className="step-m">{STEP_INFO[s].min} min</span>
          </button>
        ))}
      </nav>
      <Card>
        {step === 'review' && <ReviewStep n={n} onDone={() => finish('review')} />}
        {step === 'grammar' && (
          <>
            {topic.topic !== 'mix' && <Theory text={topicById[topic.topic].theory} />}
            <ExerciseRunner key={`g${n}`} exercises={grammar.exercises} skill="grammar" source="lesson" topicId={grammar.topicId} onDone={() => finish('grammar')} doneLabel="Siguiente bloque →" />
          </>
        )}
        {step === 'listening' && <ListeningBlock key={`l${n}`} d={lessonDialogue(n)} onDone={() => finish('listening')} />}
        {step === 'output' &&
          (out.kind === 'speaking' ? (
            <>
              <h3>
                Speaking: {speakingTasks[out.index].title} <span className="muted">· {speakingTasks[out.index].titleEs}</span>
              </h3>
              <RolePlay task={speakingTasks[out.index]} onDone={() => finish('output')} />
            </>
          ) : (
            <WritingBlock task={writingTasks[out.index]} onDone={() => finish('output')} />
          ))}
        {step === 'da' && <DaStep n={n} onDone={() => finish('da')} />}
      </Card>
    </div>
  )
}

function ReviewStep({ n, onDone }: { n: number; onDone: () => void }) {
  useIntroduceWords(n)
  const { profile } = useStore()
  const [started, setStarted] = useState(false)
  const introduced = profile.lessons[n]?.introduced
  if (introduced === undefined) return <p className="muted">Preparando palabras nuevas…</p>
  return started ? (
    <ReviewSession onDone={onDone} />
  ) : (
    <div>
      <h3>Repaso espaciado</h3>
      <p>
        Hoy se agregan <b>{introduced}</b> palabras nuevas (incluye términos de Data Analyst) a tus tarjetas, más las tarjetas que tocan hoy y tus errores anteriores.
      </p>
      <p className="muted small">Mira la palabra, intenta recordarla y luego revisa. Sé honesto al calificarte: así el algoritmo te muestra cada tarjeta en el momento justo.</p>
      <button className="btn primary" onClick={() => setStarted(true)}>
        Empezar repaso
      </button>
    </div>
  )
}

function DaStep({ n, onDone }: { n: number; onDone: () => void }) {
  const { record, attempts } = useStore()
  const p = lessonPhrase(n)
  const [stage, setStage] = useState<'learn' | 'write' | 'close'>('learn')
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<ReturnType<typeof wordDiff> | null>(null)
  const todayErrors = attempts.filter((a) => a.date === today() && !a.correct && a.source !== 'diagnostic' && a.skill !== 'speaking').length
  return (
    <div>
      <h3>Frase Data Analyst del día</h3>
      {stage === 'learn' && (
        <>
          <div className="da-phrase">
            <p className="big">{p.phrase}</p>
            <Speak text={p.phrase} label="Escuchar" />
            <Speak text={p.phrase} rate={0.65} label="Lento" />
            <p>{p.es}</p>
            <p className="muted small">Cuándo usarla: {p.context}</p>
          </div>
          <p className="muted small">Repítela en voz alta 3 veces.</p>
          <VoiceTry target={p.phrase} />
          <button className="btn primary next" onClick={() => setStage('write')}>
            Escribirla de memoria →
          </button>
        </>
      )}
      {stage === 'write' && (
        <>
          <p>Escribe la frase en inglés de memoria:</p>
          <p className="muted">“{p.es}”</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (checked) return
              const r = wordDiff(p.phrase, text)
              setChecked(r)
              record([{ skill: 'writing', itemId: `daw:${p.id}`, correct: r.correct === r.total && r.extra === 0, score: r.correct / r.total, given: text, expected: p.phrase, source: 'lesson' }])
            }}
          >
            <input className="answer" value={text} onChange={(e) => setText(e.target.value)} autoCapitalize="off" autoCorrect="off" spellCheck={false} disabled={!!checked} />
            {!checked && (
              <button className="btn primary" disabled={!text.trim()}>
                Comprobar
              </button>
            )}
          </form>
          {checked && (
            <div className="feedback">
              <p className="diff">
                {checked.tokens.map((t, k) => (
                  <span key={k} className={t.ok ? 'w-ok' : 'w-miss'}>
                    {t.w}{' '}
                  </span>
                ))}
              </p>
              <p className="small">Correcto: {p.phrase}</p>
              <button className="btn primary" onClick={() => setStage('close')}>
                Cierre del día →
              </button>
            </div>
          )}
        </>
      )}
      {stage === 'close' && (
        <div className="summary">
          <h3>Cierre</h3>
          <p>
            Hoy registraste <b>{todayErrors}</b> respuestas incorrectas. Las de gramática, escucha y lectura ya están en tu repaso de errores para mañana.
          </p>
          <button className="btn primary" onClick={onDone}>
            Terminar lección ✓
          </button>
        </div>
      )}
    </div>
  )
}
