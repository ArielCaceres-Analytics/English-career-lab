// Role-plays: "@ contexto", "> lo que dice la otra persona", "= respuesta modelo"
export const speakingSrc = `
## s01 | Introduce yourself | Preséntate | A1
@ Es tu primer día. Una compañera se presenta y te hace preguntas.
> Hi! I'm Anna. What's your name?
= Hi, Anna. I'm Ariel. Nice to meet you.
> Nice to meet you too. Where are you from?
= I'm from Lima, Peru.
> What do you do?
= I'm a data analyst. I work with Excel and SQL.

## s02 | Spell your name and email | Deletrea tu nombre y correo | A1
@ Recursos Humanos necesita tus datos por teléfono.
> What's your full name?
= My name is Ariel Cáceres.
> How do you spell your last name?
= C-A-C-E-R-E-S.
> What's your email address?
= It's ariel dot caceres at gmail dot com.
> And your phone number?
= It's 51 987 654 321.

## s03 | Talk about your team | Habla de tu equipo | A1
@ Un nuevo compañero pregunta por el equipo.
> Who is your manager?
= My manager is Mark. He's from Texas.
> How many people are on your team?
= There are six people on my team.
> Are they nice?
= Yes, they are. They're very friendly.

## s04 | Your daily routine | Tu rutina diaria | A1
@ En una conversación casual te preguntan por tu día.
> What time do you get up?
= I get up at six o'clock.
> What do you do in the morning?
= I study English, then I have breakfast and start work at eight.
> What do you do after work?
= I usually go to the gym and cook dinner.

## s05 | What do you do at work? | ¿Qué haces en el trabajo? | A1
@ Alguien de otra área quiere entender tu trabajo.
> So, what do you do exactly?
= I'm a data analyst. I clean and analyze sales data.
> What tools do you use?
= I use Excel, SQL and Power BI.
> Who do you work with?
= I work with the sales team. They send me questions and I find answers in the data.

## s06 | Asking for help | Pedir ayuda | A1
@ Tienes un problema con un archivo y le pides ayuda a un compañero.
> Hi, what's up?
= Hi, Ben. Can you help me with something?
> Sure. What's the problem?
= I can't open this file. It says "access denied".
> Did you ask IT?
= Not yet. Could you send me their email, please?

## s07 | I don't understand | No entiendo | A1
@ Tu jefe habla muy rápido en una llamada. Pide que repita y que hable más despacio.
> We need the KPI breakdown by region before the QBR, okay?
= Sorry, could you repeat that, please?
> We need the KPI breakdown by region before the QBR.
= Could you speak more slowly, please? What does "QBR" mean?
> Sorry! QBR means "quarterly business review". It's next Friday.
= Okay, thank you. I'll prepare the breakdown by region before Friday.

## s08 | Where is it? | ¿Dónde está? | A1
@ Una compañera nueva te pregunta por la oficina y los archivos.
> Is there a printer on this floor?
= No, there isn't. It's on the eleventh floor.
> Where is the sales report?
= It's in the shared folder, in "Sales 2026".
> Is there a meeting today?
= Yes, there is. It's at three, in room B.

## s09 | Ordering food | Pedir comida | A1
@ Estás en un restaurante en Estados Unidos.
> Hi, are you ready to order?
= Yes, can I have the chicken salad, please?
> Sure. Anything to drink?
= Some water, please.
> Anything else?
= No, thank you. Can I have the bill, please?

## s10 | What are you working on? | ¿En qué estás trabajando? | A1
@ Tu jefe pasa por tu escritorio (o te escribe por chat).
> Hi, are you busy?
= A little. I'm working on the monthly sales report.
> What are you doing right now?
= I'm cleaning the data. Then I'm going to make the charts.
> When will it be ready?
= It will be ready tomorrow morning.

## s11 | Your skills | Tus habilidades | A1
@ Una reclutadora pregunta qué sabes hacer.
> What can you do with Excel?
= I can make pivot tables, use VLOOKUP and create charts.
> Can you write SQL?
= Yes, I can. I can write joins and group by queries.
> Can you code in Python?
= Not yet, but I'm learning. I can read basic code.

## s12 | Free time and weather | Tiempo libre y clima | A1
@ Conversación casual antes de una reunión.
> How's the weather in Lima?
= It's cloudy and a little cold. It's winter here.
> What do you do in your free time?
= I like playing soccer and watching movies.
> Any plans for the weekend?
= I'm going to visit my family on Sunday.

## s13 | Your last weekend | Tu fin de semana pasado | A2
@ Es lunes y un compañero pregunta por tu fin de semana.
> How was your weekend?
= It was great, thanks. I visited my mom on Sunday.
> Did you do anything else?
= Yes, I studied English on Saturday and watched a movie.
> What movie did you watch?
= I watched an action movie. It was very good.

## s14 | Yesterday at work | Ayer en el trabajo | A2
@ Tu jefe pregunta qué hiciste ayer.
> What did you do yesterday?
= I cleaned the survey data and checked the totals.
> Were there any problems?
= Yes, there were some duplicates. I removed them.
> Did you send the file?
= Yes, I sent it to the team in the afternoon.

## s15 | Your last job | Tu último trabajo | A2
@ Entrevista: cuéntale a la reclutadora sobre tu experiencia.
> Tell me about your last job.
= I worked at a retail company for two years.
> What did you do there?
= I analyzed sales data and created weekly reports in Excel.
> What was your biggest achievement?
= I automated a report. It saved five hours every week.

## s16 | Daily standup | Standup diario | A2
@ Es tu turno en el standup: ayer, hoy y bloqueos.
> Ariel, your update?
= Yesterday I finished the data cleaning for the survey.
> And today?
= Today I'm going to build the charts for the report.
> Any blockers?
= Yes, I'm blocked by access to the finance database.

## s17 | Accept or decline an invitation | Aceptar o rechazar una invitación | A2
@ Te invitan a una reunión y luego a un evento social.
> Would you like to join the client meeting on Thursday?
= Sure, I'd like that. What time is it?
> It's at eleven. Should I send you the invitation?
= Yes, please. Should I prepare anything?
> Would you like to come to dinner with the team on Friday?
= I'd love to, but I can't. Maybe next time. Thanks for the invitation.

## s18 | Reschedule a call | Reprogramar una llamada | A2
@ Un cliente no puede asistir. Propón otra hora.
> Sorry, I can't make our call today.
= No problem. Would you like to reschedule?
> Yes. Are you free tomorrow?
= I'm free tomorrow from nine to eleven.
> Does ten work for you?
= Yes, ten works for me. I'll send a new invitation.

## s19 | Give advice | Dar consejos | A2
@ Un compañero tiene problemas con un dashboard lento.
> The dashboard is very slow. What should I do?
= I think you should reduce the number of visuals.
> Anything else?
= You could also keep only the last two years of data.
> Should I tell the client?
= Yes, you should ask the client first.

## s20 | First day at a new job | Primer día en un nuevo trabajo | A2
@ Simulación del mes 3: tu primer día en una empresa de EE.UU.
> Welcome to the team! How are you feeling?
= I'm a little nervous, but I'm excited.
> Tell us a little about yourself.
= I'm Ariel, from Lima, Peru. I'm a data analyst with experience in SQL, Excel and Power BI.
> What did you do in your last job?
= I analyzed sales data and built weekly dashboards for the sales and finance teams.
> What are you going to focus on this week?
= This week I'm going to learn your data model and meet the team.
`
// Preguntas de entrevista: pregunta | español | modelo A2 | modelo B1 | consejo
export const interviewSrc = `
Tell me about yourself. | Háblame de ti. | I'm Ariel. I'm a data analyst from Peru. I work with Excel, SQL and Power BI. I like finding answers in data. | I'm a data analyst based in Lima, Peru, with experience in SQL, Excel and Power BI. In my current role, I analyze sales data and build dashboards that help managers make decisions. I'm now looking for a remote position with a US company. | Estructura: presente (quién eres) → pasado (experiencia) → futuro (qué buscas). 60–90 segundos.
Why do you want to work here? | ¿Por qué quieres trabajar aquí? | I like your company. You use data to make decisions. I want to learn and grow with your team. | I like that your company makes data-driven decisions, and your products help many customers. I think my experience with sales dashboards can help your team, and I'd like to grow in an international environment. | Menciona algo concreto de la empresa.
What are your strengths? | ¿Cuáles son tus fortalezas? | I'm detail-oriented. I always check the data. I also learn new tools fast. | My main strength is attention to detail. I always validate the numbers before I share a report. I also learn quickly: for example, I learned Power BI in two months. | Da un ejemplo real.
What is your greatest weakness? | ¿Cuál es tu mayor debilidad? | My English is not perfect, but I study every day. I'm improving fast. | Sometimes I spend too much time on details. Now I set time limits for each task, and I ask my manager about priorities. | Elige una debilidad real que estés mejorando.
Why are you looking for a new job? | ¿Por qué buscas un nuevo trabajo? | I want to grow. I want to work with international teams. | I'm looking for new challenges. I'd like to work with an international team and work on bigger datasets. | Nunca hables mal de tu empresa actual.
What tools do you use? | ¿Qué herramientas usas? | I use Excel, SQL and Power BI every day. I'm learning Python. | I use SQL every day to extract and transform data, Excel for quick analysis and pivot tables, and Power BI for dashboards. I'm also learning Python for automation. | Ordena de la que más usas a la que menos.
Tell me about a project you're proud of. | Cuéntame de un proyecto del que estés orgulloso. | I made a sales dashboard. My team uses it every day. It saves time. | I built a sales dashboard in Power BI for my company. Before, managers waited for a weekly Excel report. Now they see the data every morning, and the team saves about five hours a week. | Usa números concretos.
How do you explain data to non-technical people? | ¿Cómo explicas datos a personas no técnicas? | I use simple words and simple charts. I start with the main idea. | I start with the main insight, not the method. I use simple charts and avoid technical words. Then I check if they have questions. | Habla de tu audiencia.
Tell me about a time you made a mistake. | Cuéntame de una vez que cometiste un error. | I sent a report with a wrong filter. I fixed it and said sorry. Now I use a checklist. | Once I sent a report with the wrong date filter. The director noticed it. I fixed the report the same day, apologized, and created a checklist that I now use before every report. | Método STAR: situación, tarea, acción, resultado.
How do you handle tight deadlines? | ¿Cómo manejas plazos ajustados? | I make a list. I start with the important tasks. I tell my manager if I need help. | I prioritize the tasks with the biggest impact, I communicate early if there is a risk, and I focus on delivering a correct first version. | Menciona comunicación temprana.
How do you check the quality of your data? | ¿Cómo verificas la calidad de tus datos? | I look for missing values and duplicates. I compare the totals. | I check for missing values, duplicates and outliers, and I compare totals with another source, like the finance system. | Menciona pasos concretos.
What is the difference between a WHERE and a HAVING clause? | ¿Cuál es la diferencia entre WHERE y HAVING? | WHERE filters rows. HAVING filters groups after GROUP BY. | WHERE filters rows before the aggregation, and HAVING filters the groups after GROUP BY. For example, HAVING SUM(sales) > 1000. | Pregunta técnica común.
What is a JOIN? | ¿Qué es un JOIN? | A JOIN connects two tables with a common column. | A JOIN combines rows from two tables using a key. An INNER JOIN keeps only the matches, and a LEFT JOIN keeps all rows from the left table. | Da un ejemplo.
How would you describe this chart? | ¿Cómo describirías este gráfico? | Sales went up from January to March. Then they went down in April. | Sales increased steadily from January to March and peaked in March. In April they dropped by about 10%, and they recovered in May. | Usa: increase, peak, drop, recover.
Do you have experience working remotely? | ¿Tienes experiencia trabajando remoto? | Yes. I work from home two days a week. I use Teams and Zoom. | Yes. I currently work from home part of the week. I communicate with my team on Teams, and I always share updates so everyone knows my progress. | Destaca comunicación.
What time zone are you in? | ¿En qué zona horaria estás? | I'm in Lima, Peru. It's the same time as New York in winter. | I'm in Lima, Peru, which is UTC-5. It's the same as Eastern Time in winter and one hour behind in summer, so I can work US business hours easily. | Es una ventaja: dilo con seguridad.
Where do you see yourself in five years? | ¿Dónde te ves en cinco años? | I want to be a senior data analyst. I want to lead projects. | In five years, I'd like to be a senior analyst, leading projects and helping new analysts grow. | Muestra ambición realista.
What are your salary expectations? | ¿Cuáles son tus expectativas salariales? | I'm looking for a salary between 2,500 and 3,000 dollars a month. | Based on my research and experience, I'm looking for a range between 2,500 and 3,200 dollars per month, but I'm open to discussing the full package. | Da un rango investigado.
When can you start? | ¿Cuándo puedes empezar? | I can start in two weeks. | I can start two weeks after receiving an offer, since I need to give notice to my current employer. | Sé claro.
Do you have any questions for us? | ¿Tienes alguna pregunta para nosotros? | Yes. What does a typical day look like in this role? | Yes. What does success look like in the first three months? And what tools does the team use most? | Siempre prepara 2 preguntas.
`
