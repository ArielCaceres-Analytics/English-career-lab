import { describe, expect, it } from 'vitest'
import { matches, normalize, wordDiff, addDays, daysBetween } from '../src/lib/normalize'
import { newCard, review, cardState } from '../src/lib/srs'
import { scoreDiagnostic } from '../src/lib/diagnostic'
import { checkWriting, COMMON_ERRORS } from '../src/lib/writingCheck'
import { writingTasks } from '../src/content'

describe('validación de respuestas', () => {
  it('ignora mayúsculas, puntuación y acepta contracciones', () => {
    expect(matches("I'm not tired.", ['I am not tired.'])).toBe(true)
    expect(matches('she isnt tired', ["She isn't tired."])).toBe(false)
    expect(matches('She ISN’T tired', ["She is not tired."])).toBe(true)
    expect(matches('they are', ["They're"])).toBe(true)
    expect(matches('  works ', ['works'])).toBe(true)
    expect(matches('work', ['works'])).toBe(false)
    expect(matches('', ['x'])).toBe(false)
    expect(normalize("Can't")).toBe('cannot')
  })

  it('compara dictados palabra por palabra', () => {
    const r = wordDiff('There are 200 missing values.', 'there are 200 missing value')
    expect(r.correct).toBe(4)
    expect(r.total).toBe(5)
    expect(r.tokens[4].ok).toBe(false)
  })

  it('maneja fechas locales', () => {
    expect(addDays('2026-02-28', 1)).toBe('2026-03-01')
    expect(daysBetween('2026-01-01', '2026-01-31')).toBe(30)
  })
})

describe('repetición espaciada (SM-2)', () => {
  it('programa 1, 3 y luego intervalo × facilidad', () => {
    let c = newCard('x', 'vocab', '2026-01-01')
    c = review(c, 2, '2026-01-01')
    expect([c.interval, c.due]).toEqual([1, '2026-01-02'])
    c = review(c, 2, '2026-01-02')
    expect([c.interval, c.due]).toEqual([3, '2026-01-05'])
    c = review(c, 2, '2026-01-05')
    expect(c.interval).toBe(8)
    expect(cardState(c)).toBe('learning')
  })
  it('"Otra vez" reinicia y baja la facilidad', () => {
    let c = review(review(newCard('x', 'vocab', '2026-01-01'), 2, '2026-01-01'), 0, '2026-01-02')
    expect([c.interval, c.reps, c.due, c.lapses]).toEqual([0, 0, '2026-01-02', 1])
    expect(c.ease).toBeCloseTo(2.3)
  })
  it('una tarjeta con intervalo ≥ 21 días cuenta como dominada', () => {
    const c = { ...newCard('x', 'vocab'), reps: 4, interval: 21 }
    expect(cardState(c)).toBe('known')
  })
})

describe('diagnóstico', () => {
  const answers = (pcts: Record<string, number>) =>
    (['A1', 'A2', 'B1', 'B2'] as const).flatMap((level) =>
      Array.from({ length: 10 }, (_, i) => ({ level, skill: (i % 2 ? 'grammar' : 'listening') as 'grammar' | 'listening', correct: i < pcts[level] * 10 })),
    )
  it('estima el nivel más alto con ≥60% y anteriores aprobados', () => {
    expect(scoreDiagnostic(answers({ A1: 0.9, A2: 0.7, B1: 0.4, B2: 0.8 })).level).toBe('A2')
    expect(scoreDiagnostic(answers({ A1: 0.5, A2: 0.9, B1: 0.9, B2: 0.9 })).label).toBe('A1 inicial')
    expect(scoreDiagnostic(answers({ A1: 1, A2: 1, B1: 1, B2: 0.6 })).level).toBe('B2')
  })
  it('identifica habilidades débiles', () => {
    const r = scoreDiagnostic([
      { level: 'A1', skill: 'grammar', correct: true },
      { level: 'A1', skill: 'grammar', correct: true },
      { level: 'A1', skill: 'listening', correct: false },
      { level: 'A1', skill: 'listening', correct: true },
      { level: 'A1', skill: 'listening', correct: false },
    ])
    expect(r.weak).toEqual(['listening'])
  })
})

describe('corrección de escritura por reglas', () => {
  const t = writingTasks[0]
  it('detecta errores típicos', () => {
    const r = checkWriting(t, 'my name is Ariel. i am from Peru. I have 29 years. I am a data analyst and I use Excel every day at work.')
    expect(r.errors).toContain('El pronombre "I" (yo) siempre va en mayúscula.')
    expect(r.errors.some((e) => e.includes('edad'))).toBe(true)
    expect(r.passed).toBe(false)
  })
  it('no marca errores en frases correctas', () => {
    const ok = "I don't need help. She doesn't focus on sales. They didn't pass the test. I can work on Monday in March."
    const flagged = COMMON_ERRORS.filter((e) => e.pattern.test(ok)).map((e) => e.msg)
    expect(flagged).toEqual([])
  })
  it('marca doesn\'t + verbo con -s', () => {
    expect(COMMON_ERRORS.some((e) => e.pattern.test("He doesn't works here."))).toBe(true)
    expect(COMMON_ERRORS.some((e) => e.pattern.test("She didn't sent it."))).toBe(false)
    expect(COMMON_ERRORS.some((e) => e.pattern.test("She didn't finished it."))).toBe(true)
  })
})
