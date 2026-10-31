import { useState } from 'react'
import type { InterviewQuestion, Reading, SpeakingTask, WritingTask } from '../types'
import { checkWriting, wordCount, type WritingResult } from '../lib/writingCheck'
import { useStore } from '../store'
import { ExerciseRunner } from './Exercise'
import { VoiceTry } from './Listening'
import { RichText, Speak } from './ui'

/** Role-play guiado: escuchas a la otra persona, respondes en voz alta y comparas con un modelo. */
export function RolePlay({ task, onDone }: { task: SpeakingTask; onDone?: () => void }) {
  const { record } = useStore()
  const [i, setI] = useState(0)
  const [showModel, setShowModel] = useState(false)
  if (i >= task.turns.length)
    return (
      <div className="summary">
        <h3>Role-play completado</h3>
        <p>Repítelo una vez más sin mirar los modelos: es la mejor forma de fijarlo.</p>
        <div className="row">
          <button
            className="btn"
            onClick={() => {
              setI(0)
              setShowModel(false)
            }}
          >
            Repetir
          </button>
          {onDone && (
            <button className="btn primary" onClick={onDone}>
              Continuar
            </button>
          )}
        </div>
      </div>
    )
  const t = task.turns[i]
  return (
    <div className="roleplay">
      <p className="context">🎭 {task.context}</p>
      <div className="bubble other">
        <span>{t.prompt}</span> <Speak text={t.prompt} alt />
      </div>
      <p className="muted small">Responde en voz alta. Puedes grabarte o usar la transcripción del navegador.</p>
      <VoiceTry
        key={i}
        target={t.model}
        onResult={(heard, m) => record([{ skill: 'speaking', itemId: `rp:${task.id}:${i}`, correct: m !== null && m >= 0.6, score: m ?? undefined, given: heard, expected: t.model, source: 'practice' }])}
      />
      {showModel ? (
        <div className="bubble me">
          <span className="muted small">Respuesta modelo:</span> {t.model} <Speak text={t.model} />
        </div>
      ) : (
        <button className="btn" onClick={() => setShowModel(true)}>
          Ver respuesta modelo
        </button>
      )}
      <button
        className="btn primary next"
        onClick={() => {
          record([{ skill: 'speaking', itemId: `rp-done:${task.id}:${i}`, correct: true, source: 'practice' }])
          setI(i + 1)
          setShowModel(false)
        }}
      >
        {i + 1 < task.turns.length ? 'Siguiente turno →' : 'Terminar'}
      </button>
    </div>
  )
}

/** Escritura con corrección verificable por reglas (longitud, elementos obligatorios y errores frecuentes). */
export function WritingBlock({ task, onDone }: { task: WritingTask; onDone?: () => void }) {
  const { record } = useStore()
  const [text, setText] = useState('')
  const [res, setRes] = useState<WritingResult | null>(null)
  const [tries, setTries] = useState(0)
  return (
    <div className="writing">
      <h3>{task.title}</h3>
      <p>{task.prompt}</p>
      <p className="muted small">
        Entre {task.minWords} y {task.maxWords} palabras · llevas {wordCount(text)}
      </p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="Write in English…" spellCheck={false} autoCapitalize="sentences" />
      <div className="row">
        <button
          className="btn primary"
          disabled={!text.trim()}
          onClick={() => {
            const r = checkWriting(task, text)
            setRes(r)
            setTries(tries + 1)
            record([{ skill: 'writing', itemId: `${task.id}:try${tries + 1}`, correct: r.passed, score: r.checks.filter((c) => c.ok).length / r.checks.length, given: text, source: 'practice' }])
          }}
        >
          Revisar mi texto
        </button>
      </div>
      {res && (
        <div className={`feedback ${res.passed ? 'ok' : 'bad'}`}>
          <strong>{res.passed ? '¡Cumple todos los criterios!' : 'Revisa estos puntos y vuelve a intentarlo:'}</strong>
          <ul className="checks">
            <li className={res.lengthOk ? 'ok' : 'bad'}>
              {res.lengthOk ? '✓' : '✗'} Longitud: {res.words} palabras
            </li>
            {res.checks.map((c) => (
              <li key={c.label} className={c.ok ? 'ok' : 'bad'}>
                {c.ok ? '✓' : '✗'} {c.label}
                {!c.ok && <span className="muted"> — {c.hint}</span>}
              </li>
            ))}
            {res.errors.map((e) => (
              <li key={e} className="bad">
                ⚠ {e}
              </li>
            ))}
          </ul>
          <p className="small muted">La corrección revisa reglas concretas; no detecta todos los errores posibles. Compara tu texto con el modelo.</p>
          <details>
            <summary>Ver texto modelo</summary>
            <p className="model">{task.model}</p>
            <Speak text={task.model} label="Escuchar" />
          </details>
        </div>
      )}
      {onDone && res && (
        <button className="btn primary next" onClick={onDone}>
          {res.passed ? 'Continuar →' : 'Continuar de todos modos →'}
        </button>
      )}
    </div>
  )
}

export function ReadingBlock({ r, onDone, source = 'practice' }: { r: Reading; onDone?: () => void; source?: 'practice' | 'lesson' }) {
  const [answering, setAnswering] = useState(false)
  return (
    <div className="reading">
      <h3>
        {r.title} <span className="muted">· {r.titleEs}</span> <span className="tag">{r.level}</span>
      </h3>
      <div className="reading-text">
        {r.text.split('\n\n').map((p, i) => (
          <p key={i}>
            {p} <Speak text={p} />
          </p>
        ))}
      </div>
      {answering ? (
        <ExerciseRunner exercises={r.questions} skill="reading" source={source} onDone={onDone} doneLabel="Continuar →" />
      ) : (
        <button className="btn primary" onClick={() => setAnswering(true)}>
          Responder las preguntas →
        </button>
      )}
    </div>
  )
}

export function InterviewBlock({ q, onDone }: { q: InterviewQuestion; onDone?: () => void }) {
  const { record } = useStore()
  const [show, setShow] = useState(false)
  return (
    <div className="interview">
      <div className="bubble other">
        <span>{q.question}</span> <Speak text={q.question} alt />
      </div>
      <p className="muted small">{q.es}</p>
      <p className="tip">💡 {q.tip}</p>
      <p className="muted small">Responde en voz alta (30–90 segundos). Luego compara con los modelos.</p>
      <VoiceTry onResult={(heard) => record([{ skill: 'speaking', itemId: `iq:${q.id}`, correct: true, given: heard, source: 'practice' }])} />
      {show ? (
        <div className="models">
          <div className="bubble me">
            <span className="tag">Modelo A2</span> {q.modelA2} <Speak text={q.modelA2} />
          </div>
          <div className="bubble me">
            <span className="tag">Modelo B1</span> {q.modelB1} <Speak text={q.modelB1} />
          </div>
        </div>
      ) : (
        <button className="btn" onClick={() => setShow(true)}>
          Ver respuestas modelo
        </button>
      )}
      {onDone && (
        <button className="btn primary next" onClick={onDone}>
          Continuar →
        </button>
      )}
    </div>
  )
}

export function Theory({ text }: { text: string }) {
  return (
    <details className="theory" open>
      <summary>Explicación (2 minutos)</summary>
      <RichText text={text} />
    </details>
  )
}
