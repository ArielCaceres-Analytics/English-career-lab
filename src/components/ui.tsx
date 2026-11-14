import { useEffect, useState, type ReactNode } from 'react'
import { speak, stopSpeaking, ttsSupported } from '../lib/speech'

export function Speak({ text, rate, label, alt }: { text: string; rate?: number; label?: string; alt?: boolean }) {
  const [on, setOn] = useState(false)
  if (!ttsSupported) return null
  return (
    <button
      type="button"
      className={`btn-icon${on ? ' playing' : ''}`}
      aria-label={label ?? 'Escuchar'}
      title={label ?? 'Escuchar'}
      onClick={async (e) => {
        e.stopPropagation()
        stopSpeaking()
        setOn(true)
        await speak(text, { rate, alt })
        setOn(false)
      }}
    >
      {label ? <span>🔊 {label}</span> : '🔊'}
    </button>
  )
}

export function Progress({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-label={label}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>
}

export function Header({ title, es, subtitle, back }: { title: string; es?: string; subtitle?: string; back?: string }) {
  return (
    <header className="page-header">
      {back && (
        <a className="back" href={back}>
          ← Volver
        </a>
      )}
      <h1>{title}</h1>
      {es && <p className="es">{es}</p>}
      {subtitle && <p className="muted">{subtitle}</p>}
    </header>
  )
}

/** Muestra texto con **negritas**, listas "- " y tablas simples "| a | b |" del contenido teórico. */
export function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/)
  const inline = (s: string) =>
    s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) =>
      part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part.startsWith('*') && part.length > 2 ? <em key={i}>{part.slice(1, -1)}</em> : part,
    )
  return (
    <div className="rich">
      {blocks.map((b, i) => {
        const lines = b.split('\n')
        if (lines.every((l) => l.startsWith('|'))) {
          const rows = lines.filter((l) => !/^\|[-\s|]+\|$/.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()))
          return (
            <table key={i}>
              <tbody>
                {rows.map((r, k) => (
                  <tr key={k}>{r.map((c, j) => (k === 0 ? <th key={j}>{inline(c)}</th> : <td key={j}>{inline(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          )
        }
        const head = lines.filter((l) => !l.startsWith('- '))
        const items = lines.filter((l) => l.startsWith('- '))
        return (
          <div key={i}>
            {head.map((h, k) => (
              <p key={k}>{inline(h)}</p>
            ))}
            {items.length > 0 && (
              <ul>
                {items.map((it, k) => (
                  <li key={k}>{inline(it.slice(2))}</li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function useHash() {
  const [hash, setHash] = useState(location.hash || '#/')
  useEffect(() => {
    const on = () => {
      setHash(location.hash || '#/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

export function pct(c: number, t: number) {
  return t ? `${Math.round((c / t) * 100)}%` : '—'
}
