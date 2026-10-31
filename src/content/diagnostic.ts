import type { Level } from '../types'

// Prueba diagnóstica: 60 preguntas (20 gramática, 15 vocabulario, 15 escucha, 10 lectura) + 5 tareas de habla sin puntaje.
// Línea: nivel | [audio o id de texto] | pregunta | *correcta ~ otra ~ otra
export const diagGrammar = `
A1 | | She ___ a data analyst. | *is ~ are ~ am
A1 | | ___ you from Peru? | *Are ~ Is ~ Do
A1 | | He ___ in a bank. | *works ~ work ~ working
A1 | | I ___ like coffee. | *don't ~ doesn't ~ not
A1 | | There ___ two files in the folder. | *are ~ is ~ has
A1 | | The meeting is ___ Monday. | *on ~ in ~ at
A2 | | Yesterday I ___ to the office. | *went ~ go ~ goed
A2 | | ___ you send the email? | *Did ~ Do ~ Were
A2 | | This report is ___ than the last one. | *better ~ more good ~ best
A2 | | I'm going ___ the results tomorrow. | *to present ~ present ~ presenting
A2 | | You ___ check the data first. | *should ~ should to ~ shoulds
A2 | | I was working when the server ___. | *crashed ~ crashes ~ was crash
B1 | | I ___ here since 2022. | *have worked ~ work ~ worked
B1 | | If I ___ more time, I would learn Python. | *had ~ have ~ will have
B1 | | The data ___ collected every week. | *is ~ are being ~ has
B1 | | She said that she ___ tired. | *was ~ is being ~ were
B1 | | I'm used to ___ with large datasets. | *working ~ work ~ worked
B2 | | Had we known about the bug, we ___ the release. | *would have delayed ~ would delay ~ had delayed
B2 | | The results, ___ were surprising, were shared with the board. | *which ~ that ~ what
B2 | | By next year, she ___ here for a decade. | *will have worked ~ will work ~ has worked
`
export const diagVocab = `
A1 | | "Desk" means… | *escritorio ~ escuela ~ disco
A1 | | The opposite of "cheap" is… | *expensive ~ easy ~ small
A1 | | "Tuesday" in Spanish is… | *martes ~ jueves ~ miércoles
A1 | | I ___ breakfast at 7 a.m. | *have ~ make ~ do
A2 | | "Deadline" means… | *fecha límite ~ línea muerta ~ horario
A2 | | Sales ___ by 10% last month. (subieron) | *increased ~ decreased ~ remained
A2 | | Can you ___ me the file? | *send ~ say ~ tell
A2 | | "Feedback" means… | *comentarios, retroalimentación ~ comida ~ reunión
B1 | | We need to ___ the meeting to next week. | *postpone ~ prevent ~ promote
B1 | | A "stakeholder" is… | *a person interested in the project ~ a type of chart ~ a database
B1 | | "Accurate" means… | *exacto ~ acumulado ~ actual
B1 | | The project was a big ___. It finished early and under budget. | *success ~ successful ~ succeed
B2 | | The findings were ___, so we ran the test again. | *inconclusive ~ inconsiderate ~ incomparable
B2 | | We need to ___ the risks before we launch. | *mitigate ~ migrate ~ mediate
B2 | | Revenue ___ steadily throughout the year. | *climbed ~ climbing ~ climb
`
export const diagListening = `
A1 | Hi, my name is Laura. I'm from Canada. I'm a teacher. | Where is Laura from? | *Canada ~ Colombia ~ California
A1 | The meeting is at ten thirty in room B. | What time is the meeting? | *10:30 ~ 10:13 ~ 2:30
A1 | I have two brothers and one sister. | How many sisters does the speaker have? | *One ~ Two ~ Three
A1 | Please open the file and check the numbers. | What should you do? | *Open the file and check the numbers ~ Send the file ~ Close the file
A2 | Yesterday I worked from home because my son was sick. | Why did the speaker work from home? | *The son was sick. ~ The office was closed. ~ The speaker was sick.
A2 | Sales went up in March, but they dropped in April. | What happened in April? | *Sales dropped. ~ Sales went up. ~ Nothing changed.
A2 | I'm going to send you the report tomorrow morning, before nine. | When will the speaker send the report? | *Tomorrow before nine ~ Today at nine ~ Tomorrow afternoon
A2 | Could you call me back? I'm in a meeting until three. | When is the speaker free? | *After three ~ Before three ~ Now
B1 | We've been working on this dashboard for two months, and the client still wants changes. | How long have they worked on the dashboard? | *Two months ~ Two weeks ~ Two years
B1 | If the data arrives on time, we'll present the results on Thursday instead of Friday. | When will they present if the data arrives on time? | *Thursday ~ Friday ~ We don't know
B1 | The survey was answered by twelve hundred customers, which is about a quarter of the total. | How many customers answered? | *1,200 ~ 12,000 ~ 120
B1 | I'd rather not use pie charts here, because there are too many categories. | Why doesn't the speaker want a pie chart? | *Too many categories ~ No data ~ The client hates them
B2 | Although churn decreased slightly, it's still well above our target, so let's not celebrate just yet. | What does the speaker think? | *The result is still not good enough. ~ The target was reached. ~ Churn increased.
B2 | Had we validated the source earlier, we wouldn't have had to redo the whole analysis. | What happened? | *They redid the analysis because the source wasn't validated early. ~ They validated the source early. ~ They didn't do the analysis.
B2 | The figures are broadly in line with last quarter, with the exception of the West region, which underperformed. | Which region did worse? | *West ~ East ~ None
`
export const diagReadingTexts: Record<string, { level: Level; text: string }> = {
  t1: { level: 'A1', text: 'Hi, I\'m Tom. I am 30 years old and I live in Chicago. I work in an office. I start work at 9 a.m. and finish at 5 p.m. On weekends I play soccer with my friends.' },
  t2: { level: 'A2', text: 'Last month our team started a new project. We collected data from 3,000 customers. The analysis took two weeks. We found that most customers buy on weekends, so we are going to send emails on Friday afternoons.' },
  t3: { level: 'B1', text: 'Remote work has changed how data teams communicate. Since meetings are fewer, written updates have become essential. Analysts who can explain their findings clearly in writing are often the ones who get promoted, even if their technical skills are similar to their colleagues\'.' },
  t4: { level: 'B2', text: 'While dashboards are often seen as the end product of analytics, they are, in fact, only as valuable as the decisions they inform. A beautifully designed report that nobody consults is arguably worse than none at all, since it consumes resources while creating an illusion of insight.' },
}
export const diagReading = `
A1 | t1 | Where does Tom live? | *Chicago ~ Canada ~ The text doesn't say.
A1 | t1 | What time does Tom finish work? | *5 p.m. ~ 9 a.m. ~ 9 p.m.
A1 | t1 | What does Tom do on weekends? | *Plays soccer ~ Works ~ Studies
A2 | t2 | How many customers gave data? | *3,000 ~ 300 ~ 30,000
A2 | t2 | When do most customers buy? | *On weekends ~ On Fridays ~ In the morning
A2 | t2 | What is the team going to do? | *Send emails on Friday afternoons ~ Collect more data ~ Stop the project
B1 | t3 | According to the text, what has become essential? | *Written updates ~ More meetings ~ Technical skills
B1 | t3 | Who often gets promoted? | *Analysts who write clearly about their findings ~ Analysts with the best technical skills ~ Analysts who attend more meetings
B2 | t4 | What is the author's main point? | *Dashboards are valuable only if they inform decisions. ~ Dashboards should be more beautiful. ~ Analytics teams need more resources.
B2 | t4 | Why could an unused report be "worse than none at all"? | *It uses resources and creates a false sense of insight. ~ It contains errors. ~ It is too expensive to design.
`
export const diagSpeaking = [
  { prompt: 'Introduce yourself: your name, where you are from and your job.', es: 'Preséntate: nombre, de dónde eres y tu trabajo.' },
  { prompt: 'Describe your typical workday.', es: 'Describe un día típico de trabajo.' },
  { prompt: 'What did you do last weekend?', es: '¿Qué hiciste el fin de semana pasado?' },
  { prompt: 'What are your plans for next year?', es: '¿Cuáles son tus planes para el próximo año?' },
  { prompt: 'Why do you want to work for a US company?', es: '¿Por qué quieres trabajar para una empresa de EE.UU.?' },
]
