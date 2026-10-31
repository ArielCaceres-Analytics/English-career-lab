import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Attempt, Card, DayLog, Profile, StepKey, WeekendStepKey } from './types'
import * as db from './lib/db'
import { addDays, today } from './lib/normalize'
import { newCard, review, type Grade } from './lib/srs'
import { setSpeechPrefs } from './lib/speech'

export const defaultProfile = (): Profile => ({
  startDate: today(),
  newWordsPerDay: 15,
  rate: 0.9,
  lessons: {},
  weekends: {},
  introducedWords: 0,
})

interface Store {
  loaded: boolean
  profile: Profile
  attempts: Attempt[]
  cards: Map<string, Card>
  days: Map<string, DayLog>
  record: (list: Omit<Attempt, 'ts' | 'date'>[]) => Promise<void>
  gradeCard: (id: string, grade: Grade) => Promise<void>
  addCards: (ids: string[], kind: Card['kind']) => Promise<void>
  updateProfile: (fn: (p: Profile) => Profile) => Promise<void>
  completeStep: (lesson: number, step: StepKey) => Promise<void>
  completeWeekendStep: (week: number, step: WeekendStepKey, testScore?: number) => Promise<void>
  addTime: (seconds: number, activity?: boolean) => void
  reload: () => Promise<void>
}

const Ctx = createContext<Store | null>(null)
export const LESSON_STEPS: StepKey[] = ['review', 'grammar', 'listening', 'output', 'da']

export function StoreProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [cards, setCards] = useState<Map<string, Card>>(new Map())
  const [days, setDays] = useState<Map<string, DayLog>>(new Map())
  const profileRef = useRef(profile)
  const cardsRef = useRef(cards)
  const daysRef = useRef(days)
  profileRef.current = profile
  cardsRef.current = cards
  daysRef.current = days

  const reload = useCallback(async () => {
    const snap = await db.loadAll()
    const p = { ...defaultProfile(), ...(snap.profile ?? {}) }
    if (!snap.profile) await db.saveProfile(p)
    setProfile(p)
    setAttempts(snap.attempts)
    setCards(new Map(snap.cards.map((c) => [c.id, c])))
    setDays(new Map(snap.days.map((d) => [d.date, d])))
    setLoaded(true)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  useEffect(() => {
    setSpeechPrefs({ voiceURI: profile.voiceURI, rate: profile.rate })
  }, [profile.voiceURI, profile.rate])

  const updateProfile = useCallback(async (fn: (p: Profile) => Profile) => {
    const next = fn(profileRef.current)
    profileRef.current = next
    setProfile(next)
    await db.saveProfile(next)
  }, [])

  const putCards = useCallback(async (list: Card[]) => {
    const m = new Map(cardsRef.current)
    for (const c of list) m.set(c.id, c)
    cardsRef.current = m
    setCards(m)
    await db.putCards(list)
  }, [])

  const addTime = useCallback((seconds: number, activity = false) => {
    const d = today()
    const cur = daysRef.current.get(d) ?? { date: d, seconds: 0, activities: 0 }
    const next = { ...cur, seconds: cur.seconds + seconds, activities: cur.activities + (activity ? 1 : 0) }
    const m = new Map(daysRef.current)
    m.set(d, next)
    daysRef.current = m
    setDays(m)
    db.putDay(next)
  }, [])

  /** Guarda respuestas. Cada error crea (o reinicia) una tarjeta de repaso de errores para mañana. */
  const record = useCallback(
    async (list: Omit<Attempt, 'ts' | 'date'>[]) => {
      const now = Date.now()
      const d = today()
      const saved = await db.addAttempts(list.map((a) => ({ ...a, ts: now, date: d })))
      setAttempts((prev) => [...prev, ...saved])
      const errorCards: Card[] = []
      for (const a of list) {
        if (a.source === 'diagnostic' || a.source === 'review') continue
        if (a.skill === 'vocabulary' || a.skill === 'speaking' || a.skill === 'writing') continue
        if (!a.correct) {
          const id = `err:${a.itemId}`
          errorCards.push({ ...newCard(id, 'error', d), due: addDays(d, 1) })
        }
      }
      if (errorCards.length) await putCards(errorCards)
    },
    [putCards],
  )

  const gradeCard = useCallback(
    async (id: string, grade: Grade) => {
      const c = cardsRef.current.get(id)
      if (!c) return
      const next = review(c, grade)
      // Un error se da por superado tras 3 repasos correctos seguidos (intervalo ≥ 7 días).
      if (c.kind === 'error' && next.reps >= 3) {
        const m = new Map(cardsRef.current)
        m.delete(id)
        cardsRef.current = m
        setCards(m)
        await db.deleteCards([id])
        return
      }
      await putCards([next])
    },
    [putCards],
  )

  const addCards = useCallback(
    async (ids: string[], kind: Card['kind']) => {
      const list = ids.filter((id) => !cardsRef.current.has(id)).map((id) => newCard(id, kind))
      if (list.length) await putCards(list)
    },
    [putCards],
  )

  const completeStep = useCallback(
    async (lesson: number, step: StepKey) => {
      await updateProfile((p) => {
        const cur = p.lessons[lesson] ?? { steps: {} }
        const steps = { ...cur.steps, [step]: true }
        const done = LESSON_STEPS.every((s) => steps[s])
        return { ...p, lessons: { ...p.lessons, [lesson]: { ...cur, steps, completed: cur.completed ?? (done ? today() : undefined) } } }
      })
      addTime(0, true)
    },
    [updateProfile, addTime],
  )

  const completeWeekendStep = useCallback(
    async (week: number, step: WeekendStepKey, testScore?: number) => {
      await updateProfile((p) => {
        const cur = p.weekends[week] ?? { steps: {} }
        return { ...p, weekends: { ...p.weekends, [week]: { steps: { ...cur.steps, [step]: true }, testScore: testScore ?? cur.testScore } } }
      })
      addTime(0, true)
    },
    [updateProfile, addTime],
  )

  const value = useMemo(
    () => ({ loaded, profile, attempts, cards, days, record, gradeCard, addCards, updateProfile, completeStep, completeWeekendStep, addTime, reload }),
    [loaded, profile, attempts, cards, days, record, gradeCard, addCards, updateProfile, completeStep, completeWeekendStep, addTime, reload],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore fuera de StoreProvider')
  return s
}

/** Cuenta tiempo de estudio real: solo con la pestaña visible y si hubo interacción en los últimos 2 minutos. */
export function useStudyTimer(active = true) {
  const { addTime } = useStore()
  useEffect(() => {
    if (!active) return
    let last = Date.now()
    const mark = () => (last = Date.now())
    const evs = ['pointerdown', 'keydown', 'scroll', 'touchstart']
    evs.forEach((e) => window.addEventListener(e, mark, { passive: true }))
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - last < 120_000) addTime(10)
    }, 10_000)
    return () => {
      window.clearInterval(id)
      evs.forEach((e) => window.removeEventListener(e, mark))
    }
  }, [active, addTime])
}
