import type { DiagnosticResult, Level, Skill } from '../types'
import { today } from './normalize'

export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2']
export const PASS = 0.6

/**
 * Estimación documentada:
 * - Se calcula el % de aciertos por nivel (todas las habilidades juntas).
 * - Alcanzas un nivel si aciertas ≥ 60% de sus preguntas y alcanzaste todos los anteriores.
 * - Si no alcanzas A1, el resultado es "A1 inicial".
 * - Habilidades débiles: las que tienen menos de 60% de aciertos (o la más baja si todas pasan).
 * No equivale a una certificación oficial.
 */
export function scoreDiagnostic(answers: { level: Level; skill: Skill; correct: boolean }[]): DiagnosticResult {
  const byLevel = Object.fromEntries(LEVELS.map((l) => [l, { correct: 0, total: 0 }])) as DiagnosticResult['byLevel']
  const bySkill: DiagnosticResult['bySkill'] = {}
  for (const a of answers) {
    byLevel[a.level].total++
    if (a.correct) byLevel[a.level].correct++
    bySkill[a.skill] ??= { correct: 0, total: 0 }
    bySkill[a.skill].total++
    if (a.correct) bySkill[a.skill].correct++
  }
  let reached: Level | null = null
  for (const l of LEVELS) {
    const { correct, total } = byLevel[l]
    if (total && correct / total >= PASS) reached = l
    else break
  }
  const acc = (s: string) => bySkill[s].correct / bySkill[s].total
  const skills = Object.keys(bySkill)
  let weak = skills.filter((s) => acc(s) < PASS)
  if (!weak.length && skills.length) weak = [skills.reduce((a, b) => (acc(a) <= acc(b) ? a : b))]
  return {
    date: today(),
    level: reached ?? 'A1',
    label: reached ? reached : 'A1 inicial',
    byLevel,
    bySkill,
    weak: weak.sort((a, b) => acc(a) - acc(b)) as Skill[],
  }
}
