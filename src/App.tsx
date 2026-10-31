import { useHash } from './components/ui'
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

const NAV = [
  { href: '#/', icon: '🏠', label: 'Hoy', match: (h: string) => h === '#/' || h.startsWith('#/lesson') || h.startsWith('#/weekend') || h.startsWith('#/diagnostic') },
  { href: '#/practice', icon: '🎯', label: 'Practicar', match: (h: string) => h.startsWith('#/practice') },
  { href: '#/progress', icon: '📈', label: 'Progreso', match: (h: string) => h.startsWith('#/progress') },
  { href: '#/settings', icon: '⚙️', label: 'Ajustes', match: (h: string) => h.startsWith('#/settings') },
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

export default function App() {
  const hash = useHash()
  const { loaded } = useStore()
  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="#/">
          <span className="logo">EC</span>
          <span>
            English Career Lab
            <small>Data Analyst track</small>
          </span>
        </a>
        <nav>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.match(hash) ? 'on' : ''}>
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
      </aside>
      <main className="main">{loaded ? route(hash) : <p className="muted center">Cargando tu progreso…</p>}</main>
      <nav className="tabbar">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={n.match(hash) ? 'on' : ''}>
            <span className="nav-icon">{n.icon}</span>
            <span>{n.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
