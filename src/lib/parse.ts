import type { Dialogue, Exercise, Level, Reading, SpeakingTask } from '../types'
import { shuffle } from './normalize'

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/**
 * Formato compacto de ejercicios (una línea cada uno, campos separados por " | "):
 *   C: prompt | *correcta ~ incorrecta ~ incorrecta | explicación
 *   F: oración con ___ | respuesta ~ alternativa | explicación
 *   O: Oración correcta completa | explicación          (se muestran las palabras desordenadas)
 *   T: instrucción | oración | respuesta ~ alternativa | explicación
 *   E: oración con error | corrección ~ alternativa | explicación
 */
export function parseExercise(line: string, id: string): Exercise {
  const kind = line.slice(0, 2)
  const parts = line.slice(2).split(' | ').map((p) => p.trim())
  const alts = (s: string) => s.split(' ~ ').map((x) => x.trim())
  switch (kind) {
    case 'C:': {
      // Las opciones se mezclan de forma estable (misma posición siempre para el mismo id).
      const opts = shuffle(alts(parts[1]), hash(id))
      const answer = opts.findIndex((o) => o.startsWith('*'))
      if (answer < 0) throw new Error(`Sin respuesta correcta: ${id} ${line}`)
      return { id, kind: 'choice', prompt: parts[0], options: opts.map((o) => o.replace(/^\*/, '')), answer, explain: parts[2] ?? '' }
    }
    case 'F:':
      return { id, kind: 'fill', prompt: parts[0], answers: alts(parts[1]), explain: parts[2] ?? '' }
    case 'O:':
      return { id, kind: 'order', sentence: parts[0], explain: parts[1] ?? '' }
    case 'T:':
      return { id, kind: 'transform', instruction: parts[0], prompt: parts[1], answers: alts(parts[2]), explain: parts[3] ?? '' }
    case 'E:':
      return { id, kind: 'correct', prompt: parts[0], answers: alts(parts[1]), explain: parts[2] ?? '' }
    default:
      throw new Error(`Tipo desconocido en ${id}: ${line}`)
  }
}

export function parseExercises(block: string, prefix: string): Exercise[] {
  return block
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^[CFOTE]:/.test(l))
    .map((l, i) => parseExercise(l, `${prefix}-${i + 1}`))
}

function sections(src: string): { head: string[]; body: string[] }[] {
  return src
    .split(/^## /m)
    .slice(1)
    .map((chunk) => {
      const [first, ...rest] = chunk.split('\n')
      return { head: first.split(' | ').map((s) => s.trim()), body: rest.map((l) => l.trim()).filter(Boolean) }
    })
}

/** Pregunta de comprensión: "? pregunta | *correcta ~ otra ~ otra | explicación" */
function questions(body: string[], id: string): Exercise[] {
  return body.filter((l) => l.startsWith('?')).map((l, i) => parseExercise('C:' + l.slice(1), `${id}-q${i + 1}`))
}

export function parseDialogues(src: string): Dialogue[] {
  return sections(src).map(({ head, body }) => {
    const [id, title, titleEs, level, area] = head
    const lines = body
      .filter((l) => !l.startsWith('?'))
      .map((l) => {
        const k = l.indexOf(':')
        return { speaker: l.slice(0, k).trim(), text: l.slice(k + 1).trim() }
      })
    return { id, title, titleEs, level: level as Level, area: area as 'daily' | 'work', lines, questions: questions(body, id) }
  })
}

export function parseReadings(src: string): Reading[] {
  return sections(src).map(({ head, body }) => {
    const [id, title, titleEs, level] = head
    return {
      id,
      title,
      titleEs,
      level: level as Level,
      text: body.filter((l) => !l.startsWith('?')).join('\n\n'),
      questions: questions(body, id),
    }
  })
}

/** Role-play: "> lo que dice la otra persona" seguido de "= respuesta modelo"; "@ contexto en español" */
export function parseSpeaking(src: string): SpeakingTask[] {
  return sections(src).map(({ head, body }) => {
    const [id, title, titleEs, level] = head
    const turns: { prompt: string; model: string }[] = []
    let context = ''
    for (const l of body) {
      if (l.startsWith('@')) context = l.slice(1).trim()
      else if (l.startsWith('>')) turns.push({ prompt: l.slice(1).trim(), model: '' })
      else if (l.startsWith('=') && turns.length) turns[turns.length - 1].model = l.slice(1).trim()
    }
    return { id, title, titleEs, level: level as Level, context, turns }
  })
}

export function parseLines<T>(src: string, fields: (keyof T)[], prefix: string): (T & { id: string })[] {
  return src
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l, i) => {
      const parts = l.split(' | ').map((p) => p.trim())
      const o: Record<string, string> = { id: `${prefix}${i + 1}` }
      fields.forEach((f, k) => (o[f as string] = parts[k] ?? ''))
      return o as unknown as T & { id: string }
    })
}
