import type { WritingTask } from '../types'

/** Errores típicos de hispanohablantes. Cada regla es verificable: si el patrón aparece, se marca. */
export const COMMON_ERRORS: { pattern: RegExp; msg: string }[] = [
  { pattern: /(^|[.!?]\s+|\s)i(\s|'m|')/, msg: 'El pronombre "I" (yo) siempre va en mayúscula.' },
  { pattern: /\bi is\b|\bi are\b/i, msg: 'Con "I" se usa "am": I am.' },
  { pattern: /\b(he|she|it) are\b/i, msg: 'Con he/she/it se usa "is".' },
  { pattern: /\b(you|we|they) is\b/i, msg: 'Con you/we/they se usa "are".' },
  { pattern: /\bi have \d+ years\b/i, msg: 'La edad se dice "I am 30 (years old)", no "I have 30 years".' },
  { pattern: /\b(am|is|are) agree\b/i, msg: '"Agree" es un verbo: I agree (no "I am agree").' },
  { pattern: /\b(he|she|it) (don't|have)\b/i, msg: 'Con he/she/it: doesn\'t / has.' },
  { pattern: /\b(doesn't|does not|didn't|did not) (?!(?:need|feed|speed|proceed|exceed|succeed|embed|focus|access|process|discuss|address|pass|miss|guess|press|cross)\b)(\w+[^s\W]s|\w+ed)\b/i, msg: 'Después de doesn\'t / didn\'t el verbo va en forma base (sin -s ni -ed).' },
  { pattern: /\b(can|should|will|must) to \w+/i, msg: 'Después de can/should/will/must no va "to".' },
  { pattern: /\bpeople is\b/i, msg: '"People" es plural: people are.' },
  { pattern: /\binformations\b|\badvices\b|\bsoftwares\b|\bfeedbacks\b|\bequipments\b/i, msg: 'Information, advice, software, feedback y equipment son incontables: sin -s.' },
  { pattern: /\bexplain me\b/i, msg: 'Se dice "explain to me" o "Can you explain…?", no "explain me".' },
  { pattern: /\bmore (better|faster|easier|bigger)\b/i, msg: 'No uses "more" con comparativos terminados en -er.' },
  { pattern: /\bdepend(s)? of\b/i, msg: 'Se dice "depend on".' },
  { pattern: /\bin (monday|tuesday|wednesday|thursday|friday|saturday|sunday)s?\b/i, msg: 'Con días de la semana se usa "on".' },
  { pattern: /\bon (january|february|march|april|june|july|august|september|october|november|december)\b(?!\s+\d)/i, msg: 'Con meses (sin día) se usa "in": in March.' },
  { pattern: /\ba (a|e|i|o)\w+/i, msg: 'Antes de sonido de vocal se usa "an" (an email, an analyst). Revisa si aplica.' },
]

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export interface WritingResult {
  words: number
  lengthOk: boolean
  checks: { label: string; ok: boolean; hint: string }[]
  errors: string[]
  passed: boolean
}

export function checkWriting(task: WritingTask, text: string): WritingResult {
  const words = wordCount(text)
  const lengthOk = words >= task.minWords && words <= task.maxWords
  const checks = task.checks.map((c) => ({ label: c.label, ok: new RegExp(c.pattern, c.flags ?? 'i').test(text), hint: c.hint }))
  const errors = Array.from(new Set(COMMON_ERRORS.filter((e) => e.msg && e.pattern.test(text)).map((e) => e.msg)))
  // "a + vocal" tiene excepciones (a university, a user): se muestra como sugerencia pero no bloquea.
  const blocking = errors.filter((e) => !e.startsWith('Antes de sonido de vocal'))
  return { words, lengthOk, checks, errors, passed: lengthOk && checks.every((c) => c.ok) && blocking.length === 0 }
}
