import { useEffect, useState } from 'react'
import { Card, Header } from '../components/ui'
import * as db from '../lib/db'
import { englishVoices, onVoicesReady, recorderSupported, speak, srSupported, ttsSupported } from '../lib/speech'
import { useStore } from '../store'

export function Settings() {
  const { profile, updateProfile, reload } = useStore()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [msg, setMsg] = useState('')
  useEffect(() => onVoicesReady(() => setVoices(englishVoices())), [])

  const exportData = async () => {
    const json = await db.exportJson()
    const blob = new Blob([json], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `english-career-lab-respaldo-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMsg('Respaldo descargado. Guárdalo en Google Drive, iCloud o tu correo.')
  }

  const importData = async (file: File) => {
    try {
      await db.importJson(await file.text())
      await reload()
      setMsg('Progreso importado correctamente.')
    } catch (e) {
      setMsg(`No se pudo importar: ${(e as Error).message}`)
    }
  }

  return (
    <div>
      <Header title="Settings" es="Ajustes" subtitle="Voz, palabras nuevas por lección y respaldo de tu progreso" />
      <Card>
        <h3>Voz en inglés</h3>
        {ttsSupported ? (
          <>
            <select value={profile.voiceURI ?? ''} onChange={(e) => updateProfile((p) => ({ ...p, voiceURI: e.target.value || undefined }))}>
              <option value="">Automática (inglés de EE.UU.)</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
            <label className="field">
              Velocidad: {profile.rate.toFixed(2)}
              <input type="range" min={0.5} max={1.2} step={0.05} value={profile.rate} onChange={(e) => updateProfile((p) => ({ ...p, rate: Number(e.target.value) }))} />
            </label>
            <button className="btn" onClick={() => speak('Hi! I am a data analyst. I work with Excel, SQL and Power BI.')}>
              🔊 Probar voz
            </button>
          </>
        ) : (
          <p className="warn-box">Tu navegador no tiene síntesis de voz.</p>
        )}
        <p className="small muted">
          Compatibilidad de este navegador: voz {ttsSupported ? '✓' : '✗'} · reconocimiento de voz {srSupported ? '✓' : '✗ (usa Chrome o Safari)'} · grabación {recorderSupported ? '✓' : '✗'}
        </p>
      </Card>

      <Card>
        <h3>Palabras nuevas por lección</h3>
        <select value={profile.newWordsPerDay} onChange={(e) => updateProfile((p) => ({ ...p, newWordsPerDay: Number(e.target.value) }))}>
          {[8, 10, 12, 15, 18, 20].map((n) => (
            <option key={n} value={n}>
              {n} palabras
            </option>
          ))}
        </select>
        <p className="small muted">Con 15 por lección llegas a ~1,000 palabras al terminar la fase 1 (65 lecciones).</p>
      </Card>

      <Card>
        <h3>Respaldo de tu progreso</h3>
        <p className="small muted">Tu progreso se guarda solo en este dispositivo (IndexedDB). Exporta un respaldo cada semana y úsalo para pasar tu avance de la laptop al iPhone.</p>
        <div className="row wrap">
          <button className="btn primary" onClick={exportData}>
            ⬇ Exportar progreso
          </button>
          <label className="btn">
            ⬆ Importar progreso
            <input type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
          </label>
        </div>
        <p className="small muted">Importar reemplaza el progreso actual de este dispositivo.</p>
        {msg && <p className="feedback ok">{msg}</p>}
      </Card>

      <Card>
        <h3>Instalar la app</h3>
        <p className="small">
          <b>iPhone (Safari):</b> botón Compartir → “Agregar a pantalla de inicio”.
          <br />
          <b>Laptop (Chrome o Edge):</b> icono de instalar en la barra de direcciones → “Instalar”.
        </p>
      </Card>

      <Card>
        <h3>Borrar todo</h3>
        <button
          className="btn danger"
          onClick={async () => {
            if (prompt('Esto borra todo tu progreso de este dispositivo. Escribe BORRAR para confirmar.') === 'BORRAR') {
              await db.resetAll()
              await reload()
              setMsg('Progreso borrado.')
            }
          }}
        >
          Borrar mi progreso
        </button>
      </Card>
      <p className="center small muted">English Career Lab · sin cuentas, sin suscripciones · tus datos no salen de tu dispositivo</p>
    </div>
  )
}
