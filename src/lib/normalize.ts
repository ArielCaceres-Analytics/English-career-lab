const CONTRACTIONS: [RegExp, string][] = [
  [/\bi'm\b/g, 'i am'],
  [/\b(you|we|they)'re\b/g, '$1 are'],
  [/\b(he|she|it|that|what|where|who|there|here)'s\b/g, '$1 is'],
  [/\b(i|you|we|they)'ve\b/g, '$1 have'],
  [/\b(i|you|he|she|it|we|they)'ll\b/g, '$1 will'],
  [/\b(i|you|he|she|we|they)'d\b/g, '$1 would'],
  [/\bcan't\b/g, 'cannot'],
  [/\bcan not\b/g, 'cannot'],
  [/\bwon't\b/g, 'will not'],
  [/\bshan't\b/g, 'shall not'],
  [/\b(is|are|was|were|do|does|did|has|have|had|should|would|could|must)n't\b/g, '$1 not'],
  [/\blet's\b/g, 'let us'],
]

/** Normaliza para comparar: minúsculas, apóstrofos rectos, sin puntuación final, contracciones expandidas. */
export function normalize(s: string): string {
  let t = s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:"]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep)
  return t.replace(/\s+/g, ' ').trim()
}

export function matches(given: string, accepted: string[]): boolean {
  const g = normalize(given)
  if (!g) return false
  return accepted.some((a) => normalize(a) === g)
}

export function words(s: string): string[] {
  return normalize(s).split(' ').filter(Boolean)
}

/** Compara palabra por palabra (alineación LCS) para dictados y shadowing. */
export function wordDiff(target: string, given: string) {
  const a = words(target)
  const b = words(given)
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
  const hit = new Array(a.length).fill(false)
  let i = 0
  let j = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      hit[i] = true
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++
    else j++
  }
  const correct = hit.filter(Boolean).length
  return { tokens: a.map((w, k) => ({ w, ok: hit[k] })), correct, total: a.length, extra: b.length - correct }
}

export function shuffle<T>(arr: T[], seed?: number): T[] {
  const a = [...arr]
  let s = seed ?? Math.floor(Math.random() * 1e9)
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(rnd() * (i + 1))
    ;[a[i], a[k]] = [a[k], a[i]]
  }
  return a
}

export function today(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number)
  return today(new Date(y, m - 1, d + n))
}

export function daysBetween(a: string, b: string): number {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}
