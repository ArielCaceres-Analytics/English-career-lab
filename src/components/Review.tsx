import { useMemo, useState } from 'react'
import { exerciseById, wordById } from '../content'
import { today } from '../lib/normalize'
import type { Grade } from '../lib/srs'
import { useStore } from '../store'
import type { Card } from '../types'
import { ExerciseView } from './Exercise'
import { Progress, Speak } from './ui'

const GRADES: { g: Grade; label: string; cls: string }[] = [
  { g: 0, label: 'Otra vez', cls: 'bad' },
  { g: 1, label: 'Difícil', cls: 'warn' },
  { g: 2, label: 'Bien', cls: 'ok' },
  { g: 3, label: 'Fácil', cls: 'great' },
]

export function dueCards(cards: Map<string, Card>, kind?: Card['kind']) {
  const t = today()
  return [...cards.values()].filter((c) => c.due <= t && (!kind || c.kind === kind) && (c.kind === 'error' ? !!exerciseById[c.id.slice(4)] : !!wordById[c.id]))
}

/**
 * Sesión de repaso: tarjetas de vocabulario vencidas (autoevaluación al estilo Anki)
 * y errores anteriores (se vuelven a responder y se corrigen automáticamente).
 */
export function ReviewSession({ kind, onDone, limit = 60 }: { kind?: Card['kind']; onDone?: () => void; limit?: number }) {
  const { cards, gradeCard, record } = useStore()
  // La cola se fija al iniciar: las tarjetas marcadas "Otra vez" se repiten al final.
  const [queue, setQueue] = useState<string[]>(() => {
    const due = dueCards(cards, kind)
    const errors = due.filter((c) => c.kind === 'error')
    const vocab = due.filter((c) => c.kind === 'vocab').sort((a, b) => (a.reps === 0 ? 1 : 0) - (b.reps === 0 ? 1 : 0))
    return [...errors, ...vocab].slice(0, limit).map((c) => c.id)
  })
  const total = useMemo(() => queue.length, []) // eslint-disable-line react-hooks/exhaustive-deps
  const [done, setDone] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [errAnswered, setErrAnswered] = useState<null | boolean>(null)

  const id = queue[0]
  if (!id) {
    return (
      <div className="summary">
        <h3>{total ? '¡Repaso completado!' : 'No tienes repasos pendientes ahora.'}</h3>
        <p className="muted">Las tarjetas vuelven según el algoritmo de repetición espaciada.</p>
        {onDone && (
          <button className="btn primary" onClick={onDone}>
            Continuar
          </button>
        )}
      </div>
    )
  }

  const next = (again: boolean) => {
    setQueue((q) => (again ? [...q.slice(1), q[0]] : q.slice(1)))
    if (!again) setDone((d) => d + 1)
    setFlipped(false)
    setErrAnswered(null)
  }

  const card = cards.get(id)
  if (id.startsWith('err:')) {
    const item = exerciseById[id.slice(4)]
    return (
      <div>
        <div className="runner-top">
          <span className="muted">Repaso de errores · {done} / {total}</span>
          <Progress value={done} max={total} />
        </div>
        <ExerciseView
          key={id + queue.length}
          ex={item.exercise}
          onAnswered={(ok, given) => {
            setErrAnswered(ok)
            gradeCard(id, ok ? 2 : 0)
            record([{ skill: item.skill, itemId: item.exercise.id, topicId: item.topicId, correct: ok, given, source: 'review' }])
          }}
        />
        {errAnswered !== null && (
          <button className="btn primary next" onClick={() => next(!errAnswered)}>
            Siguiente →
          </button>
        )}
      </div>
    )
  }

  const w = wordById[id]
  if (!w || !card) {
    return (
      <button className="btn" onClick={() => next(false)}>
        Saltar
      </button>
    )
  }
  return (
    <div>
      <div className="runner-top">
        <span className="muted">
          Vocabulario · {done} / {total} {card.reps === 0 && !card.lastReview && <span className="tag">nueva</span>}
          {w.da && <span className="tag da">Data Analyst</span>}
        </span>
        <Progress value={done} max={total} />
      </div>
      <div className="flashcard" onClick={() => setFlipped(true)}>
        <div className="fc-word">
          {w.word} <Speak text={w.word} />
        </div>
        <div className="muted small">{w.pos}</div>
        {flipped ? (
          <div className="fc-back">
            <div className="fc-es">{w.es}</div>
            <div className="fc-ex">
              {w.example} <Speak text={w.example} />
            </div>
          </div>
        ) : (
          <button className="btn" onClick={() => setFlipped(true)}>
            Mostrar significado
          </button>
        )}
      </div>
      {flipped && (
        <>
          <p className="muted small center">¿Qué tan bien lo recordaste? (antes de ver la respuesta)</p>
          <div className="grades">
            {GRADES.map(({ g, label, cls }) => (
              <button
                key={g}
                className={`btn grade ${cls}`}
                onClick={() => {
                  gradeCard(id, g)
                  record([{ skill: 'vocabulary', itemId: id, correct: g > 0, source: 'review' }])
                  next(g === 0)
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
