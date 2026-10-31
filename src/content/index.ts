import type { DaPhrase, Exercise, GrammarTopic, InterviewQuestion, Level, Skill, VocabWord } from '../types'
import { parseDialogues, parseExercise, parseExercises, parseLines, parseReadings, parseSpeaking } from '../lib/parse'
import { grammar1 } from './grammar1'
import { grammar2 } from './grammar2'
import { grammar3 } from './grammar3'
import { vocab1 } from './vocab1'
import { vocab2 } from './vocab2'
import { vocab3 } from './vocab3'
import { vocab4 } from './vocab4'
import { daPhrases as daPhrasesSrc, daTerms as daTermsSrc } from './da'
import { dialogues1 } from './dialogues1'
import { dialogues2 } from './dialogues2'
import { dialogues3 } from './dialogues3'
import { readingsSrc } from './readings'
import { interviewSrc, speakingSrc } from './speaking'
import { diagGrammar, diagListening, diagReading, diagReadingTexts, diagSpeaking, diagVocab } from './diagnostic'
export { writingTasks } from './writing'

export const grammarTopics: GrammarTopic[] = [...grammar1, ...grammar2, ...grammar3].map((t) => ({
  id: t.id,
  level: t.level as Level,
  title: t.title,
  titleEs: t.titleEs,
  theory: t.theory,
  exercises: parseExercises(t.items, t.id),
}))
export const topicById = Object.fromEntries(grammarTopics.map((t) => [t.id, t]))

const general = parseLines<VocabWord>([vocab1, vocab2, vocab3, vocab4].join('\n'), ['word', 'pos', 'es', 'example'], 'v')
const da = parseLines<VocabWord>(daTermsSrc, ['word', 'pos', 'es', 'example'], 'da').map((w) => ({ ...w, da: true }))
export const generalWords: VocabWord[] = general
export const daWords: VocabWord[] = da

/** Orden de introducción: cada bloque de 15 palabras = 13 generales + 2 de Data Analyst. */
export const vocabOrder: VocabWord[] = (() => {
  const out: VocabWord[] = []
  let g = 0
  let d = 0
  while (g < general.length || d < da.length) {
    for (let i = 0; i < 13 && g < general.length; i++) out.push(general[g++])
    for (let i = 0; i < 2 && d < da.length; i++) out.push(da[d++])
  }
  return out
})()
export const wordById = Object.fromEntries(vocabOrder.map((w) => [w.id, w]))

export const daPhrases: DaPhrase[] = parseLines<DaPhrase>(daPhrasesSrc, ['phrase', 'es', 'context'], 'dp')
export const dialogues = parseDialogues([dialogues1, dialogues2, dialogues3].join('\n'))
export const readings = parseReadings(readingsSrc)
export const speakingTasks = parseSpeaking(speakingSrc)
export const interviewQuestions: InterviewQuestion[] = parseLines<InterviewQuestion>(interviewSrc, ['question', 'es', 'modelA2', 'modelB1', 'tip'], 'iq')

export interface DiagItem {
  id: string
  skill: Skill
  level: Level
  audio?: string
  textId?: string
  exercise: Exercise
}
function diag(src: string, skill: Skill, prefix: string): DiagItem[] {
  return src
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l, i) => {
      const [level, extra, prompt, opts] = l.split('|').map((s) => s.trim())
      const id = `${prefix}${i + 1}`
      return {
        id,
        skill,
        level: level as Level,
        audio: skill === 'listening' ? extra : undefined,
        textId: skill === 'reading' ? extra : undefined,
        exercise: parseExercise(`C:${prompt} | ${opts} | `, id),
      }
    })
}
export const diagnosticItems: DiagItem[] = [
  ...diag(diagGrammar, 'grammar', 'dg'),
  ...diag(diagVocab, 'vocabulary', 'dv'),
  ...diag(diagListening, 'listening', 'dl'),
  ...diag(diagReading, 'reading', 'dr'),
]
export { diagReadingTexts, diagSpeaking }

/** Busca cualquier ejercicio por id (para el repaso de errores). */
export const exerciseById: Record<string, { exercise: Exercise; skill: Skill; topicId?: string; audio?: string }> = (() => {
  const m: Record<string, { exercise: Exercise; skill: Skill; topicId?: string; audio?: string }> = {}
  for (const t of grammarTopics) for (const e of t.exercises) m[e.id] = { exercise: e, skill: 'grammar', topicId: t.id }
  for (const d of dialogues) for (const q of d.questions) m[q.id] = { exercise: q, skill: 'listening' }
  for (const r of readings) for (const q of r.questions) m[q.id] = { exercise: q, skill: 'reading' }
  return m
})()
