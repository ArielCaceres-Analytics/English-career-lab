import { useMemo, useState } from 'react'
import type { Attempt, Exercise, Skill } from '../types'
import { matches, normalize, shuffle } from '../lib/normalize'
import { useStore } from '../store'
import { Progress, Speak } from './ui'

const KIND_ES: Record<Exercise['kind'], string> = {
  choice: 'Elige la opción correcta',
  fill: 'Completa el espacio',
  order: 'Ordena las palabras',
  transform: 'Transforma la oración',
  correct: 'Corrige el error',
}

export function expectedText(e: Exercise): string {
  switch (e.kind) {
    case 'choice':
      return e.options[e.answer]
    case 'order':
      return e.sentence
    default:
      return e.answers[0]
  }
}

/** Oración completa para escuchar después de responder. */
function fullSentence(e: Exercise): string | null {
  if (e.kind === 'order') return e.sentence
  if (e.kind === 'correct' || e.kind === 'transform') return e.answers[0]
  if ((e.kind === 'fill' || e.kind === 'choice') && e.prompt.includes('___')) {
    const ans = expectedText(e)
    return e.prompt.replace(/\s*\([^)]*\)\s*/g, ' ').replace('___', ans).replace(/\s+/g, ' ').trim()
  }
  return null
}

/** Una pregunta: muestra el ejercicio, valida y explica en español. */
export function ExerciseView({ ex, onAnswered, audio }: { ex: Exercise; onAnswered: (correct: boolean, given: string) => void; audio?: string }) {
  const [given, setGiven] = useState('')
  const [picked, setPicked] = useState<number | null>(null)
  const [built, setBuilt] = useState<number[]>([])
  const [result, setResult] = useState<null | boolean>(null)
  const tokens = useMemo(() => (ex.kind === 'order' ? shuffle(ex.sentence.split(' ')) : []), [ex])

  const check = (choice?: number) => {
    let ok = false
    let g = ''
    if (ex.kind === 'choice') {
      const i = choice ?? picked
      if (i === null || i === undefined) return
      ok = i === ex.answer
      g = ex.options[i]
      setPicked(i)
    } else if (ex.kind === 'order') {
      g = built.map((i) => tokens[i]).join(' ')
      ok = normalize(g) === normalize(ex.sentence)
    } else {
      g = given
      if (!g.trim()) return
      ok = matches(g, ex.answers)
    }
    setResult(ok)
    onAnswered(ok, g)
  }

  const done = result !== null
  const sentence = fullSentence(ex)

  return (
    <div className="exercise">
      <p className="kind">{ex.kind === 'transform' ? ex.instruction : KIND_ES[ex.kind]}</p>
      {audio && (
        <div className="audio-row">
          <Speak text={audio} label="Escuchar" />
          <Speak text={audio} rate={0.65} label="Lento" />
        </div>
      )}
      {ex.kind !== 'order' && <p className="prompt">{ex.prompt}</p>}

      {ex.kind === 'choice' && (
        <div className="options">
          {ex.options.map((o, i) => (
            <button
              key={i}
              type="button"
              disabled={done}
              className={`option${done && i === ex.answer ? ' right' : ''}${done && i === picked && i !== ex.answer ? ' wrong' : ''}`}
              onClick={() => check(i)}
            >
              {o}
            </button>
          ))}
        </div>
      )}

      {(ex.kind === 'fill' || ex.kind === 'transform' || ex.kind === 'correct') && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!done) check()
          }}
        >
          <input
            className={`answer${done ? (result ? ' right' : ' wrong') : ''}`}
            value={given}
            onChange={(e) => setGiven(e.target.value)}
            placeholder={ex.kind === 'correct' ? 'Escribe la oración corregida' : ex.kind === 'fill' ? 'Escribe la palabra que falta' : 'Escribe la oración'}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            disabled={done}
            autoFocus
          />
          {!done && (
            <button className="btn primary" type="submit" disabled={!given.trim()}>
              Comprobar
            </button>
          )}
        </form>
      )}

      {ex.kind === 'order' && (
        <div>
          <div className={`built${done ? (result ? ' right' : ' wrong') : ''}`}>
            {built.length ? built.map((i) => tokens[i]).join(' ') : <span className="muted">Toca las palabras en orden…</span>}
          </div>
          <div className="chips">
            {tokens.map((t, i) => (
              <button key={i} type="button" className="chip" disabled={done || built.includes(i)} onClick={() => setBuilt([...built, i])}>
                {t}
              </button>
            ))}
          </div>
          {!done && (
            <div className="row">
              <button type="button" className="btn" onClick={() => setBuilt(built.slice(0, -1))} disabled={!built.length}>
                ↶ Deshacer
              </button>
              <button type="button" className="btn primary" onClick={() => check()} disabled={built.length !== tokens.length}>
                Comprobar
              </button>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className={`feedback ${result ? 'ok' : 'bad'}`} role="status">
          <strong>{result ? '¡Correcto!' : 'Incorrecto'}</strong>
          {!result && (
            <p>
              Respuesta correcta: <b>{expectedText(ex)}</b>
            </p>
          )}
          {ex.explain && <p>{ex.explain}</p>}
          {sentence && <Speak text={sentence} label="Escuchar la oración" />}
        </div>
      )}
    </div>
  )
}

