import type { ReactNode } from 'react'

/** Íconos SVG propios (trazo 1.8, heredan el color del texto). Reemplazan a los emojis en la navegación y las tarjetas. */
const PATHS: Record<string, ReactNode> = {
  today: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  practice: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  progress: <path d="M4 20V11M10 20V5M16 20v-6M2 20h20" />,
  about: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </>
  ),
  settings: (
    <>
      <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  listening: <path d="M3 15v-3a9 9 0 0 1 18 0v3M3 15h3v6H4a1 1 0 0 1-1-1zM21 15h-3v6h2a1 1 0 0 0 1-1z" />,
  speaking: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  reading: <path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14" />,
  writing: <path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4" />,
  grammar: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  vocabulary: <path d="M8 4h10a2 2 0 0 1 2 2v10M4 8h10a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />,
  review: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />,
  interview: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  data: <path d="M4 4v16h16M8 16v-4M12 16V8M16 16v-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />,
  auto: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </>
  ),
  flame: <path d="M12 22c4 0 7-3 7-7 0-4.5-3.5-6.5-4.5-11-2 1.6-3.5 4-3.5 6.5-1-.8-1.8-2-2-3.5C6.5 9 5 11.6 5 15c0 4 3 7 7 7z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.2v.01M12 17v-3.8a2.2 2.2 0 0 1 4.4 0V17M12 10.5V17" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  target: <path d="M4 20 10 9l4 6 3-4 3 9z" />,
}

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}

/** Símbolo de la marca: burbuja de conversación con barras de datos (inglés + Data Analyst). */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true" className="logo">
      <defs>
        <linearGradient id="ecl-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a4a85" />
          <stop offset="1" stopColor="#14213d" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="120" fill="url(#ecl-g)" />
      <path d="M128 132h256a44 44 0 0 1 44 44v132a44 44 0 0 1-44 44H236l-78 62v-62h-30a44 44 0 0 1-44-44V176a44 44 0 0 1 44-44z" fill="#fff" />
      <rect x="168" y="250" width="44" height="54" rx="10" fill="#f26b4f" />
      <rect x="234" y="212" width="44" height="92" rx="10" fill="#f26b4f" />
      <rect x="300" y="178" width="44" height="126" rx="10" fill="#1f3a68" />
    </svg>
  )
}
