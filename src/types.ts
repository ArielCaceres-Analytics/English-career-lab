export type Level = 'A1' | 'A2' | 'B1' | 'B2'
export type Skill = 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'speaking' | 'writing'

export const SKILL_ES: Record<Skill, string> = {
  grammar: 'Gramática',
  vocabulary: 'Vocabulario',
  listening: 'Comprensión auditiva',
  reading: 'Lectura',
  speaking: 'Speaking',
  writing: 'Escritura',
}

/** Ejercicio autocorregible. Todos se generan desde el formato compacto de src/lib/parse.ts */
export type Exercise =
  | { id: string; kind: 'choice'; prompt: string; options: string[]; answer: number; explain: string; audio?: boolean }
  | { id: string; kind: 'fill'; prompt: string; answers: string[]; explain: string }
  | { id: string; kind: 'order'; sentence: string; explain: string }
  | { id: string; kind: 'transform'; instruction: string; prompt: string; answers: string[]; explain: string }
  | { id: string; kind: 'correct'; prompt: string; answers: string[]; explain: string }

export interface GrammarTopic {
  id: string
  level: Level
  title: string
  titleEs: string
  theory: string
  exercises: Exercise[]
}

export interface VocabWord {
  id: string
  word: string
  pos: string
  es: string
  example: string
  da?: boolean
}

export interface Dialogue {
  id: string
  title: string
  titleEs: string
  level: Level
  area: 'daily' | 'work'
  lines: { speaker: string; text: string }[]
  questions: Exercise[]
}

export interface Reading {
  id: string
  title: string
  titleEs: string
  level: Level
  text: string
  questions: Exercise[]
}

export interface SpeakingTask {
  id: string
  title: string
  titleEs: string
  level: Level
  context: string
  turns: { prompt: string; model: string }[]
}

export interface InterviewQuestion {
  id: string
  question: string
  es: string
  modelA2: string
  modelB1: string
  tip: string
}

export interface DaPhrase {
  id: string
  phrase: string
  es: string
  context: string
}

export interface WritingTask {
  id: string
  level: Level
  title: string
  prompt: string
  minWords: number
  maxWords: number
  checks: { label: string; pattern: string; flags?: string; hint: string }[]
  model: string
}

/** Registro de cada respuesta. Es la única fuente de las estadísticas. */
export interface Attempt {
  id?: number
  ts: number
  date: string
  skill: Skill
  itemId: string
  topicId?: string
  correct: boolean
  given?: string
  expected?: string
  /** Proporción 0–1 cuando la respuesta tiene puntaje parcial (dictado, coincidencia de palabras). */
  score?: number
  source: 'lesson' | 'practice' | 'diagnostic' | 'test' | 'review'
}

export interface Card {
  id: string
  kind: 'vocab' | 'error'
  due: string
  interval: number
  ease: number
  reps: number
  lapses: number
  lastReview?: string
  created: string
}

export interface DayLog {
  date: string
  seconds: number
  activities: number
}

export interface DiagnosticResult {
  date: string
  level: Level
  label: string
  byLevel: Record<Level, { correct: number; total: number }>
  bySkill: Record<string, { correct: number; total: number }>
  weak: Skill[]
}

export type StepKey = 'review' | 'grammar' | 'listening' | 'output' | 'da'
export type WeekendStepKey = 'reading1' | 'reading2' | 'review' | 'test' | 'conversation' | 'interview'

export interface Profile {
  startDate: string
  diagnostic?: DiagnosticResult
  newWordsPerDay: number
  voiceURI?: string
  rate: number
  lessons: Record<number, { steps: Partial<Record<StepKey, boolean>>; completed?: string; introduced?: number }>
  weekends: Record<number, { steps: Partial<Record<WeekendStepKey, boolean>>; testScore?: number }>
  introducedWords: number
}