/** Serie de ejercicios con registro de cada respuesta y resumen final. */
export function ExerciseRunner({
  exercises,
  skill,
  source,
  topicId,
  audioFor,
  onDone,
  doneLabel = 'Terminar',
  skillFor,
}: {
  exercises: Exercise[]
  skill: Skill
  source: Attempt['source']
  topicId?: string
  audioFor?: (e: Exercise) => string | undefined
  onDone?: (correct: number, total: number) => void
  doneLabel?: string
  skillFor?: (e: Exercise) => Skill
}) {
  const { record } = useStore()
  const [i, setI] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const finished = i >= exercises.length
  const correct = results.filter(Boolean).length

  if (!exercises.length) return <p className="muted">No hay ejercicios disponibles.</p>

  if (finished) {
    const wrong = exercises.filter((_, k) => !results[k])
    return (
      <div className="summary">
        <h3>
          Resultado: {correct} / {exercises.length}
        </h3>
        <Progress value={correct} max={exercises.length} />
        {wrong.length > 0 ? (
          <>
            <p>Estos ejercicios pasan a tu repaso de errores (vuelven mañana):</p>
            <ul className="wrong-list">
              {wrong.map((e) => (
                <li key={e.id}>
                  {e.kind === 'order' ? e.sentence : e.prompt} → <b>{expectedText(e)}</b>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>¡Perfecto! Sin errores.</p>
        )}
        {onDone && (
          <button className="btn primary" onClick={() => onDone(correct, exercises.length)}>
            {doneLabel}
          </button>
        )}
      </div>
    )
  }

  const ex = exercises[i]
  return (
    <div>
      <div className="runner-top">
        <span className="muted">
          {i + 1} / {exercises.length}
        </span>
        <Progress value={i} max={exercises.length} />
      </div>
      <ExerciseView
        key={ex.id + i}
        ex={ex}
        audio={audioFor?.(ex)}
        onAnswered={(ok, given) => {
          setAnswered(true)
          setResults((r) => [...r, ok])
          record([{ skill: skillFor?.(ex) ?? skill, itemId: ex.id, topicId: topicId ?? /^(g\d\d)-/.exec(ex.id)?.[1], correct: ok, given, expected: expectedText(ex), source }])
        }}
      />
      {answered && (
        <button
          className="btn primary next"
          autoFocus
          onClick={() => {
            setAnswered(false)
            setI(i + 1)
          }}
        >
          {i + 1 < exercises.length ? 'Siguiente →' : 'Ver resultado'}
        </button>
      )}
    </div>
  )
}
