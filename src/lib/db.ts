import { openDB, type IDBPDatabase } from 'idb'
import type { Attempt, Card, DayLog, Profile } from '../types'

const DB_NAME = 'english-career-lab'
export const EXPORT_VERSION = 1

let dbp: Promise<IDBPDatabase> | null = null
function db() {
  dbp ??= openDB(DB_NAME, 1, {
    upgrade(d) {
      d.createObjectStore('kv')
      const a = d.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true })
      a.createIndex('date', 'date')
      d.createObjectStore('cards', { keyPath: 'id' })
      d.createObjectStore('days', { keyPath: 'date' })
    },
  })
  return dbp
}

export interface Snapshot {
  profile?: Profile
  attempts: Attempt[]
  cards: Card[]
  days: DayLog[]
}

export async function loadAll(): Promise<Snapshot> {
  const d = await db()
  const [profile, attempts, cards, days] = await Promise.all([
    d.get('kv', 'profile') as Promise<Profile | undefined>,
    d.getAll('attempts') as Promise<Attempt[]>,
    d.getAll('cards') as Promise<Card[]>,
    d.getAll('days') as Promise<DayLog[]>,
  ])
  return { profile, attempts, cards, days }
}

export async function saveProfile(p: Profile) {
  await (await db()).put('kv', p, 'profile')
}

export async function addAttempts(list: Attempt[]): Promise<Attempt[]> {
  const d = await db()
  const tx = d.transaction('attempts', 'readwrite')
  const out: Attempt[] = []
  for (const a of list) out.push({ ...a, id: (await tx.store.add(a)) as number })
  await tx.done
  return out
}

export async function putCards(cards: Card[]) {
  const d = await db()
  const tx = d.transaction('cards', 'readwrite')
  await Promise.all(cards.map((c) => tx.store.put(c)))
  await tx.done
}

export async function deleteCards(ids: string[]) {
  const d = await db()
  const tx = d.transaction('cards', 'readwrite')
  await Promise.all(ids.map((id) => tx.store.delete(id)))
  await tx.done
}

export async function putDay(day: DayLog) {
  await (await db()).put('days', day)
}

export async function exportJson(): Promise<string> {
  const snap = await loadAll()
  return JSON.stringify({ app: 'english-career-lab', version: EXPORT_VERSION, exportedAt: new Date().toISOString(), ...snap })
}

export async function importJson(text: string): Promise<void> {
  const data = JSON.parse(text)
  if (data?.app !== 'english-career-lab' || !Array.isArray(data.attempts) || !Array.isArray(data.cards) || !Array.isArray(data.days))
    throw new Error('El archivo no es un respaldo válido de English Career Lab.')
  const d = await db()
  const tx = d.transaction(['kv', 'attempts', 'cards', 'days'], 'readwrite')
  await Promise.all(['kv', 'attempts', 'cards', 'days'].map((s) => tx.objectStore(s).clear()))
  if (data.profile) await tx.objectStore('kv').put(data.profile, 'profile')
  for (const a of data.attempts) await tx.objectStore('attempts').put(a)
  for (const c of data.cards) await tx.objectStore('cards').put(c)
  for (const day of data.days) await tx.objectStore('days').put(day)
  await tx.done
}

export async function resetAll() {
  const d = await db()
  const tx = d.transaction(['kv', 'attempts', 'cards', 'days'], 'readwrite')
  await Promise.all(['kv', 'attempts', 'cards', 'days'].map((s) => tx.objectStore(s).clear()))
  await tx.done
}
