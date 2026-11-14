import { useEffect, useState } from 'react'

export type ThemeMode = 'auto' | 'light' | 'dark'
const KEY = 'ecl-theme'
export const THEME_LABEL: Record<ThemeMode, string> = { auto: 'Auto', light: 'Claro', dark: 'Oscuro' }
const NEXT: Record<ThemeMode, ThemeMode> = { auto: 'light', light: 'dark', dark: 'auto' }

function read(): ThemeMode {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : 'auto'
  } catch {
    return 'auto'
  }
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', mode)
  const dark = mode === 'dark' || (mode === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0d1424' : '#1f3a68')
}

/** Tema Auto / Claro / Oscuro: Auto sigue al sistema; la elección se recuerda en este dispositivo. */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(read)
  useEffect(() => {
    applyTheme(mode)
    try {
      if (mode === 'auto') localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, mode)
    } catch {
      /* almacenamiento bloqueado: el tema solo dura esta visita */
    }
  }, [mode])
  return { mode, cycle: () => setMode((m) => NEXT[m]) }
}
