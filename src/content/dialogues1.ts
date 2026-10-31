// Diálogos: "## id | título | título en español | nivel | daily/work", líneas "Nombre: texto", preguntas "? pregunta | *correcta ~ otra ~ otra"
export const dialogues1 = `
## d01 | Nice to meet you | Mucho gusto | A1 | work
Anna: Hi! I'm Anna. I'm the new project manager.
Ariel: Hi, Anna. I'm Ariel. Nice to meet you.
Anna: Nice to meet you too. Are you a developer?
Ariel: No, I'm not. I'm a data analyst.
Anna: Great! Where are you from?
Ariel: I'm from Peru. I'm in Lima.
Anna: Cool. I'm from Chicago.
Ariel: Welcome to the team, Anna.
? What is Ariel's job? | *Data analyst ~ Developer ~ Project manager
? Where is Anna from? | Lima ~ *Chicago ~ New York
? Is Ariel a developer? | Yes, he is. ~ *No, he isn't. ~ We don't know.

## d02 | How do you spell that? | ¿Cómo se deletrea? | A1 | work
Tom: Hello, this is Tom from HR. What's your full name?
Ariel: My name is Ariel Cáceres.
Tom: How do you spell your last name?
Ariel: C-A-C-E-R-E-S.
Tom: Thank you. And what's your email address?
Ariel: It's ariel dot caceres at gmail dot com.
Tom: Perfect. And your phone number?
Ariel: It's 51 987 654 321.
? Who is Tom? | A data analyst ~ *A person from HR ~ A client
? How do you say "@" in an email? | dot ~ *at ~ arroba
? What does Tom ask first? | *Ariel's full name ~ Ariel's phone number ~ Ariel's job

## d03 | My team | Mi equipo | A1 | work
Lisa: Who is that man?
Ariel: That's Mark. He's our manager.
Lisa: Is he from the US?
Ariel: Yes, he is. He's from Texas.
Lisa: And who are those women?
Ariel: They're Kim and Sara. They're analysts, like me.
Lisa: Are they nice?
Ariel: Yes, they are. Our team is great.
? Who is Mark? | An analyst ~ *The manager ~ A client
? Where is Mark from? | *Texas ~ Lima ~ Chicago
? What are Kim and Sara? | Managers ~ *Analysts ~ Developers

## d04 | Countries and jobs | Países y profesiones | A1 | daily
Maria: Where are you from, David?
David: I'm from Canada. And you?
Maria: I'm from Mexico. What do you do?
David: I'm an engineer. And you?
Maria: I'm a teacher. My husband is an accountant.
David: Is he from Mexico too?
Maria: No, he isn't. He's from Colombia.
David: That's interesting!
? What is David's job? | A teacher ~ *An engineer ~ An accountant
? Where is Maria's husband from? | Mexico ~ Canada ~ *Colombia
? What is Maria? | *A teacher ~ An engineer ~ An analyst

## d05 | Numbers in the report | Números en el reporte | A1 | work
Kim: How many rows are in the file?
Ariel: Five thousand three hundred.
Kim: Sorry, fifteen hundred?
Ariel: No, five thousand three hundred. 5,300.
Kim: And how many columns?
Ariel: Thirteen. One, three. Not thirty.
Kim: Okay, thirteen columns. Thanks!
Ariel: You're welcome.
? How many rows are in the file? | 1,500 ~ *5,300 ~ 530
? How many columns are there? | 30 ~ *13 ~ 3
? What does Ariel say to "Thanks"? | *You're welcome. ~ Thank you. ~ Okay.

## d06 | At the coffee machine | En la máquina de café | A1 | work
Sam: Good morning! Are you new here?
Ariel: Yes, I am. It's my first week.
Sam: Welcome! I'm Sam. I'm in the marketing team.
Ariel: Nice to meet you, Sam. I'm Ariel. I'm in the data team.
Sam: Oh, the data team is on the third floor, right?
Ariel: Yes, it is. Is marketing on the second floor?
Sam: Yes. Our office is next to the kitchen.
Ariel: Great. See you later!
? Is Ariel new? | *Yes, it's his first week. ~ No, he isn't. ~ We don't know.
? What team is Sam in? | Data ~ *Marketing ~ Sales
? Where is the data team? | *On the third floor ~ On the second floor ~ Next to the kitchen

## d07 | My email and my password | Mi correo y mi contraseña | A1 | work
IT: Hi, this is IT support. Is your computer ready?
Ariel: Yes, it is. But my password isn't correct.
IT: What's your username?
Ariel: It's A-C-A-C-E-R-E-S.
IT: Okay. Your new password is in your email.
Ariel: Sorry, my email isn't open. It's a new computer.
IT: No problem. I'll send it to your phone.
Ariel: Thank you very much.
? Who calls Ariel? | His manager ~ *IT support ~ A client
? What is the problem? | The computer is broken. ~ *The password isn't correct. ~ The phone isn't working.
? Where will IT send the password? | To his email ~ *To his phone ~ To his manager

## d08 | This is my desk | Este es mi escritorio | A1 | work
Kim: Is this your desk?
Ariel: Yes, it is. These are my monitors.
Kim: Nice! Is that your laptop?
Ariel: No, it isn't. That's the company laptop.
Kim: Those notebooks are cool. Are they new?
Ariel: Yes, they are. They're from Peru.
Kim: What's this? An Excel book?
Ariel: Yes, it's my SQL and Excel book.
? Is the laptop Ariel's? | Yes, it is. ~ *No, it's the company laptop. ~ We don't know.
? Where are the notebooks from? | *Peru ~ The US ~ The office
? What is the book about? | Python ~ *SQL and Excel ~ English

## d09 | A video call | Una videollamada | A1 | work
Mark: Hi, everyone. Can you hear me?
Kim: Yes, we can.
Mark: Is everyone here? Ariel?
Ariel: Yes, I'm here. Sorry, my camera isn't on.
Mark: No problem. Sara isn't here today. She's sick.
Kim: Oh, I'm sorry.
Mark: Okay, let's start. Ariel, are the files ready?
Ariel: Yes, they are. They're in the shared folder.
? Why isn't Sara in the call? | She's on vacation. ~ *She's sick. ~ She's late.
? Where are the files? | In Ariel's email ~ *In the shared folder ~ On Ariel's desk
? What is the problem with Ariel? | He can't hear. ~ *His camera isn't on. ~ He is late.

## d10 | First week review | Repaso: primera semana | A1 | work
Mark: How is your first week, Ariel?
Ariel: It's great, thanks. The team is very friendly.
Mark: Good. Are you okay with the tools?
Ariel: Yes, I am. Excel and SQL are easy for me. Power BI is new.
Mark: Kim is very good at Power BI. She's a great teacher.
Ariel: Perfect. I'm happy here.
Mark: Excellent. Your first report is due on Friday.
Ariel: No problem. It's on my list.
? Which tool is new for Ariel? | Excel ~ SQL ~ *Power BI
? Who is good at Power BI? | Mark ~ *Kim ~ Sara
? When is the first report due? | Monday ~ *Friday ~ Today

## d11 | My daily routine | Mi rutina diaria | A1 | daily
Laura: What time do you get up, Ariel?
Ariel: I get up at six. Then I study English for 45 minutes.
Laura: Wow! Every day?
Ariel: Yes, every day. Then I have breakfast and start work at eight.
Laura: Do you work from home?
Ariel: Yes, I do. I work from home on Mondays and Fridays.
Laura: And what do you do after work?
Ariel: I go to the gym and I cook dinner.
? What time does Ariel get up? | *At six ~ At eight ~ At seven
? When does he work from home? | Every day ~ *Mondays and Fridays ~ Tuesdays
? What does he do after work? | He studies English. ~ *He goes to the gym and cooks. ~ He watches TV.

## d12 | What do you do at work? | ¿Qué haces en el trabajo? | A1 | work
Ben: So, what do you do exactly?
Ariel: I'm a data analyst. I clean and analyze sales data.
Ben: What tools do you use?
Ariel: I use Excel, SQL and Power BI.
Ben: Do you work with the sales team?
Ariel: Yes, I do. They send me questions and I find answers in the data.
Ben: That sounds interesting.
Ariel: It is. I love it.
? What data does Ariel analyze? | Marketing data ~ *Sales data ~ Health data
? Who sends Ariel questions? | The IT team ~ *The sales team ~ His family
? Does Ariel like his job? | *Yes, he loves it. ~ No, he doesn't. ~ It's okay.

## d13 | Family | La familia | A1 | daily
Kim: Do you have brothers or sisters?
Ariel: Yes, I have one sister. She lives in Arequipa.
Kim: What does she do?
Ariel: She's a nurse. She works in a hospital.
Kim: Do your parents live in Lima?
Ariel: My mother lives in Lima. My father lives in Cusco.
Kim: Do you visit them?
Ariel: Yes, I visit my mother every Sunday.
? Where does Ariel's sister live? | Lima ~ *Arequipa ~ Cusco
? What is his sister's job? | Teacher ~ *Nurse ~ Doctor
? When does Ariel visit his mother? | Every Saturday ~ *Every Sunday ~ Every day

## d14 | What time is the meeting? | ¿A qué hora es la reunión? | A1 | work
Sara: What time is the team meeting?
Ariel: It's at ten o'clock.
Sara: Ten in New York or ten in Lima?
Ariel: Ten in New York. That's nine in Lima.
Sara: But in the US winter it's the same time, right?
Ariel: Yes. In the US winter, Lima and New York have the same time.
Sara: Okay. How long is the meeting?
Ariel: Thirty minutes.
? What time is the meeting in New York? | Nine ~ *Ten ~ Thirty
? How long is the meeting? | Thirteen minutes ~ *Thirty minutes ~ One hour
? When do Lima and New York have the same time? | In the US summer ~ *In the US winter ~ Never

## d15 | Do you like your job? | ¿Te gusta tu trabajo? | A1 | daily
Pedro: Do you like your job?
Ariel: Yes, I do. But I don't like long meetings.
Pedro: Me neither. Does your boss speak Spanish?
Ariel: No, he doesn't. We speak English at work.
Pedro: Is that difficult?
Ariel: Sometimes. I don't understand everything, but I ask questions.
Pedro: That's smart.
Ariel: Thanks. I study every day.
? What doesn't Ariel like? | His job ~ *Long meetings ~ English
? Does his boss speak Spanish? | Yes, he does. ~ *No, he doesn't. ~ A little.
? What does Ariel do when he doesn't understand? | He stops. ~ *He asks questions. ~ He speaks Spanish.

## d16 | How often? | ¿Con qué frecuencia? | A1 | work
Mark: How often do you update the dashboard?
Ariel: I usually update it every morning.
Mark: Do you check the data quality too?
Ariel: Yes, I always check it before I update.
Mark: Great. How often do you meet with the sales team?
Ariel: Once a week, on Thursdays.
Mark: Do they often ask for new reports?
Ariel: Sometimes. Maybe twice a month.
? How often does Ariel update the dashboard? | Once a week ~ *Every morning ~ Twice a month
? When does he meet the sales team? | *On Thursdays ~ On Mondays ~ Every day
? How often does the sales team ask for new reports? | Every day ~ Never ~ *About twice a month

## d17 | Weekends | Los fines de semana | A1 | daily
Sara: What do you usually do on weekends?
Ariel: On Saturdays I study English for one hour.
Sara: Only on Saturdays?
Ariel: No, on Sundays too. I take a test and practice conversation.
Sara: Do you ever rest?
Ariel: Of course! On Sunday afternoon I visit my mom and we have lunch.
Sara: That sounds nice. I never study on weekends.
Ariel: You should try it!
? How long does Ariel study on Saturdays? | 45 minutes ~ *One hour ~ Two hours
? What does Ariel do on Sundays? | Nothing ~ *A test and conversation practice ~ He works.
? Who does he visit on Sunday afternoon? | His sister ~ His boss ~ *His mom

## d18 | A new coworker | Un compañero nuevo | A1 | work
Kim: Do you know the new analyst?
Ariel: Yes, his name is Raj. He's from India.
Kim: What does he do?
Ariel: He works with Python and machine learning.
Kim: Does he speak Spanish?
Ariel: No, he doesn't, but he speaks English very well.
Kim: Where does he live?
Ariel: He lives in Toronto. He works remotely.
? Where is Raj from? | Toronto ~ *India ~ Peru
? What does Raj work with? | Excel ~ *Python and machine learning ~ Power BI
? Where does Raj live? | India ~ *Toronto ~ Lima

## d19 | Schedules | Horarios | A1 | work
Lisa: When does the office open?
Ariel: It opens at eight and closes at six.
Lisa: Do people work on Saturdays?
Ariel: No, they don't. The office is closed on weekends.
Lisa: What time do you have lunch?
Ariel: I usually have lunch at one.
Lisa: And when do you leave?
Ariel: I usually leave at five thirty.
? What time does the office close? | Five ~ *Six ~ Eight
? Is the office open on Saturdays? | Yes ~ *No ~ Only in the morning
? What time does Ariel usually leave? | *5:30 ~ 6:00 ~ 1:00

## d20 | Review: a typical day | Repaso: un día típico | A1 | work
Mark: Tell me about a typical day at work.
Ariel: I start at eight. First I check my emails.
Mark: And then?
Ariel: Then I check the data and update the dashboard.
Mark: Do you have many meetings?
Ariel: Not many. I have a standup every day at nine and a team meeting on Thursdays.
Mark: What do you do in the afternoon?
Ariel: I usually work on reports and answer questions from the sales team.
? What does Ariel do first? | He updates the dashboard. ~ *He checks his emails. ~ He has a meeting.
? When is the standup? | *Every day at nine ~ On Thursdays ~ In the afternoon
? What does he do in the afternoon? | He goes home. ~ *He works on reports. ~ He has lunch.
`
