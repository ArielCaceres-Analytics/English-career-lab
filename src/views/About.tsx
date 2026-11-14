import { Icon } from '../components/icons'
import { Card, Speak } from '../components/ui'
import { currentLesson, weekOf } from '../lib/plan'
import { PROFILE } from '../profile'
import { useStore } from '../store'

const PITCH =
  "Hi, I'm Ariel. I'm from Peru and I'm becoming a data analyst. I work with Excel, SQL Server and Power BI. I'm learning English because I want to work with companies in the United States."

const MILESTONES = [
  { month: 3, weeks: [1, 13], en: 'Basic conversation', es: 'Conversación básica', level: 'A1 → A2' },
  { month: 6, weeks: [14, 26], en: 'Solid A2', es: 'A2 sólido: reuniones y correos simples', level: 'A2' },
  { month: 9, weeks: [27, 39], en: 'Independent user', es: 'B1: entrevistas y trabajo en equipo', level: 'B1' },
]

export function AboutView() {
  const { profile } = useStore()
  const week = weekOf(currentLesson(profile))
  return (
    <div className="about">
      <header className="about-hero">
        {PROFILE.photo ? <img className="avatar" src={PROFILE.photo} alt={PROFILE.fullName} /> : <span className="avatar initials">{PROFILE.initials}</span>}
        <div>
          <p className="hello">About me · Sobre mí</p>
          <h1>{PROFILE.fullName}</h1>
          <p className="es">
            {PROFILE.role} · {PROFILE.location} → empresas de EE.UU.
          </p>
          <div className="row wrap">
            <a className="btn primary" href={PROFILE.dataSite} target="_blank" rel="noopener">
              <Icon name="data" size={18} /> Dominio de Datos
            </a>
            {PROFILE.linkedin && (
              <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener">
                <Icon name="linkedin" size={18} /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </header>

      <Card>
        <h2>My goal</h2>
        <p className="es">Mi objetivo</p>
        <p>
          Trabajar como <b>Data Analyst para empresas de Estados Unidos</b> desde Perú. Para eso necesito explicar un análisis, participar en un standup y pasar una entrevista en inglés. Esta app es mi plan de 9 meses para llegar a nivel B1, practicando 45 minutos al día con frases reales de trabajo desde el primer día.
        </p>
      </Card>

      <Card className="pitch">
        <h2>My introduction</h2>
        <p className="es">Mi presentación en inglés · escúchala y repítela en voz alta</p>
        <blockquote>{PITCH}</blockquote>
        <div className="row wrap">
          <Speak text={PITCH} label="Escuchar" />
          <Speak text={PITCH} rate={0.7} label="Lento" />
        </div>
      </Card>

      <Card>
        <h2>My path</h2>
        <p className="es">Mi ruta: 3 fases de 13 semanas</p>
        <ol className="timeline">
          {MILESTONES.map((m) => {
            const state = week > m.weeks[1] ? 'done' : week >= m.weeks[0] ? 'now' : ''
            return (
              <li key={m.month} className={state}>
                <span className="tl-dot">{state === 'done' ? <Icon name="check" size={16} /> : m.month}</span>
                <div>
                  <b>
                    Mes {m.month} · {m.en}
                  </b>{' '}
                  <span className="tag">{m.level}</span>
                  <p className="small muted">
                    {m.es} · semanas {m.weeks[0]}–{m.weeks[1]}
                    {state === 'now' ? ` · estás en la semana ${week}` : ''}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Card>

      <Card>
        <h2>Two sites, one career</h2>
        <p className="es">Dos webs, una carrera</p>
        <div className="grid2 twin">
          <a className="twin-item" href={PROFILE.dataSite} target="_blank" rel="noopener">
            <span className="mini-ic sk-data">
              <Icon name="data" />
            </span>
            <span>
              <b>Dominio de Datos</b>
              <span className="small muted">Excel, SQL Server y Power BI: las habilidades técnicas.</span>
            </span>
            <Icon name="external" size={16} />
          </a>
          <a className="twin-item" href="#/">
            <span className="mini-ic sk-speaking">
              <Icon name="speaking" />
            </span>
            <span>
              <b>English Career Lab</b>
              <span className="small muted">El inglés para explicar esas habilidades en una empresa de EE.UU.</span>
            </span>
            <Icon name="arrow" size={16} />
          </a>
        </div>
        <p className="small muted">Sin cuentas ni suscripciones: tu progreso se guarda solo en tu dispositivo.</p>
      </Card>
    </div>
  )
}
