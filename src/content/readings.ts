// Lecturas graduadas (sábados): "## id | título | título es | nivel", párrafos, preguntas "? …"
export const readingsSrc = `
## r01 | Meet Ariel | Conoce a Ariel | A1
My name is Ariel. I am from Lima, Peru. I am a data analyst. I work with Excel, SQL and Power BI. I am 29 years old.
I am not married. I have one sister. Her name is Lucía. She is a nurse in Arequipa. My mother is a teacher and my father is an engineer.
My goal is to work for a company in the United States. My English is basic now, but I study every day. My favorite part of my job is finding answers in the data.
? Where is Ariel from? | *Lima, Peru ~ Arequipa ~ The United States
? What is Lucía's job? | Teacher ~ *Nurse ~ Engineer
? Is Ariel married? | Yes ~ *No ~ The text doesn't say.
? What is Ariel's goal? | To be a teacher ~ *To work for a US company ~ To live in Arequipa
? What is his favorite part of the job? | Meetings ~ *Finding answers in the data ~ Excel

## r02 | A job post | Una oferta de empleo | A1
Junior Data Analyst – Remote – BrightMart (USA)
We are a retail company in Texas. We are looking for a junior data analyst. The job is 100% remote.
Requirements: You are good with Excel and SQL. Power BI or Tableau is a plus. Your English is good for meetings and emails.
Hours: Monday to Friday, 9 a.m. to 5 p.m. Central Time.
Salary: $2,500 – $3,200 per month for international contractors.
? Where is the company? | *Texas ~ Lima ~ New York
? Is the job in an office? | Yes ~ *No, it's 100% remote. ~ Only on Mondays.
? Which tool is "a plus" (not required)? | Excel ~ SQL ~ *Power BI or Tableau
? What days is the job? | Every day ~ *Monday to Friday ~ Weekends
? What is the minimum monthly salary? | *$2,500 ~ $3,200 ~ $9,000

## r03 | My daily routine | Mi rutina diaria | A1
I get up at 6 a.m. every day. First, I drink a cup of coffee. Then I study English for 45 minutes. I use an app, and I always practice speaking.
I start work at 8 a.m. I check my emails and I update the sales dashboard. At 9 a.m. I have a short meeting with my team. We call it a "standup".
I have lunch at 1 p.m. In the afternoon, I usually write SQL queries and make reports. I finish work at 5:30 p.m. Then I go to the gym. I go to bed at 10:30 p.m.
? What does Ariel do first in the morning? | Studies English ~ *Drinks coffee ~ Checks emails
? How long does he study English? | 30 minutes ~ *45 minutes ~ One hour
? What is a "standup"? | A lunch ~ *A short team meeting ~ An English class
? What does he usually do in the afternoon? | Goes to the gym ~ *Writes SQL queries and makes reports ~ Studies
? What time does he go to bed? | 9:30 ~ *10:30 ~ 11:30

## r04 | An email from the manager | Un correo del gerente | A1
Subject: Welcome to the team!
Hi Ariel,
Welcome to DataCorp! Your first day is Monday, March 3rd. Our team meeting is at 10 a.m. New York time. Your laptop is ready. IT will send you your password by email on Friday.
In your first week, you are going to learn about our data and our tools. Priya is your mentor. She is a senior analyst. Please ask her any questions.
See you on Monday!
Mark
? When is Ariel's first day? | Friday ~ *Monday, March 3rd ~ March 10th
? What time is the team meeting in New York? | 9 a.m. ~ *10 a.m. ~ 3 p.m.
? How will Ariel get his password? | By phone ~ *By email ~ From Priya
? Who is Priya? | The manager ~ *A senior analyst and his mentor ~ IT support
? What will Ariel do in his first week? | Present results ~ *Learn about the data and tools ~ Travel to New York

## r05 | The office | La oficina | A1
Our office is in a tall building in downtown Miami. We are on the 12th floor. There are 40 people in the office.
There is a big kitchen with a coffee machine. There are three meeting rooms. The biggest room is called "Ocean". It has a big screen for video calls.
The data team sits next to the windows. There are six analysts on the team. There isn't a printer on our floor; it is on the 11th floor. On Fridays, there is free pizza for everyone!
? Where is the office? | New York ~ *Miami ~ Lima
? How many meeting rooms are there? | Two ~ *Three ~ Six
? What is special about "Ocean"? | It has a printer. ~ *It has a big screen for video calls. ~ It's the kitchen.
? Where is the printer? | On the 12th floor ~ *On the 11th floor ~ In the kitchen
? What happens on Fridays? | A meeting ~ *Free pizza ~ No work

## r06 | Spreadsheet basics | Lo básico de una hoja de cálculo | A1
A spreadsheet has rows and columns. Rows go from left to right. Columns go from top to bottom. A cell is one box, for example, cell B2.
In a sales file, each row is usually one sale. The columns are the details: the date, the product, the price and the customer.
Before you analyze the data, you should check it. Are there empty cells? Are there duplicate rows? Is the date in the correct format? Clean data gives good results.
? What is a cell? | A row ~ *One box ~ A file
? In a sales file, what is each row usually? | *One sale ~ One product ~ One customer
? Which direction do columns go? | Left to right ~ *Top to bottom ~ Both
? What should you do before analysis? | Make charts ~ *Check the data ~ Send the file
? According to the text, what gives good results? | Big files ~ *Clean data ~ Many columns

## r07 | Shopping in Lima | De compras en Lima | A1
On Saturdays I go to the market near my house. The market opens at 7 a.m. It is big and there are many stalls. I buy fruit, vegetables, chicken and bread.
Fruit in Peru is cheap and delicious. My favorite fruits are mangoes and lúcuma. A kilo of mangoes costs about 5 soles.
I don't buy meat every week. I usually buy fish on Fridays because it is fresh. After the market, I have breakfast at a small café. I always order a coffee and a sandwich.
? When does Ariel go to the market? | On Fridays ~ *On Saturdays ~ Every day
? What time does the market open? | *7 a.m. ~ 8 a.m. ~ 6 a.m.
? How much is a kilo of mangoes? | 15 soles ~ *About 5 soles ~ 50 soles
? When does he usually buy fish? | Saturdays ~ *Fridays ~ Never
? What does he order at the café? | Tea and cake ~ *A coffee and a sandwich ~ Juice

## r08 | What is a KPI? | ¿Qué es un KPI? | A1
KPI means "key performance indicator". It is a number that shows if a company is reaching a goal. For example, a store has a goal: sell $100,000 this month. The KPI is "monthly sales".
Companies have many numbers, but only some are KPIs. A good KPI is simple, clear and connected to a goal.
Common KPIs are revenue, number of new customers, and customer satisfaction. Data analysts build dashboards to show KPIs. Managers look at them every week to make decisions.
? What does KPI mean? | Key price index ~ *Key performance indicator ~ Key product information
? What does a KPI show? | The price of a product ~ *If a company is reaching a goal ~ The number of employees
? What is a good KPI? | Long and complex ~ *Simple, clear and connected to a goal ~ Secret
? Which is a common KPI? | The office color ~ *Revenue ~ The manager's name
? Who looks at KPI dashboards every week? | Customers ~ *Managers ~ Only analysts

## r09 | My week | Mi semana | A1
I am very busy this week. On Monday I have a meeting with the sales team. On Tuesday and Wednesday I am working on a new dashboard. On Thursday I am presenting the results to my manager.
I am a little nervous about the presentation, but I am practicing every night. My friend Kim is helping me with my English. She is from Boston.
This week I am not going to the gym. I don't have time! But on Saturday I am going to rest and watch a movie.
? What is Ariel doing on Tuesday and Wednesday? | A presentation ~ *Working on a new dashboard ~ Resting
? When is the presentation? | Monday ~ *Thursday ~ Saturday
? Who is helping him with English? | His manager ~ *Kim ~ His sister
? Is he going to the gym this week? | Yes ~ *No ~ Only on Monday
? What is he going to do on Saturday? | Work ~ *Rest and watch a movie ~ Go to the gym

## r10 | Remote work across time zones | Trabajo remoto y zonas horarias | A1
Many companies in the US hire analysts in Latin America. One reason is the time zone. Lima has the same time as New York in winter and is one hour behind in summer.
California is different. It is two or three hours behind Lima. When it is 9 a.m. in Los Angeles, it is 11 a.m. or 12 p.m. in Lima.
Remote workers need to be careful with meeting times. A good idea is to write the time zone in every invitation, for example "10 a.m. ET" (Eastern Time).
? Why do US companies like analysts in Latin America? | Low prices only ~ *Similar time zones ~ They speak Spanish.
? In winter, what time is it in Lima when it's 10 a.m. in New York? | 9 a.m. ~ *10 a.m. ~ 11 a.m.
? Is California ahead of or behind Lima? | Ahead ~ *Behind ~ The same
? What does "ET" mean? | English Time ~ *Eastern Time ~ Exact Time
? What is a good idea for invitations? | Send them late ~ *Write the time zone ~ Use Spanish

## r11 | A day in the life of an analyst | Un día en la vida de un analista | A1
Priya is a senior data analyst in Chicago. She starts work at 8:30. First, she reads messages from her team. Then she checks the data pipeline. If there is an error, she fixes it.
At 10 a.m. she meets with stakeholders. They ask questions like "Why are sales down?" or "Which product is the most popular?". Priya listens carefully and writes notes.
In the afternoon, she writes SQL queries and builds charts. She doesn't like long meetings. She likes solving problems with data.
? Where does Priya work? | New York ~ *Chicago ~ Lima
? What does she do first? | Checks the pipeline ~ *Reads messages from her team ~ Writes SQL
? What does she do when there is an error? | She calls IT. ~ *She fixes it. ~ She ignores it.
? What do stakeholders ask? | Questions about her family ~ *Questions about the business ~ Nothing
? What doesn't she like? | Data ~ *Long meetings ~ Charts

## r12 | Healthy habits | Hábitos saludables | A1
Working with computers all day is not always healthy. Here are some simple tips. Take a short break every hour. Stand up, walk and drink some water.
Look away from the screen every 20 minutes. Look at something far away for 20 seconds. This is good for your eyes.
Sleep seven or eight hours every night. Don't eat lunch at your desk. Go outside if you can. Your body and your brain need it!
? How often should you take a short break? | Every 20 minutes ~ *Every hour ~ Every day
? What should you do every 20 minutes? | Drink coffee ~ *Look away from the screen ~ Sleep
? How many hours should you sleep? | Five or six ~ *Seven or eight ~ Ten
? Where shouldn't you eat lunch? | Outside ~ *At your desk ~ In the kitchen
? Who is this text for? | Doctors ~ *People who work with computers ~ Children

## r13 | Month one: my progress | Mes uno: mi progreso | A1
I started this English course one month ago. At the beginning, I couldn't understand fast speakers. Now I can understand slow conversations about work.
I study every day. I learned about 350 new words. My favorite exercise is dictation, because I can hear my mistakes.
My problem is speaking. I am shy. But I practice with the shadowing exercise every day, and I record myself. Next month I want to speak for five minutes without stopping.
? When did Ariel start the course? | One week ago ~ *One month ago ~ One year ago
? How many new words did he learn? | 35 ~ *About 350 ~ 3,500
? What is his favorite exercise? | Grammar ~ *Dictation ~ Reading
? What is his problem? | Reading ~ *Speaking ~ Writing
? What is his goal for next month? | Learn 1,000 words ~ *Speak for five minutes without stopping ~ Get a job

## r14 | A message to a coworker | Un mensaje a un compañero | A1
Hi Ben,
Can you help me with something? I am working on the customer report, but there is a problem. There are some duplicate rows in the customer table. I can see 150 duplicates.
Can you check the database? Maybe the problem is in the pipeline. I need the report for tomorrow at 10 a.m.
Thank you!
Ariel
? Why is Ariel writing? | To say thanks ~ *To ask for help ~ To invite Ben
? What is the problem? | Missing values ~ *Duplicate rows ~ A slow computer
? How many duplicates are there? | 15 ~ *150 ~ 1,500
? Where can the problem be? | In Excel ~ *In the pipeline ~ In the email
? When does Ariel need the report? | Today ~ *Tomorrow at 10 a.m. ~ Next week

## r15 | Our customers | Nuestros clientes | A1
We have 12,000 customers. Most of them live in big cities. About 60% are women and 40% are men. The average age is 34.
Our most popular product is a sports shoe. Customers buy it online more than in stores. Young customers, from 18 to 25, almost always buy online.
There are some problems. Many customers buy only once. We want them to come back. That is why we are analyzing our customer data this month.
? How many customers are there? | 1,200 ~ *12,000 ~ 120,000
? What percentage are women? | 40% ~ *60% ~ 34%
? What is the most popular product? | A shirt ~ *A sports shoe ~ A bag
? How do young customers usually buy? | In stores ~ *Online ~ By phone
? What is the main problem? | Prices are high. ~ *Many customers buy only once. ~ The website is slow.

## r16 | Weather and sales | El clima y las ventas | A1
Does the weather change what people buy? Yes, it does! An ice cream company in Florida looked at its data. When the temperature is over 30 degrees, sales are 40% higher.
Rain is different. When it rains, people don't go to the stores, but online orders go up.
Now the company uses weather forecasts to plan. If tomorrow is hot, they send more ice cream to the stores. This is a good example of data helping a business.
? Where is the company? | California ~ *Florida ~ Peru
? What happens when it's over 30 degrees? | Sales are lower. ~ *Sales are 40% higher. ~ Nothing
? What happens when it rains? | Stores are full. ~ *Online orders go up. ~ They close.
? What does the company use to plan? | Social media ~ *Weather forecasts ~ Customer calls
? What is this text an example of? | Bad weather ~ *Data helping a business ~ A new product

## r17 | Last year | El año pasado | A2
Last year was very important for me. In January, I started a course in SQL. In April, I finished it and I got a certificate. In June, I changed jobs. I moved to a bigger company and I became a data analyst.
The first months were difficult. I didn't know the business, and there were many new tools. But my coworkers helped me a lot.
In December, my manager gave me good feedback. She said my reports were clear and accurate. I was very happy. This year, my goal is English.
? When did Ariel start the SQL course? | April ~ *January ~ June
? What happened in June? | He got a certificate. ~ *He changed jobs. ~ He started English.
? Why were the first months difficult? | He was sick. ~ *He didn't know the business and the tools. ~ His boss was angry.
? What did his manager say? | His reports were late. ~ *His reports were clear and accurate. ~ He needs more SQL.
? What is his goal this year? | SQL ~ *English ~ A new job

## r18 | A story about a mistake | Una historia sobre un error | A2
Two years ago, I made a big mistake at work. I sent a report to the director, but the numbers were wrong. I used the wrong date filter, so the report showed only half of the month.
The director noticed the problem in a meeting. I felt terrible. After the meeting, I fixed the report and sent it again. I also apologized.
I learned an important lesson: always check your filters and compare totals with another source. Now I have a checklist, and I use it before I send any report.
? What was the mistake? | He sent the report late. ~ *The numbers were wrong. ~ He forgot the meeting.
? Why were the numbers wrong? | Missing data ~ *The wrong date filter ~ A broken computer
? Who noticed the problem? | Ariel ~ *The director ~ A client
? What did Ariel do after the meeting? | He quit. ~ *He fixed the report and apologized. ~ Nothing
? What does he use now? | A new tool ~ *A checklist ~ A different computer

## r19 | How I learned Power BI | Cómo aprendí Power BI | A2
I didn't learn Power BI in a classroom. I learned it with free videos and a lot of practice. First, I watched a beginner course on YouTube. It was eight hours long.
Then I downloaded a free dataset about movies. I built my first dashboard. It wasn't beautiful, but it worked. I made many mistakes with relationships between tables.
After two months, I built a sales dashboard for my company. My manager liked it, and now the whole team uses it every day.
? Where did Ariel learn Power BI? | In a classroom ~ *With free videos and practice ~ At university
? How long was the beginner course? | Two hours ~ *Eight hours ~ Two months
? What was his first dataset about? | Sales ~ *Movies ~ Sports
? What mistakes did he make? | With colors ~ *With relationships between tables ~ With passwords
? Who uses his sales dashboard now? | Only Ariel ~ *The whole team ~ The clients

## r20 | Weekend in Paracas | Fin de semana en Paracas | A2
Last weekend, I traveled to Paracas with two friends. We left Lima on Friday night and drove for about four hours. We arrived at midnight and went to bed.
On Saturday morning, we took a boat to the Ballestas Islands. We saw sea lions, penguins and many birds. It was amazing! In the afternoon, we ate fresh fish at a small restaurant on the beach.
On Sunday, we visited the desert and took photos. We came back to Lima on Sunday night. I was tired, but very happy.
? How did they travel to Paracas? | By plane ~ *By car ~ By bus
? When did they arrive? | On Saturday morning ~ *At midnight on Friday ~ On Sunday
? What did they see on the islands? | Monkeys ~ *Sea lions, penguins and birds ~ Horses
? What did they eat? | Chicken ~ *Fresh fish ~ Pizza
? How did Ariel feel on Sunday night? | Sad ~ *Tired but very happy ~ Sick

## r21 | The survey results | Los resultados de la encuesta | A2
Last month, we sent a survey to 5,000 customers. 1,200 customers answered. That is a response rate of 24%.
Most customers were happy with our product. 78% said they were "satisfied" or "very satisfied". The main complaint was delivery time: many customers waited more than a week.
Customers in the south were less happy than customers in the north. We think the reason is delivery: our warehouse is in the north. Our recommendation is to open a small warehouse in the south.
? How many customers answered? | 5,000 ~ *1,200 ~ 24
? What percentage were satisfied or very satisfied? | 24% ~ *78% ~ 50%
? What was the main complaint? | The price ~ *Delivery time ~ The product quality
? Why were southern customers less happy? | Different products ~ *The warehouse is in the north. ~ Bad weather
? What is the recommendation? | Raise prices ~ *Open a warehouse in the south ~ Send another survey

## r22 | My first job interview in English | Mi primera entrevista en inglés | A2
My first interview in English was a disaster. I didn't prepare. When the interviewer asked "Tell me about yourself", I didn't know what to say. I spoke very fast and used Spanish words.
After the interview, I decided to practice. I wrote my answers to the ten most common questions. I recorded myself every day and listened to my mistakes.
Three months later, I had another interview. I was nervous, but I was ready. I answered every question clearly. I didn't get that job, but I got the next one!
? How was his first interview? | Great ~ *A disaster ~ Okay
? What question was difficult? | What's your salary? ~ *Tell me about yourself. ~ Where are you from?
? What did he do to practice? | He watched movies. ~ *He wrote answers and recorded himself. ~ He took a course.
? When was his next interview? | One week later ~ *Three months later ~ One year later
? Did he get the job in the second interview? | Yes ~ *No, but he got the next one. ~ The text doesn't say.

## r23 | Plans for next quarter | Planes para el próximo trimestre | A2
Next quarter, our team is going to focus on three projects. First, we are going to build a new dashboard for the marketing team. They want to see results by channel: email, social media and search.
Second, we are going to automate the weekly sales report. Right now, it takes six hours every Monday. With automation, it will take only ten minutes.
Third, we are going to clean the customer database. There are many duplicate customers. We will probably need two months for this project.
? How many projects are there? | Two ~ *Three ~ Six
? Who is the new dashboard for? | The sales team ~ *The marketing team ~ The CEO
? How long does the weekly report take now? | Ten minutes ~ *Six hours ~ Two months
? What is the problem in the customer database? | Missing emails ~ *Duplicate customers ~ Old dates
? How long will the cleaning project take? | Two weeks ~ *Probably two months ~ One day

## r24 | Advice from a senior analyst | Consejos de una analista senior | A2
I'm Priya, and I have worked as a data analyst for ten years. Here is my advice for new analysts.
First, you should ask "why" before you start. Understand the business question. Second, you shouldn't trust data without checking it. Always look for missing values and duplicates.
Third, keep your charts simple. A manager should understand your chart in five seconds. Finally, practice your communication skills. A great analysis is useless if nobody understands it.
? How long has Priya worked as an analyst? | Five years ~ *Ten years ~ Two years
? What should you do before you start? | Make charts ~ *Understand the business question ~ Buy tools
? What shouldn't you do? | Ask why ~ *Trust data without checking it ~ Keep charts simple
? How fast should a manager understand a chart? | One minute ~ *Five seconds ~ Five minutes
? Why is communication important? | It's fun. ~ *An analysis is useless if nobody understands it. ~ Managers like talking.

## r25 | An invitation | Una invitación | A2
Hi everyone,
We are going to celebrate the end of the year with a team dinner! It will be on Friday, December 12th, at 7 p.m. at "La Mar", a Peruvian restaurant in downtown.
The company will pay for dinner. Please tell me before December 5th if you would like to come. If you have any food allergies, please let me know.
Remote team members: we are going to have an online celebration on December 15th at 4 p.m. ET. There will be games and prizes!
Best,
Sara
? What is the event? | A meeting ~ *A team dinner ~ A training
? When is the dinner? | December 5th ~ *December 12th at 7 p.m. ~ December 15th
? Who will pay? | Each person ~ *The company ~ Sara
? What should you tell Sara? | Your salary ~ *If you have food allergies ~ Your address
? What is planned for remote members? | Nothing ~ *An online celebration with games ~ A trip

## r26 | Three months later | Tres meses después | A2
Three months ago, I couldn't have a conversation in English. Now I can introduce myself, talk about my job and my routine, and ask for help when I don't understand.
I learned more than 1,000 words. I completed 65 lessons and 13 weekly tests. My dictation accuracy went from 55% to 82%.
It wasn't easy. Some days I was tired and I didn't want to study. But I studied anyway, even for 20 minutes. Now my next goal is to talk about my experience and describe charts in meetings.
? What couldn't Ariel do three months ago? | Read ~ *Have a conversation in English ~ Use Excel
? How many lessons did he complete? | 13 ~ *65 ~ 1,000
? What was his dictation accuracy at the end? | 55% ~ *82% ~ 100%
? What did he do when he was tired? | He stopped. ~ *He studied anyway, even for 20 minutes. ~ He slept.
? What is his next goal? | Learn Python ~ *Talk about his experience and describe charts ~ Move to the US
`
