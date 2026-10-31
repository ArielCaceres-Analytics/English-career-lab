# English Career Lab

Aplicación web progresiva (PWA) para aprender inglés desde nivel básico hasta B1, orientada a conseguir trabajo como **Data Analyst en empresas de EE.UU.** desde Perú. Interfaz en español, contenido en inglés, sin cuentas, sin suscripciones y sin APIs de pago. Todo el progreso se guarda en tu dispositivo.

**App publicada:** https://arielcaceres-analytics.github.io/english-career-lab/

## Qué incluye (fase 1: semanas 1–13, meta "conversación básica" al mes 3)

| Módulo | Contenido |
|---|---|
| Prueba diagnóstica | 60 preguntas (20 gramática, 15 vocabulario, 15 escucha, 10 lectura) de A1 a B2 + 5 tareas de habla sin puntaje |
| Plan diario | 65 lecciones de 45 min (lunes a viernes) en 5 bloques: repaso espaciado, gramática, escucha, hablar/escribir y frase Data Analyst |
| Fin de semana | 13 sesiones: sábado (2 lecturas + repaso, 60 min) y domingo (mini-test de 15 preguntas + conversación simulada + pregunta de entrevista, 60 min) |
| Grammar Lab | 14 temas A1–A2 × 40 ejercicios = 560, con 5 tipos: elegir, completar, ordenar, transformar y corregir. Explicación en español de cada error |
| Vocabulary Trainer | ~1,010 palabras generales por frecuencia + 150 términos de Data Analyst, con audio, ejemplo y repetición espaciada (SM-2) |
| Listening Lab | 65 diálogos con 2 voces, velocidad ajustable, transcripción ocultable, preguntas, dictado y shadowing |
| Reading Lab | 26 lecturas graduadas (5 preguntas cada una), la mitad de trabajo |
| Speaking Practice | 20 role-plays guiados con grabación y transcripción del navegador |
| Writing Lab | 17 tareas (mensajes, correos, standup, describir gráficos) con corrección verificable por reglas |
| Entrevista | 20 preguntas con respuesta modelo A2 y B1 y consejo |
| Data Analyst English | 90 frases del día + términos de SQL, Excel, Power BI y KPIs |
| Repaso de errores | Cada respuesta incorrecta vuelve al día siguiente y se repite con intervalos crecientes hasta acertarla 3 veces seguidas |
| Progreso | Minutos reales, racha, lecciones, % por habilidad, dictado, vocabulario dominado, errores frecuentes, mini-tests |
| Respaldo | Exportar / importar el progreso en JSON (sirve para pasar el avance de la laptop al iPhone) |

El contenido de las fases 2 y 3 (A2 sólido y B1) se agrega antes de que lo necesites: el formato es texto simple en `src/content/`.

## Instalar en el iPhone o la laptop

- **iPhone (Safari):** abre el enlace → botón Compartir → **Agregar a pantalla de inicio**.
- **Laptop (Chrome o Edge):** abre el enlace → icono de instalar en la barra de direcciones → **Instalar**.

Después de la primera visita funciona sin internet. El progreso de cada dispositivo es independiente: usa **Ajustes → Exportar progreso** y luego **Importar** en el otro dispositivo.

## Ejecutar localmente

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # valida contenido y lógica (vitest)
npm run build      # genera dist/ (PWA)
npm run preview    # sirve dist/ en http://localhost:4173
```

## Publicación

Cada push a `main` ejecuta `.github/workflows/deploy.yml`: corre las pruebas, compila y publica en GitHub Pages. La primera vez, en el repositorio ve a **Settings → Pages → Source: GitHub Actions**.

## Cómo se calculan los números (sin indicadores ficticios)

- **Minutos:** se suman en intervalos de 10 s solo si la app está visible y hubo interacción en los últimos 2 minutos.
- **Racha:** días seguidos con 20+ minutos o una lección completada.
- **Gramática, escucha, lectura:** % de respuestas validadas automáticamente.
- **Vocabulario:** en tarjetas te autocalificas (estilo Anki); en mini-tests se valida automáticamente. Una palabra está **dominada** cuando su intervalo llega a 21 días.
- **Dictado:** % de palabras correctas en tus últimas 20 frases.
- **Speaking:** turnos practicados. Si el navegador transcribe tu voz, se muestra el % de palabras del modelo que reconoció. **No es una evaluación de pronunciación.**
- **Escritura:** aprueba si cumple longitud, elementos pedidos y no tiene ninguno de los errores frecuentes revisados.
- **Diagnóstico:** alcanzas un nivel si aciertas ≥ 60% de sus preguntas y alcanzaste los anteriores. **No equivale a una certificación oficial**; como referencia externa gratuita puedes usar EF SET.

## Audio

Se usan las capacidades gratuitas del navegador: Speech Synthesis (voz), Speech Recognition (transcripción, Chrome y Safari) y MediaRecorder (grabarte). Si alguna no está disponible, la app lo indica y ofrece alternativas (transcripción visible, comparar con el modelo).

## Arquitectura

- React + TypeScript + Vite, `vite-plugin-pwa` (service worker y manifest), IndexedDB con `idb`.
- `src/content/` — contenido en formato texto compacto (ver `src/lib/parse.ts`).
- `src/lib/` — validación de respuestas, SRS, plan, estadísticas, corrección de escritura, audio, base de datos.
- `src/views/` — pantallas; `src/components/` — ejercicios, repaso, escucha, speaking y escritura.
- `tests/` — pruebas de contenido (cantidades, formato, que cada texto modelo apruebe su corrección) y de lógica.
