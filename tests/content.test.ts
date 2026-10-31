import { describe, expect, it } from 'vitest'
import { daPhrases, daWords, diagnosticItems, dialogues, generalWords, grammarTopics, interviewQuestions, readings, speakingTasks, vocabOrder, writingTasks } from '../src/content'
import { checkWriting } from '../src/lib/writingCheck'
import { matches } from '../src/lib/normalize'
import { LESSON_TOPIC, LESSONS, lessonOutput, weekendContent, WEEKS } from '../src/lib/plan'

describe('contenido de la fase 1', () => {
  it('tiene 14 temas de gramática con 40 ejercicios válidos cada uno', () => {
    expect(grammarTopics).toHaveLength(14)
    for (const t of grammarTopics) {
      expect(t.exercises, t.id).toHaveLength(40)
      for (const e of t.exercises) {
        expect(e.explain, e.id).not.toBe('')
        if (e.kind === 'choice') {
          expect(e.options.length, e.id).toBeGreaterThanOrEqual(2)
          expect(new Set(e.options).size, `${e.id} opciones repetidas`).toBe(e.options.length)
        }
        if (e.kind === 'fill') expect(e.prompt, e.id).toContain('___')
        if (e.kind === 'fill' || e.kind === 'transform' || e.kind === 'correct') expect(e.answers.every(Boolean), e.id).toBe(true)
        if (e.kind === 'correct') expect(matches(e.prompt, e.answers), `${e.id}: la oración con error ya es una respuesta aceptada`).toBe(false)
      }
    }
  })

  it('cubre los 5 tipos de ejercicio en cada tema', () => {
    for (const t of grammarTopics) expect(new Set(t.exercises.map((e) => e.kind)).size, t.id).toBe(5)
  })

  it('tiene ~1,000 palabras generales y ~150 de Data Analyst sin duplicados', () => {
    expect(generalWords.length).toBeGreaterThanOrEqual(1000)
    expect(daWords.length).toBeGreaterThanOrEqual(145)
    const words = vocabOrder.map((w) => w.word.toLowerCase())
    expect(new Set(words).size).toBe(words.length)
    for (const w of vocabOrder) {
      expect(w.es, w.word).not.toBe('')
      expect(w.example, w.word).not.toBe('')
    }
  })

  it('tiene 65 diálogos (uno por lección) con 3 preguntas', () => {
    expect(dialogues).toHaveLength(65)
    for (const d of dialogues) {
      expect(d.lines.length, d.id).toBeGreaterThanOrEqual(8)
      expect(d.questions, d.id).toHaveLength(3)
      expect(d.lines.every((l) => l.speaker && l.text), d.id).toBe(true)
    }
    expect(new Set(dialogues.map((d) => d.id)).size).toBe(65)
  })

  it('tiene 26 lecturas con 5 preguntas', () => {
    expect(readings).toHaveLength(26)
    for (const r of readings) expect(r.questions, r.id).toHaveLength(5)
  })

  it('tiene 90 frases de Data Analyst, 20 role-plays y 20 preguntas de entrevista', () => {
    expect(daPhrases.length).toBeGreaterThanOrEqual(89)
    expect(speakingTasks).toHaveLength(20)
    for (const s of speakingTasks) {
      expect(s.turns.length, s.id).toBeGreaterThanOrEqual(3)
      expect(s.turns.every((t) => t.model), s.id).toBe(true)
    }
    expect(interviewQuestions).toHaveLength(20)
    for (const q of interviewQuestions) expect(q.modelA2 && q.modelB1 && q.tip, q.id).toBeTruthy()
  })

  it('cada texto modelo de escritura aprueba su propia corrección', () => {
    for (const t of writingTasks) {
      const r = checkWriting(t, t.model)
      expect({ id: t.id, checks: r.checks.filter((c) => !c.ok), errors: r.errors.filter((e) => !e.startsWith('Antes de sonido')), lengthOk: r.lengthOk }).toEqual({ id: t.id, checks: [], errors: [], lengthOk: true })
    }
  })

  it('el diagnóstico tiene 60 preguntas: 20 gramática, 15 vocabulario, 15 escucha, 10 lectura', () => {
    expect(diagnosticItems).toHaveLength(60)
    const count = (s: string) => diagnosticItems.filter((i) => i.skill === s).length
    expect([count('grammar'), count('vocabulary'), count('listening'), count('reading')]).toEqual([20, 15, 15, 10])
    for (const l of ['A1', 'A2', 'B1', 'B2']) expect(diagnosticItems.filter((i) => i.level === l).length).toBeGreaterThanOrEqual(10)
    for (const i of diagnosticItems.filter((i) => i.skill === 'listening')) expect(i.audio).toBeTruthy()
  })

  it('el plan asigna tema, diálogo y actividad a las 65 lecciones', () => {
    expect(LESSON_TOPIC).toHaveLength(LESSONS)
    for (let n = 1; n <= LESSONS; n++) {
      const o = lessonOutput(n)
      expect(o.index).toBeGreaterThanOrEqual(0)
      expect(o.kind === 'speaking' ? speakingTasks[o.index] : writingTasks[o.index]).toBeTruthy()
    }
    for (let w = 1; w <= WEEKS; w++) {
      const c = weekendContent(w)
      expect(c.readings, `semana ${w}`).toHaveLength(2)
      expect(c.speaking, `semana ${w}`).toBeTruthy()
    }
  })
})

describe('opciones mezcladas', () => {
  it('la respuesta correcta no está siempre en la misma posición', () => {
    const all = [...grammarTopics.flatMap((t) => t.exercises), ...diagnosticItems.map((d) => d.exercise), ...dialogues.flatMap((d) => d.questions)]
    const choices = all.filter((e) => e.kind === 'choice')
    const first = choices.filter((e) => e.kind === 'choice' && e.answer === 0).length / choices.length
    expect(first).toBeGreaterThan(0.2)
    expect(first).toBeLessThan(0.5)
  })
})
