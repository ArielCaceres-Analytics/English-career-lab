import { Icon, Logo, type IconName } from './components/icons'
import { useHash } from './components/ui'
import { THEME_LABEL, useTheme } from './lib/theme'
import { PROFILE } from './profile'
import { AboutView } from './views/About'
import { useStore } from './store'
import { DiagnosticView } from './views/Diagnostic'
import { Home } from './views/Home'
import { LessonView } from './views/Lesson'
import {
  DaPage, GrammarList, GrammarTopicPage, InterviewPage, ListeningList, ListeningPage, PracticeHub, ReadingList, ReadingPage, ReviewPage, SpeakingList, SpeakingPage, VocabPage, WritingList, WritingPage,
} from './views/Practice'
import { ProgressView } from './views/ProgressView'
import { Settings } from './views/Settings'
import { WeekendView } from './views/Weekend'

const NAV: { href: string; icon: IconName; label: string; es: string; match: (h: string) => boolean }[] = [
  { href: '#/', icon: 'today', label: 'Today', es: 'Hoy', match: (h) => h === '#/' || h.startsWith('#/lesson') || h.startsWith('#/weekend') || h.startsWith('#/diagnostic') },
  { href: '#/practice', icon: 'practice', label: 'Practice', es: 'Practicar', match: (h) => h.startsWith('#/practice') },
  { href: '#/progress', icon: 'progress', label: 'Progress', es: 'Progreso', match: (h) => h.startsWith('#/progress') },
  { href: '#/about', icon: 'about', label: 'About me', es: 'Sobre mí', match: (h) => h.startsWith('#/about') },
  { href: '#/settings', icon: 'settings', label: 'Settings', es: 'Ajustes', match: (h) => h.startsWith('#/settings') },
]

function route(h: string) {
  const p = h.replace(/^#\/?/, '').split('/').filter(Boolean)
  switch (p[0]) {
    case undefined:
      return <Home />
    case 'lesson':
      return <LessonView key={p[1]} n={Number(p[1]) || 1} />
    case 'weekend':
      return <WeekendView key={p[1]} week={Number(p[1]) || 1} />
    case 'diagnostic':
      return <DiagnosticView />
    case 'progress':
      return <ProgressView />
    case 'settings':
      return <Settings />
    case 'about':
      return <AboutView />
    case 'practice':
      switch (p[1]) {
        case undefined:
          return <PracticeHub />
        case 'review':
          return <ReviewPage />
        case 'grammar':
          return p[2] ? <GrammarTopicPage key={p[2]} id={p[2]} /> : <GrammarList />
        case 'vocab':
          return <VocabPage />
        case 'listening':
          return p[2] ? <ListeningPage key={p[2]} id={p[2]} /> : <ListeningList />
        case 'reading':
          return p[2] ? <ReadingPage key={p[2]} id={p[2]} /> : <ReadingList />
        case 'speaking':
          return p[2] ? <SpeakingPage key={p[2]} id={p[2]} /> : <SpeakingList />
        case 'writing':
          return p[2] ? <WritingPage key={p[2]} id={p[2]} /> : <WritingList />
        case 'interview':
          return <InterviewPage />
        case 'da':
          return <DaPage />
      }
  }
  return <Home />
}

function ThemeToggle() {
  const { mode, cycle } = useTheme()
  const icon: IconName = mode === 'auto' ? 'auto' : mode === 'light' ? 'sun' : 'moon'
  return (
    <button type="button" className="theme-toggle" onClick={cycle} title={`Tema: ${THEME_LABEL[mode]} (toca para cambiar)`} aria-label={`Tema: ${THEME_LABEL[mode]}. Cambiar tema`}>
      <Icon name={icon} size={18} />
      <span>{THEME_LABEL[mode]}</span>
    </button>
  )
}

export default function App() {
  const hash = useHash()
  const { loaded } = useStore()
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-in">
          <a className="brand" href="#/">
            <Logo size={38} />
            <span>
              English Career Lab
              <small>por {PROFILE.fullName}</small>
            </span>
          </a>
          <nav className="topnav" aria-label="Secciones">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={n.match(hash) ? 'on' : ''} title={n.es}>
                <Icon name={n.icon} size={18} />
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="main">{loaded ? route(hash) : <p className="muted center">Cargando tu progreso…</p>}</main>
      <nav className="tabbar" aria-label="Secciones">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={n.match(hash) ? 'on' : ''}>
            <Icon name={n.icon} size={22} />
            <span>{n.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
