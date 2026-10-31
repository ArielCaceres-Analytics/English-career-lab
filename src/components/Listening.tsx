import { useMemo, useRef, useState } from 'react'
import type { Dialogue } from '../types'
import { listen, recorderSupported, speak, srSupported, startRecording, stopSpeaking, ttsSupported } from '../lib/speech'
import { wordDiff } from '../lib/normalize'
import { useStore } from '../store'
import { ExerciseRunner } from './Exercise'
import { Progress, Speak } from './ui'

const RATES = [
  { r: 0.7, label: 'Lento' },
  { r: 0.85, label: 'Normal-lento' },
  { r: 1, label: 'Normal' },
]

export function NoTts() {
  return ttsSupported ? null : (
    <p className="warn-box">Tu navegador no tiene síntesis de voz. Puedes leer las transcripciones, pero te recomendamos Chrome o Safari actualizados.</p>
  )
}

/** Reproduce el diálogo con dos voces, transcripción ocultable y velocidad ajustable. */
export function DialoguePlayer({ d }: { d: Dialogue }) {
  const [showText, setShowText] = useState(false)
  const [rate, setRate] = useState(0.85)
  const [playing, setPlaying] = useState<number | null>(null)
  const stopRef = useRef(false)
  const speakers = useMemo(() => Array.from(new Set(d.lines.map((l) => l.speaker))), [d])

  const playAll = async () => {
    stopRef.current = false
    for (let i = 0; i < d.lines.length; i++) {
      if (stopRef.current) break
      setPlaying(i)
      await speak(d.lines[i].text, { rate, alt: speakers.indexOf(d.lines[i].speaker) % 2 === 1 })
    }
    setPlaying(null)
  }

  return (
    <div className="dialogue">
      <NoTts />
      <div className="row wrap">
        {playing === null ? (
          <button className="btn primary" onClick={playAll}>
            ▶ Escuchar diálogo
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              stopRef.current = true
              stopSpeaking()
              setPlaying(null)
            }}
          >
            ■ Detener
          </button>
        )}
        <div className="seg">
          {RATES.map((x) => (
            <button key={x.r} className={rate === x.r ? 'on' : ''} onClick={() => setRate(x.r)}>
              {x.label}
            </button>
          ))}
        </div>
        <button className="btn" onClick={() => setShowText(!showText)}>
          {showText ? 'Ocultar transcripción' : 'Mostrar transcripción'}
        </button>
      </div>
      <ol className="lines">
        {d.lines.map((l, i) => (
          <li key={i} className={playing === i ? 'active' : ''}>
            <span className="speaker">{l.speaker}:</span> {showText ? l.text : <span className="hidden-text">{'•'.repeat(Math.min(24, l.text.length / 2))}</span>}
            <Speak text={l.text} rate={rate} alt={speakers.indexOf(l.speaker) % 2 === 1} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export function pickDictation(d: Dialogue, n = 5) {
  const lines = d.lines.map((l) => l.text).filter((t) => t.split(' ').length >= 4 && t.split(' ').length <= 14)
  return lines.slice(0, n)
}

/** Dictado: escuchas y escribes; se compara palabra por palabra (sin importar mayúsculas ni puntuación). */
export function Dictation({ id, sentences, onDone }: { id: string; sentences: string[]; onDone?: (accuracy: number) => void }) {
  const { record } = useStore()
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<ReturnType<typeof wordDiff> | null>(null)
  const [totals, setTotals] = useState({ ok: 0, all: 0 })

  if (i >= sentences.length) {
    const acc = totals.all ? totals.ok / totals.all : 0
    return (
      <div className="summary">
        <h3>Dictado: {Math.round(acc * 100)}% de palabras correctas</h3>
        <p className="muted">Meta del mes 3: 80% a velocidad lenta.</p>
        {onDone && (
          <button className="btn primary" onClick={() => onDone(acc)}>
            Continuar
          </button>
        )}
      </div>
    )
  }
  const s = sentences[i]
  return (
    <div className="dictation">
      <div className="runner-top">
        <span className="muted">
          Frase {i + 1} / {sentences.length}
        </span>
        <Progress value={i} max={sentences.length} />
      </div>
      <div className="row">
        <Speak text={s} rate={0.85} label="Escuchar" />
        <Speak text={s} rate={0.6} label="Muy lento" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (checked || !text.trim()) return
          const r = wordDiff(s, text)
          setChecked(r)
          setTotals((t) => ({ ok: t.ok + r.correct, all: t.all + r.total }))
          record([{ skill: 'listening', itemId: `dict:${id}:${i}`, correct: r.correct === r.total && r.extra === 0, score: r.correct / r.total, given: text, expected: s, source: 'practice' }])
        }}
      >
        <input className="answer" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe lo que escuchas" autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false} disabled={!!checked} />
        {!checked && (
          <button className="btn primary" type="submit" disabled={!text.trim()}>
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
          <p className="small muted">
            {checked.correct}/{checked.total} palabras correctas. En rojo: palabras que faltaron o escribiste distinto. Texto original: “{s}”
          </p>
          <button
            className="btn primary"
            onClick={() => {
              setI(i + 1)
              setText('')
              setChecked(null)
            }}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}

/** Grabar tu voz y, si el navegador lo permite, transcribirla. */
export function VoiceTry({ target, onResult }: { target?: string; onResult?: (transcript: string, match: number | null) => void }) {
  const [rec, setRec] = useState<null | { stop: () => Promise<string> }>(null)
  const [url, setUrl] = useState('')
  const [listening, setListening] = useState<null | { stop: () => void }>(null)
  const [heard, setHeard] = useState('')
  const [err, setErr] = useState('')
  const diff = target && heard ? wordDiff(target, heard) : null

  return (
    <div className="voice">
      <div className="row wrap">
        {recorderSupported && (
          <button
            className={`btn${rec ? ' recording' : ''}`}
            onClick={async () => {
              setErr('')
              if (rec) {
                setUrl(await rec.stop())
                setRec(null)
              } else {
                try {
                  setRec(await startRecording())
                } catch {
                  setErr('No se pudo acceder al micrófono. Revisa los permisos del navegador.')
                }
              }
            }}
          >
            {rec ? '■ Detener grabación' : '● Grabarme'}
          </button>
        )}
        {url && <audio controls src={url} />}
        {srSupported && (
          <button
            className={`btn${listening ? ' recording' : ''}`}
            onClick={async () => {
              setErr('')
              if (listening) {
                listening.stop()
                return
              }
              const l = listen((t) => setHeard(t))
              setListening(l)
              try {
                const t = await l.done
                setHeard(t)
                const m = target && t ? wordDiff(target, t) : null
                onResult?.(t, m ? m.correct / m.total : null)
              } catch (e) {
                setErr(`El reconocimiento de voz falló (${(e as Error).message}). Puedes seguir usando la grabación.`)
              }
              setListening(null)
            }}
          >
            {listening ? '■ Terminar' : '🎤 Transcribir lo que digo'}
          </button>
        )}
      </div>
      {!srSupported && !recorderSupported && <p className="warn-box">Tu navegador no permite grabar ni transcribir. Practica en voz alta y compara con el modelo.</p>}
      {err && <p className="warn-box">{err}</p>}
      {heard && (
        <div className="heard">
          <p>
            <span className="muted small">El navegador entendió:</span> “{heard}”
          </p>
          {diff && (
            <>
              <p className="diff">
                {diff.tokens.map((t, k) => (
                  <span key={k} className={t.ok ? 'w-ok' : 'w-miss'}>
                    {t.w}{' '}
                  </span>
                ))}
              </p>
              <p className="small muted">
                Palabras reconocidas: {diff.correct}/{diff.total}. Esto mide si el reconocedor del navegador entendió tus palabras; no es una evaluación profesional de tu pronunciación.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

/** Shadowing: escuchar una línea y repetirla imitando ritmo y entonación. */
export function Shadowing({ id, lines, onDone }: { id: string; lines: string[]; onDone?: () => void }) {
  const { record } = useStore()
  const [i, setI] = useState(0)
  if (i >= lines.length)
    return (
      <div className="summary">
        <h3>Shadowing completado</h3>
        {onDone && (
          <button className="btn primary" onClick={onDone}>
            Continuar
          </button>
        )}
      </div>
    )
  const s = lines[i]
  return (
    <div>
      <div className="runner-top">
        <span className="muted">
          Línea {i + 1} / {lines.length}
        </span>
        <Progress value={i} max={lines.length} />
      </div>
      <p className="muted small">Escucha, luego repite en voz alta al mismo ritmo. Hazlo 2 o 3 veces.</p>
      <p className="prompt">{s}</p>
      <div className="row">
        <Speak text={s} rate={0.85} label="Escuchar" />
        <Speak text={s} rate={0.65} label="Lento" />
      </div>
      <VoiceTry
        key={i}
        target={s}
        onResult={(t, m) => record([{ skill: 'speaking', itemId: `shadow:${id}:${i}`, correct: m !== null && m >= 0.8, score: m ?? undefined, given: t, expected: s, source: 'practice' }])}
      />
      <button
        className="btn primary next"
        onClick={() => {
          record([{ skill: 'speaking', itemId: `shadow-done:${id}:${i}`, correct: true, source: 'practice' }])
          setI(i + 1)
        }}
      >
        Ya la repetí →
      </button>
    </div>
  )
}

/** Bloque completo de escucha de la lección: diálogo + preguntas + dictado + shadowing. */
export function ListeningBlock({ d, onDone }: { d: Dialogue; onDone: () => void }) {
  const [stage, setStage] = useState<'listen' | 'questions' | 'dictation' | 'shadow'>('listen')
  const stages = ['listen', 'questions', 'dictation', 'shadow']
  return (
    <div>
      <div className="stage-tabs">
        {['1. Escuchar', '2. Preguntas', '3. Dictado', '4. Shadowing'].map((s, k) => (
          <span key={s} className={stages.indexOf(stage) === k ? 'on' : stages.indexOf(stage) > k ? 'done' : ''}>
            {s}
          </span>
        ))}
      </div>
      {stage === 'listen' && (
        <>
          <h3>
            {d.title} <span className="muted">· {d.titleEs}</span>
          </h3>
          <p className="muted small">Primero escucha sin leer. Luego, si lo necesitas, muestra la transcripción.</p>
          <DialoguePlayer d={d} />
          <button className="btn primary next" onClick={() => setStage('questions')}>
            Responder preguntas →
          </button>
        </>
      )}
      {stage === 'questions' && (
        <>
          <DialoguePlayer d={d} />
          <ExerciseRunner exercises={d.questions} skill="listening" source="lesson" onDone={() => setStage('dictation')} doneLabel="Ir al dictado →" />
        </>
      )}
      {stage === 'dictation' && <Dictation id={d.id} sentences={pickDictation(d)} onDone={() => setStage('shadow')} />}
      {stage === 'shadow' && <Shadowing id={d.id} lines={d.lines.slice(0, 4).map((l) => l.text)} onDone={onDone} />}
    </div>
  )
}
