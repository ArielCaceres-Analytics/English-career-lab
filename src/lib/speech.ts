/** Audio gratuito del navegador: Speech Synthesis (voz), Speech Recognition (transcripción) y MediaRecorder (grabarte). */

export const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

export function englishVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported) return []
  return speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'))
}

/** Las voces cargan de forma asíncrona en Chrome. */
export function onVoicesReady(cb: () => void) {
  if (!ttsSupported) return () => {}
  cb()
  speechSynthesis.addEventListener('voiceschanged', cb)
  return () => speechSynthesis.removeEventListener('voiceschanged', cb)
}

let prefs: { voiceURI?: string; rate: number } = { rate: 0.9 }
export function setSpeechPrefs(p: { voiceURI?: string; rate: number }) {
  prefs = p
}

function pickVoice(alt = false): SpeechSynthesisVoice | undefined {
  const voices = englishVoices()
  if (!voices.length) return undefined
  const us = voices.filter((v) => v.lang.replace('_', '-').toLowerCase() === 'en-us')
  const pool = us.length ? us : voices
  const chosen = voices.find((v) => v.voiceURI === prefs.voiceURI) ?? pool[0]
  if (!alt) return chosen
  return pool.find((v) => v !== chosen) ?? voices.find((v) => v !== chosen) ?? chosen
}

export function speak(text: string, opts: { rate?: number; alt?: boolean } = {}): Promise<void> {
  return new Promise((resolve) => {
    if (!ttsSupported) return resolve()
    const u = new SpeechSynthesisUtterance(text)
    const v = pickVoice(opts.alt)
    if (v) u.voice = v
    u.lang = v?.lang ?? 'en-US'
    u.rate = opts.rate ?? prefs.rate
    u.onend = () => resolve()
    u.onerror = () => resolve()
    speechSynthesis.speak(u)
  })
}

export function stopSpeaking() {
  if (ttsSupported) speechSynthesis.cancel()
}

type SR = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}

function srCtor(): (new () => SR) | undefined {
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

export const srSupported = typeof window !== 'undefined' && !!srCtor()

/** Transcribe lo que dices. Es reconocimiento de texto, no una evaluación fonética. */
export function listen(onText: (text: string, final: boolean) => void): { stop: () => void; done: Promise<string> } {
  const Ctor = srCtor()
  if (!Ctor) return { stop: () => {}, done: Promise.reject(new Error('unsupported')) }
  const rec = new Ctor()
  rec.lang = 'en-US'
  rec.interimResults = true
  rec.maxAlternatives = 1
  rec.continuous = true
  let finalText = ''
  const done = new Promise<string>((resolve, reject) => {
    rec.onresult = (e) => {
      let interim = ''
      finalText = ''
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) finalText += r[0].transcript + ' '
        else interim += r[0].transcript
      }
      onText((finalText + interim).trim(), !interim)
    }
    rec.onerror = (e) => (e.error === 'no-speech' || e.error === 'aborted' ? resolve(finalText.trim()) : reject(new Error(e.error)))
    rec.onend = () => resolve(finalText.trim())
  })
  rec.start()
  return { stop: () => rec.stop(), done }
}

export const recorderSupported = typeof window !== 'undefined' && 'MediaRecorder' in window && !!navigator.mediaDevices?.getUserMedia

export async function startRecording(): Promise<{ stop: () => Promise<string> }> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const rec = new MediaRecorder(stream)
  const chunks: Blob[] = []
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
  rec.start()
  return {
    stop: () =>
      new Promise((resolve) => {
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop())
          resolve(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })))
        }
        rec.stop()
      }),
  }
}
