import type { Attempt, Card, DayLog, Profile, Skill } from '../types'
import { addDays, today } from './normalize'
import { cardState } from './srs'

export const STREAK_MIN_SECONDS = 20 * 60

/**
 * Racha: días seguidos (hasta hoy o ayer) en los que estudiaste al menos 20 minutos
 * o completaste una lección o sesión de fin de semana.
 */
export function streak(days: Map<string, DayLog>, p: Profile): number {
  const completedDates = new Set(Object.values(p.lessons).map((l) => l.completed).filter(Boolean) as string[])
  const ok = (d: string) => (days.get(d)?.seconds ?? 0) >= STREAK_MIN_SECONDS || completedDates.has(d)
  let d = today()
  if (!ok(d)) d = addDays(d, -1)
  let n = 0
  while (ok(d)) {
    n++
    d = addDays(d, -1)
  }
  return n
}

export function accuracyBySkill(attempts: Attempt[]) {
  const out: Record<Skill, { correct: number; total: number }> = {
    grammar: { correct: 0, total: 0 },
    vocabulary: { correct: 0, total: 0 },
    listening: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
    speaking: { correct: 0, total: 0 },
    writing: { correct: 0, total: 0 },
  }
  for (const a of attempts) {
    if (a.source === 'diagnostic') continue
    out[a.skill].total++
    if (a.correct) out[a.skill].correct++
  }
  return out
}

/** Precisión en los últimos N intentos de una habilidad: muestra la tendencia reciente. */
export function recentAccuracy(attempts: Attempt[], skill: Skill, n = 50) {
  const list = attempts.filter((a) => a.skill === skill && a.source !== 'diagnostic').slice(-n)
  if (!list.length) return null
  return list.filter((a) => a.correct).length / list.length
}

export function frequentErrors(attempts: Attempt[], limit = 8) {
  const byItem = new Map<string, { itemId: string; topicId?: string; skill: Skill; wrong: number; expected?: string; given?: string }>()
  for (const a of attempts) {
    if (a.correct || a.source === 'diagnostic') continue
    const e = byItem.get(a.itemId) ?? { itemId: a.itemId, topicId: a.topicId, skill: a.skill, wrong: 0 }
    e.wrong++
    e.expected = a.expected
    e.given = a.given
    byItem.set(a.itemId, e)
  }
  return [...byItem.values()].sort((a, b) => b.wrong - a.wrong).slice(0, limit)
}

export function errorsByTopic(attempts: Attempt[]) {
  const m = new Map<string, { wrong: number; total: number }>()
  for (const a of attempts) {
    if (!a.topicId || a.source === 'diagnostic') continue
    const e = m.get(a.topicId) ?? { wrong: 0, total: 0 }
    e.total++
    if (!a.correct) e.wrong++
    m.set(a.topicId, e)
  }
  return m
}

export function vocabCounts(cards: Map<string, Card>) {
  let learning = 0
  let known = 0
  for (const c of cards.values()) {
    if (c.kind !== 'vocab') continue
    const s = cardState(c)
    if (s === 'known') known++
    else learning++
  }
  return { learning, known, seen: learning + known }
}

export function minutesSeries(days: Map<string, DayLog>, n = 14) {
  const out: { date: string; minutes: number }[] = []
  let d = addDays(today(), -(n - 1))
  for (let i = 0; i < n; i++) {
    out.push({ date: d, minutes: Math.round((days.get(d)?.seconds ?? 0) / 60) })
    d = addDays(d, 1)
  }
  return out
}
