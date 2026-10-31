import { daPhrases, dialogues, grammarTopics, interviewQuestions, readings, speakingTasks, topicById, vocabOrder, writingTasks } from '../content'
import type { Exercise, Profile } from '../types'
import { shuffle } from './normalize'

/** Fase 1: 13 semanas × 5 lecciones (lunes a viernes) + sesiones de sábado y domingo. */
export const LESSONS = 65
export const WEEKS = 13
export const EX_PER_LESSON = 10

/** Tema de gramática de cada lección (sílabo aprobado, quincenas Q1–Q6 + semana 13 de repaso). */
const BLOCKS: [string, number][] = [
  ['g01', 4], ['g02', 3], ['g03', 3],
  ['g04', 4], ['g05', 3], ['g06', 3],
  ['g07', 4], ['g08', 3], ['g09', 3],
  ['g10', 5], ['g11', 5],
  ['g12', 5], ['g13', 5],
  ['g14', 5], ['mix', 5],
  ['mix', 5],
]
export const LESSON_TOPIC: { topic: string; pos: number }[] = BLOCKS.flatMap(([topic, n]) => Array.from({ length: n }, (_, pos) => ({ topic, pos })))

export const weekOf = (lesson: number) => Math.ceil(lesson / 5)
export const fortnightOf = (lesson: number) => Math.min(7, Math.ceil(lesson / 10))

export function currentLesson(p: Profile): number {
  for (let n = 1; n <= LESSONS; n++) if (!p.lessons[n]?.completed) return n
  return LESSONS
}

export function lessonsDone(p: Profile): number {
  return Object.values(p.lessons).filter((l) => l.completed).length
}

/** Temas desbloqueados: los de las lecciones ya alcanzadas. */
export function unlockedTopics(p: Profile) {
  const cur = currentLesson(p)
  const ids = new Set(LESSON_TOPIC.slice(0, cur).map((l) => l.topic).filter((t) => t !== 'mix'))
  return grammarTopics.filter((t) => ids.has(t.id))
}

export function lessonExercises(n: number, p: Profile, wrongOrUnseen: Set<string>): { title: string; topicId?: string; exercises: Exercise[] } {
  const { topic, pos } = LESSON_TOPIC[n - 1]
  if (topic !== 'mix') {
    const t = topicById[topic]
    const start = (pos * EX_PER_LESSON) % t.exercises.length
    return { title: t.titleEs, topicId: t.id, exercises: t.exercises.slice(start, start + EX_PER_LESSON) }
  }
  // Repaso mixto: primero ejercicios que fallaste o no has visto de todos los temas desbloqueados.
  const pool = unlockedTopics(p).flatMap((t) => t.exercises)
  const pending = shuffle(pool.filter((e) => wrongOrUnseen.has(e.id)), n)
  const rest = shuffle(pool.filter((e) => !wrongOrUnseen.has(e.id)), n * 7)
  return { title: 'Repaso mixto de gramática', exercises: [...pending, ...rest].slice(0, EX_PER_LESSON) }
}

export const lessonDialogue = (n: number) => dialogues[(n - 1) % dialogues.length]
export const lessonPhrase = (n: number) => daPhrases[(n - 1) % daPhrases.length]

/** Lecciones impares: speaking (role-play). Pares: escritura. */
export function lessonOutput(n: number): { kind: 'speaking'; index: number } | { kind: 'writing'; index: number } {
  if (n % 2 === 1) {
    const k = (n + 1) / 2
    return { kind: 'speaking', index: Math.min(speakingTasks.length - 1, Math.floor(((k - 1) * speakingTasks.length) / 33)) }
  }
  const k = n / 2
  return { kind: 'writing', index: Math.min(writingTasks.length - 1, Math.floor(((k - 1) * writingTasks.length) / 32)) }
}

export function weekendContent(week: number) {
  return {
    readings: [readings[(week - 1) * 2], readings[(week - 1) * 2 + 1]].filter(Boolean),
    speaking: speakingTasks[Math.min(speakingTasks.length - 1, Math.floor(((week - 1) * speakingTasks.length) / WEEKS) + 1)],
    interview: interviewQuestions[(week - 1) % interviewQuestions.length],
    topics: Array.from(new Set(LESSON_TOPIC.slice((week - 1) * 5, week * 5).map((l) => l.topic))),
  }
}

/** Mini-test semanal: 10 de gramática de los temas de la semana (si es repaso, de todos) + 5 de vocabulario ya introducido. */
export function weeklyTest(week: number, p: Profile): Exercise[] {
  const { topics } = weekendContent(week)
  const topicList = topics.includes('mix') ? unlockedTopics(p) : topics.map((t) => topicById[t])
  const grammar = shuffle(topicList.flatMap((t) => t.exercises).filter((e) => e.kind !== 'order'), week * 31).slice(0, 10)
  const known = vocabOrder.slice(0, Math.max(20, p.introducedWords))
  const vocab = shuffle(known, week * 17)
    .slice(0, 5)
    .map((w, i): Exercise => {
      const distractors = shuffle(known.filter((x) => x.id !== w.id && x.es !== w.es), week * 13 + i).slice(0, 2).map((x) => x.es)
      const options = shuffle([w.es, ...distractors], week + i)
      return { id: `wt${week}-v${i}-${w.id}`, kind: 'choice', prompt: `¿Qué significa "${w.word}"?`, options, answer: options.indexOf(w.es), explain: `"${w.word}" = ${w.es}. Ejemplo: ${w.example}` }
    })
  return [...grammar, ...vocab]
}
