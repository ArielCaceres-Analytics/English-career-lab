import type { Card } from '../types'
import { addDays, today } from './normalize'

export type Grade = 0 | 1 | 2 | 3 // 0 Otra vez, 1 Difícil, 2 Bien, 3 Fácil

export function newCard(id: string, kind: Card['kind'], date = today()): Card {
  return { id, kind, due: date, interval: 0, ease: 2.5, reps: 0, lapses: 0, created: date }
}

/**
 * Variante de SM-2 (algoritmo de SuperMemo/Anki):
 * - "Otra vez": la tarjeta vuelve hoy, intervalo a 0, facilidad -0.2.
 * - Primera vez bien: 1 día; segunda: 3 días; luego intervalo × facilidad.
 * - "Difícil" multiplica por 1.2 y baja la facilidad; "Fácil" multiplica extra por 1.3.
 */
export function review(card: Card, grade: Grade, date = today()): Card {
  const c = { ...card, lastReview: date }
  if (grade === 0) {
    c.lapses++
    c.reps = 0
    c.interval = 0
    c.ease = Math.max(1.3, c.ease - 0.2)
    c.due = date
    return c
  }
  if (c.reps === 0) c.interval = grade === 3 ? 3 : 1
  else if (c.reps === 1) c.interval = grade === 1 ? 2 : grade === 3 ? 5 : 3
  else {
    const mult = grade === 1 ? 1.2 : grade === 3 ? c.ease * 1.3 : c.ease
    c.interval = Math.max(c.interval + 1, Math.round(c.interval * mult))
  }
  if (grade === 1) c.ease = Math.max(1.3, c.ease - 0.15)
  if (grade === 3) c.ease = c.ease + 0.15
  c.reps++
  c.due = addDays(date, c.interval)
  return c
}

/** Estado documentado de una palabra: nueva (nunca vista), aprendiendo (intervalo < 21 días), dominada (≥ 21 días). */
export function cardState(c?: Card): 'new' | 'learning' | 'known' {
  if (!c || c.reps === 0) return c && c.lastReview ? 'learning' : 'new'
  return c.interval >= 21 ? 'known' : 'learning'
}
