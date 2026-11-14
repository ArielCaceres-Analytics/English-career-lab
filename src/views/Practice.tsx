import { useMemo, useState } from 'react'
import { daPhrases, dialogues, grammarTopics, interviewQuestions, readings, speakingTasks, topicById, vocabOrder, writingTasks } from '../content'
import { Icon, type IconName } from '../components/icons'
import { ExerciseRunner } from '../components/Exercise'
import { ListeningBlock } from '../components/Listening'
import { InterviewBlock, ReadingBlock, RolePlay, Theory, WritingBlock } from '../components/Output'
import { dueCards, ReviewSession } from '../components/Review'
import { Card, Header, Speak } from '../components/ui'
import { currentLesson, LESSONS, unlockedTopics } from '../lib/plan'
import { shuffle } from '../lib/normalize'
import { cardState } from '../lib/srs'
import { errorsByTopic } from '../lib/stats'
import { useStore, useStudyTimer } from '../store'

const unlockedCount = (len: number, cur: number) => Math.max(1, Math.ceil((len * cur) / LESSONS))

export function PracticeHub() {
  const { cards } = useStore()
  const due = dueCards(cards).length
  const items: { href: string; icon: IconName; sk: string; t: string; d: string }[] = [
    { href: '#/practice/review', icon: 'review', sk: 'vocabulary', t: 'Repaso de errores y tarjetas', d: `${due} pendientes hoy` },
    { href: '#/practice/grammar', icon: 'grammar', sk: 'grammar', t: 'Grammar Lab', d: 'Completar, ordenar, transformar y corregir' },
    { href: '#/practice/vocab', icon: 'vocabulary', sk: 'vocabulary', t: 'Vocabulary Trainer', d: 'Repetición espaciada con audio y ejemplos' },
    { href: '#/practice/listening', icon: 'listening', sk: 'listening', t: 'Listening Lab', d: 'Diálogos, dictado y shadowing' },
    { href: '#/practice/reading', icon: 'reading', sk: 'reading', t: 'Reading Lab', d: 'Lecturas graduadas con preguntas' },
    { href: '#/practice/speaking', icon: 'speaking', sk: 'speaking', t: 'Speaking Practice', d: 'Role-plays con micrófono' },
    { href: '#/practice/writing', icon: 'writing', sk: 'writing', t: 'Writing Lab', d: 'Mensajes y correos con corrección por reglas' },
    { href: '#/practice/interview', icon: 'interview', sk: 'data', t: 'Interview Simulator', d: `Simulador de entrevista · ${interviewQuestions.length} preguntas con respuestas modelo` },
    { href: '#/practice/da', icon: 'data', sk: 'data', t: 'Data Analyst English', d: 'Términos y frases de SQL, Excel, Power BI y KPIs' },
  ]
  return (
    <div>
      <Header title="Practice" es="Practicar" subtitle="Práctica libre. El contenido se desbloquea a medida que avanzas en el plan." />
      <div className="hub">
        {items.map((i) => (
          <a key={i.href} className="hub-item" href={i.href}>
            <span className={`mini-ic sk-${i.sk}`}>
              <Icon name={i.icon} size={22} />
            </span>
            <span>
              <b>{i.t}</b>
              <span className="muted small">{i.d}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function ReviewPage() {
  useStudyTimer()
  return (
    <div>
      <Header title="Repaso" subtitle="Errores anteriores primero, luego tarjetas de vocabulario." back="#/practice" />
      <Card>
        <ReviewSession onDone={() => (location.hash = '#/practice')} />
      </Card>
    </div>
  )
}

export function GrammarList() {
  const { profile, attempts } = useStore()
  const unlocked = new Set(unlockedTopics(profile).map((t) => t.id))
  const stats = errorsByTopic(attempts)
  return (
    <div>
      <Header title="Grammar Lab" subtitle="14 temas de la fase 1 · 40 ejercicios por tema" back="#/practice" />
      <div className="list">
        {grammarTopics.map((t) => {
          const s = stats.get(t.id)
          const open = unlocked.has(t.id)
          return (
            <a key={t.id} className={`list-item${open ? '' : ' locked'}`} href={open ? `#/practice/grammar/${t.id}` : undefined}>
              <span className="tag">{t.level}</span>
              <span className="grow">
                <b>{t.titleEs}</b>
                <span className="muted small">{t.title}</span>
              </span>
              <span className="muted small">{open ? (s ? `${s.total - s.wrong}/${s.total} correctas` : 'Sin intentos') : '🔒'}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export function GrammarTopicPage({ id }: { id: string }) {
  const { attempts } = useStore()
  useStudyTimer()
  const t = topicById[id]
  const [round, setRound] = useState(0)
  const set = useMemo(() => {
    if (!t) return []
    const ok = new Set(attempts.filter((a) => a.correct).map((a) => a.itemId))
    const pending = shuffle(t.exercises.filter((e) => !ok.has(e.id)))
    const rest = shuffle(t.exercises.filter((e) => ok.has(e.id)))
    return [...pending, ...rest].slice(0, 10)
  }, [id, round]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!t) return <Header title="Tema no encontrado" back="#/practice/grammar" />
  return (
    <div>
      <Header title={t.titleEs} subtitle={`${t.title} · ${t.level}`} back="#/practice/grammar" />
      <Card>
        <Theory text={t.theory} />
      </Card>
      <Card>
        <p className="muted small">Se priorizan los ejercicios que aún no respondiste bien.</p>
        <ExerciseRunner key={round} exercises={set} skill="grammar" source="practice" topicId={t.id} onDone={() => setRound(round + 1)} doneLabel="Otros 10 ejercicios" />
      </Card>
    </div>
  )
}

export function VocabPage() {
  const { profile, cards, addCards, updateProfile } = useStore()
  const [q, setQ] = useState('')
  const [reviewing, setReviewing] = useState(false)
  useStudyTimer(reviewing)
  const due = dueCards(cards, 'vocab').length
  const introduced = vocabOrder.slice(0, profile.introducedWords)
  const list = introduced.filter((w) => !q || w.word.toLowerCase().includes(q.toLowerCase()) || w.es.toLowerCase().includes(q.toLowerCase()))
  const learnMore = async () => {
    const from = profile.introducedWords
    const words = vocabOrder.slice(from, from + 10)
    await addCards(words.map((w) => w.id), 'vocab')
    await updateProfile((p) => ({ ...p, introducedWords: from + words.length }))
  }
  return (
    <div>
      <Header title="Vocabulary Trainer" subtitle={`${profile.introducedWords} de ${vocabOrder.length} palabras introducidas · ${due} para repasar hoy`} back="#/practice" />
      <Card>
        {reviewing ? (
          <ReviewSession kind="vocab" onDone={() => setReviewing(false)} />
        ) : (
          <div className="row wrap">
            <button className="btn primary" onClick={() => setReviewing(true)} disabled={!due}>
              Repasar {due} tarjetas
            </button>
            <button className="btn" onClick={learnMore} disabled={profile.introducedWords >= vocabOrder.length}>
              + Aprender 10 palabras más
            </button>
          </div>
        )}
      </Card>
      <Card>
        <h3>Mis palabras</h3>
        <input className="search" placeholder="Buscar en inglés o español…" value={q} onChange={(e) => setQ(e.target.value)} />
        <table className="words">
          <tbody>
            {list.map((w) => {
              const st = cardState(cards.get(w.id))
              return (
                <tr key={w.id}>
                  <td>
                    <b>{w.word}</b> {w.da && <span className="tag da">DA</span>}
                    <div className="muted small">{w.example}</div>
                  </td>
                  <td>{w.es}</td>
                  <td>
                    <span className={`state ${st}`}>{st === 'known' ? 'Dominada' : st === 'learning' ? 'Aprendiendo' : 'Nueva'}</span>
                  </td>
                  <td>
                    <Speak text={w.word} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {!introduced.length && <p className="muted">Aún no tienes palabras. Empieza tu primera lección o pulsa “Aprender 10 palabras más”.</p>}
      </Card>
    </div>
  )
}

function ContentList<T extends { id: string; title: string; titleEs: string; level: string }>({ title, subtitle, items, unlocked, base }: { title: string; subtitle: string; items: T[]; unlocked: number; base: string }) {
  return (
    <div>
      <Header title={title} subtitle={subtitle} back="#/practice" />
      <div className="list">
        {items.map((d, i) => (
          <a key={d.id} className={`list-item${i < unlocked ? '' : ' locked'}`} href={i < unlocked ? `${base}/${d.id}` : undefined}>
            <span className="tag">{d.level}</span>
            <span className="grow">
              <b>{d.title}</b>
              <span className="muted small">{d.titleEs}</span>
            </span>
            <span className="muted small">{i < unlocked ? '' : '🔒'}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function ListeningList() {
  const { profile } = useStore()
  return <ContentList title="Listening Lab" subtitle="Un diálogo nuevo por lección" items={dialogues} unlocked={currentLesson(profile)} base="#/practice/listening" />
}
export function ListeningPage({ id }: { id: string }) {
  useStudyTimer()
  const d = dialogues.find((x) => x.id === id)
  const [k, setK] = useState(0)
  if (!d) return <Header title="Diálogo no encontrado" back="#/practice/listening" />
  return (
    <div>
      <Header title={d.title} subtitle={d.titleEs} back="#/practice/listening" />
      <Card>
        <ListeningBlock key={k} d={d} onDone={() => setK(k + 1)} />
      </Card>
    </div>
  )
}

export function ReadingList() {
  const { profile } = useStore()
  return <ContentList title="Reading Lab" subtitle="Dos lecturas por semana" items={readings} unlocked={unlockedCount(readings.length, currentLesson(profile))} base="#/practice/reading" />
}
export function ReadingPage({ id }: { id: string }) {
  useStudyTimer()
  const r = readings.find((x) => x.id === id)
  const [k, setK] = useState(0)
  if (!r) return <Header title="Lectura no encontrada" back="#/practice/reading" />
  return (
    <div>
      <Header title={r.title} subtitle={r.titleEs} back="#/practice/reading" />
      <Card>
        <ReadingBlock key={k} r={r} onDone={() => setK(k + 1)} />
      </Card>
    </div>
  )
}

export function SpeakingList() {
  const { profile } = useStore()
  return <ContentList title="Speaking Practice" subtitle="Role-plays guiados. La transcripción del navegador no es una evaluación fonética." items={speakingTasks} unlocked={unlockedCount(speakingTasks.length, currentLesson(profile))} base="#/practice/speaking" />
}
export function SpeakingPage({ id }: { id: string }) {
  useStudyTimer()
  const t = speakingTasks.find((x) => x.id === id)
  const [k, setK] = useState(0)
  if (!t) return <Header title="Role-play no encontrado" back="#/practice/speaking" />
  return (
    <div>
      <Header title={t.title} subtitle={t.titleEs} back="#/practice/speaking" />
      <Card>
        <RolePlay key={k} task={t} onDone={() => setK(k + 1)} />
      </Card>
    </div>
  )
}

export function WritingList() {
  const { profile } = useStore()
  const unlocked = unlockedCount(writingTasks.length, currentLesson(profile))
  return <ContentList title="Writing Lab" subtitle="Corrección verificable por reglas" items={writingTasks.map((w) => ({ ...w, titleEs: w.prompt }))} unlocked={unlocked} base="#/practice/writing" />
}
export function WritingPage({ id }: { id: string }) {
  useStudyTimer()
  const t = writingTasks.find((x) => x.id === id)
  if (!t) return <Header title="Tarea no encontrada" back="#/practice/writing" />
  return (
    <div>
      <Header title="Writing Lab" back="#/practice/writing" />
      <Card>
        <WritingBlock task={t} />
      </Card>
    </div>
  )
}

export function InterviewPage() {
  useStudyTimer()
  const [i, setI] = useState(0)
  const q = interviewQuestions[i]
  return (
    <div>
      <Header title="Simulador de entrevista" subtitle={`Pregunta ${i + 1} de ${interviewQuestions.length}`} back="#/practice" />
      <Card>
        <InterviewBlock key={q.id} q={q} />
        <div className="row">
          <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>
            ← Anterior
          </button>
          <button className="btn primary" disabled={i + 1 >= interviewQuestions.length} onClick={() => setI(i + 1)}>
            Siguiente pregunta →
          </button>
        </div>
      </Card>
    </div>
  )
}

export function DaPage() {
  const { profile } = useStore()
  const [tab, setTab] = useState<'phrases' | 'terms'>('phrases')
  const cur = currentLesson(profile)
  const terms = vocabOrder.slice(0, profile.introducedWords).filter((w) => w.da)
  return (
    <div>
      <Header title="Data Analyst English" subtitle="Frases y términos para tu trabajo" back="#/practice" />
      <div className="seg big-seg">
        <button className={tab === 'phrases' ? 'on' : ''} onClick={() => setTab('phrases')}>
          Frases ({Math.min(cur, daPhrases.length)})
        </button>
        <button className={tab === 'terms' ? 'on' : ''} onClick={() => setTab('terms')}>
          Términos ({terms.length})
        </button>
      </div>
      <Card>
        {tab === 'phrases' ? (
          <ul className="phrases">
            {daPhrases.slice(0, cur).map((p) => (
              <li key={p.id}>
                <b>{p.phrase}</b> <Speak text={p.phrase} />
                <div className="muted small">
                  {p.es} · {p.context}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="phrases">
            {terms.map((w) => (
              <li key={w.id}>
                <b>{w.word}</b> <Speak text={w.word} /> — {w.es}
                <div className="muted small">{w.example}</div>
              </li>
            ))}
            {!terms.length && <p className="muted">Los términos se agregan con las palabras nuevas de cada lección (2 por lección).</p>}
          </ul>
        )}
      </Card>
    </div>
  )
}
