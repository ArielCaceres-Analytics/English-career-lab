export const dialogues2 = `
## d21 | Is there a problem? | ¿Hay un problema? | A1 | work
Kim: Ariel, is there a problem with the sales file?
Ariel: Yes, there is. There are 200 missing values.
Kim: In which column?
Ariel: In the "region" column. There aren't any values for March.
Kim: Is there a backup file?
Ariel: Yes, there is one in the shared folder.
Kim: Great. Can you use the backup?
Ariel: Sure. I'll check it now.
? How many missing values are there? | 20 ~ *200 ~ 2,000
? Which column has the problem? | Date ~ *Region ~ Sales
? Where is the backup file? | On Kim's laptop ~ *In the shared folder ~ There isn't one.

## d22 | Around the office | Por la oficina | A1 | work
Ariel: Excuse me, is there a printer on this floor?
Ben: Yes, there is. It's next to the kitchen.
Ariel: And where are the meeting rooms?
Ben: There are two meeting rooms. They're at the end of the hall, on the left.
Ariel: Is there a café near the office?
Ben: Yes, there's a good café across the street.
Ariel: Thank you!
Ben: You're welcome.
? Where is the printer? | *Next to the kitchen ~ In the meeting room ~ Across the street
? How many meeting rooms are there? | One ~ *Two ~ Three
? Where is the café? | In the office ~ *Across the street ~ Next to the kitchen

## d23 | At a restaurant | En un restaurante | A1 | daily
Waiter: Good afternoon. Are you ready to order?
Ariel: Yes. Can I have the chicken salad, please?
Waiter: Sure. Anything to drink?
Ariel: Some water, please. Is there any lemonade?
Waiter: Sorry, there isn't any lemonade today. We have orange juice.
Ariel: Okay, an orange juice then.
Waiter: Anything else?
Ariel: No, thank you. Can I have the bill later?
? What does Ariel order to eat? | Fish ~ *Chicken salad ~ Rice
? Is there any lemonade? | *No, there isn't. ~ Yes, there is. ~ Only on weekends.
? What does Ariel drink? | Lemonade ~ Coffee ~ *Orange juice

## d24 | Shopping for a laptop | Comprando una laptop | A1 | daily
Clerk: Hi! Can I help you?
Ariel: Yes, I need a laptop for work. I use Power BI and big Excel files.
Clerk: How much RAM do you need?
Ariel: At least sixteen gigabytes.
Clerk: This one has sixteen gigabytes. It's 900 dollars.
Ariel: That's a little expensive. Is there a cheaper one?
Clerk: Yes, this one is 750 dollars, also with sixteen gigabytes.
Ariel: Perfect. I'll take it.
? Why does Ariel need a laptop? | For games ~ *For work ~ For his sister
? How much is the first laptop? | $750 ~ *$900 ~ $16
? Which laptop does Ariel buy? | The $900 one ~ *The $750 one ~ He doesn't buy one.

## d25 | Where is the file? | ¿Dónde está el archivo? | A1 | work
Sara: Ariel, where is the March report?
Ariel: It's in the Sales folder, in "2026".
Sara: I can't see it. Is it on the shared drive?
Ariel: Yes, it is. Go to the shared drive, then Sales, then 2026.
Sara: Oh, I see it now. Is the chart on page two?
Ariel: No, it's on page three.
Sara: Thanks! And the meeting is at three, right?
Ariel: Yes, at three, in room B.
? Where is the March report? | On Ariel's desk ~ *In the Sales folder on the shared drive ~ In an email
? On what page is the chart? | Page two ~ *Page three ~ Page one
? Where is the meeting? | *Room B ~ Room A ~ Online

## d26 | Asking for directions | Pedir direcciones | A1 | daily
Ariel: Excuse me, how do I get to the train station?
Woman: Go straight for two blocks, then turn left.
Ariel: Turn left at the bank?
Woman: Yes, at the bank. The station is on the right, next to a park.
Ariel: Is it far?
Woman: No, it's about ten minutes on foot.
Ariel: Could you repeat that, please?
Woman: Sure. Two blocks straight, left at the bank, and it's on the right.
? Where does Ariel turn left? | At the park ~ *At the bank ~ At the station
? How far is the station on foot? | Two minutes ~ *Ten minutes ~ An hour
? What is next to the station? | A bank ~ *A park ~ A café

## d27 | Calendar dates | Fechas en el calendario | A1 | work
Mark: When is the product launch?
Ariel: It's on March fifteenth.
Mark: Fifteen or fifty?
Ariel: Fifteen. One, five.
Mark: Okay. And the presentation to the client?
Ariel: That's on Monday, March twentieth, at nine a.m.
Mark: Do we have a meeting in April?
Ariel: Yes, on April third, in the afternoon.
? When is the product launch? | March 50th ~ *March 15th ~ April 15th
? What day is the client presentation? | *Monday ~ Friday ~ Wednesday
? When is the April meeting? | April 13th in the morning ~ *April 3rd in the afternoon ~ April 30th

## d28 | Some or any? | ¿Some o any? | A1 | work
Kim: Do you have any questions about the project?
Ariel: Yes, I have some questions about the data.
Kim: Sure. What do you need?
Ariel: Is there any information about the customers' ages?
Kim: No, there isn't any age data. But we have some data about their cities.
Ariel: How much data is there?
Kim: A lot. About two million rows.
Ariel: Wow. I need some time to explore it.
? What data isn't available? | City data ~ *Age data ~ Sales data
? How many rows are there? | *About two million ~ About two thousand ~ Twenty
? What does Ariel need? | Some money ~ *Some time ~ Some coffee

## d29 | At the supermarket | En el supermercado | A1 | daily
Ana: Do we need any eggs?
Ariel: Yes, we need some eggs and some bread.
Ana: How many eggs?
Ariel: A dozen. Twelve.
Ana: Do we have any rice?
Ariel: We have a little rice, but not much. Let's buy some.
Ana: And fruit?
Ariel: Yes, some bananas and apples, please.
? How many eggs do they need? | Six ~ *Twelve ~ Twenty
? Do they have a lot of rice? | Yes, a lot. ~ *No, only a little. ~ They don't have any.
? What fruit do they buy? | Oranges ~ *Bananas and apples ~ Grapes

## d30 | Review: asking for help | Repaso: pedir ayuda | A1 | work
Ariel: Hi Ben, can you help me with something?
Ben: Sure. What's the problem?
Ariel: There's an error in my SQL query, but I can't find it.
Ben: Can you share your screen?
Ariel: Yes. Can you see it?
Ben: Yes. Look at line twelve. There isn't a comma after "region".
Ariel: Oh, you're right! Thank you so much.
Ben: No problem. Any time.
? What does Ariel need help with? | An Excel file ~ *A SQL query ~ A presentation
? Where is the error? | Line 2 ~ *Line 12 ~ Line 20
? What is missing? | A period ~ *A comma ~ A column

## d31 | What are you doing? | ¿Qué estás haciendo? | A1 | work
Mark: Hi Ariel, are you busy?
Ariel: A little. I'm working on the monthly report.
Mark: What are you doing exactly?
Ariel: I'm cleaning the data right now. Then I'm going to make the charts.
Mark: Is Kim helping you?
Ariel: Not today. She's preparing a presentation for the client.
Mark: Okay. Call me if you need help.
Ariel: Thanks, Mark.
? What is Ariel doing right now? | Making charts ~ *Cleaning the data ~ Having lunch
? What is Kim doing? | Helping Ariel ~ *Preparing a presentation ~ Taking a break
? What report is Ariel working on? | Weekly ~ *Monthly ~ Yearly

## d32 | The weather | El clima | A1 | daily
Sara: How's the weather in Lima today?
Ariel: It's cloudy and a little cold. It's winter here.
Sara: Really? It's very hot here in Miami. It's summer!
Ariel: Is it raining?
Sara: No, it isn't. It's sunny. Is it raining in Lima?
Ariel: It never really rains in Lima. It's just gray.
Sara: That's interesting.
Ariel: Yes, but it's warm in summer, from December to March.
? How is the weather in Lima today? | Hot and sunny ~ *Cloudy and a little cold ~ Rainy
? Where is Sara? | Lima ~ *Miami ~ New York
? When is summer in Lima? | June to August ~ *December to March ~ All year

## d33 | Skills | Habilidades | A1 | work
Recruiter: What can you do with Excel?
Ariel: I can make pivot tables, use VLOOKUP and create charts.
Recruiter: Can you write SQL?
Ariel: Yes, I can. I can write joins and group by queries.
Recruiter: Can you code in Python?
Ariel: Not yet. I can read basic code, but I can't write it well. I'm learning.
Recruiter: And can you speak English in meetings?
Ariel: Yes, I can. I'm improving every day.
? What can't Ariel do well yet? | Use Excel ~ Write SQL ~ *Write Python code
? Which Excel skill does Ariel mention? | *Pivot tables ~ Macros ~ Power Query
? What does Ariel say about his English? | It's perfect. ~ *He's improving every day. ~ He can't speak in meetings.

## d34 | Free time | Tiempo libre | A1 | daily
Kim: What do you like doing in your free time?
Ariel: I like playing soccer and watching movies.
Kim: Can you play any instruments?
Ariel: Yes, I can play the guitar a little. Can you?
Kim: No, I can't. But I can sing!
Ariel: Really? What are you doing this weekend?
Kim: I'm visiting my parents in Boston.
Ariel: Nice. I'm playing soccer with friends on Saturday.
? What instrument can Ariel play? | The piano ~ *The guitar ~ None
? What can Kim do? | Play the guitar ~ *Sing ~ Play soccer
? What is Kim doing this weekend? | Playing soccer ~ *Visiting her parents ~ Working

## d35 | Getting to work | Ir al trabajo | A1 | daily
Ben: How do you get to work?
Ariel: I usually take the bus. Today I'm taking a taxi.
Ben: Why?
Ariel: Because it's raining and I'm late.
Ben: How long does the bus take?
Ariel: About forty minutes. Traffic in Lima is terrible.
Ben: Can you work from home more often?
Ariel: Yes, I can work from home two days a week.
? How does Ariel usually get to work? | By taxi ~ *By bus ~ On foot
? Why is he taking a taxi today? | He's tired. ~ *It's raining and he's late. ~ The bus is broken.
? How long does the bus take? | Fourteen minutes ~ *About forty minutes ~ Two hours

## d36 | Instructions | Instrucciones | A1 | work
Kim: Let me show you the new dashboard.
Ariel: Great. What do I do first?
Kim: Open Power BI and click "Get data".
Ariel: Okay. Then?
Kim: Choose the sales database. Don't select the old one.
Ariel: How do I know which one is old?
Kim: The old one ends in "2023". Select "sales_2026".
Ariel: Got it. Let's refresh the data.
? What does Kim tell Ariel to click first? | *Get data ~ Refresh ~ Save
? Which database should Ariel choose? | sales_2023 ~ *sales_2026 ~ Any database
? What shouldn't Ariel do? | Open Power BI ~ *Select the old database ~ Refresh the data

## d37 | Can you help me? | ¿Puedes ayudarme? | A1 | work
Ariel: Excuse me, Sara. Could you help me for a minute?
Sara: Sure. What do you need?
Ariel: I can't open this file. It says "access denied".
Sara: Oh, you need permission. Ask IT for access.
Ariel: Can you give me access?
Sara: No, I can't. Only IT can do it.
Ariel: Okay. Could you send me their email?
Sara: Of course. It's helpdesk at company dot com.
? What is Ariel's problem? | The file is empty. ~ *He can't open the file. ~ He can't find the file.
? Who can give access? | Sara ~ *IT ~ Mark
? What does Sara send? | The file ~ *IT's email ~ A password

## d38 | On the phone | Al teléfono | A1 | work
Receptionist: Good morning, DataCorp. How can I help you?
Ariel: Hello, can I speak to Mr. Smith, please?
Receptionist: I'm sorry, he's in a meeting right now. Can I take a message?
Ariel: Yes, please. This is Ariel Cáceres. I'm calling about the job interview.
Receptionist: Could you spell your last name?
Ariel: C-A-C-E-R-E-S.
Receptionist: Thank you. He can call you back this afternoon.
Ariel: Perfect. Thank you very much.
? Why can't Mr. Smith speak now? | He's sick. ~ *He's in a meeting. ~ He's on vacation.
? Why is Ariel calling? | About a report ~ *About a job interview ~ About a problem
? When can Mr. Smith call back? | Tomorrow ~ *This afternoon ~ Tonight

## d39 | Working on it | Trabajando en eso | A1 | work
Mark: Hi team. What is everyone working on this week?
Kim: I'm building the new customer dashboard.
Ben: I'm testing the data pipeline.
Ariel: I'm analyzing the survey results. We're getting a lot of answers.
Mark: How many answers do we have?
Ariel: Right now, about eight hundred.
Mark: Great. Can you share some numbers on Friday?
Ariel: Yes, I can.
? What is Kim building? | A pipeline ~ *A customer dashboard ~ A survey
? What is Ariel analyzing? | Sales data ~ *Survey results ~ The pipeline
? How many answers are there now? | About 80 ~ *About 800 ~ About 8,000

## d40 | Review: a busy day | Repaso: un día ocupado | A1 | work
Sara: You look busy. What's happening?
Ariel: The dashboard isn't working, and the client is waiting.
Sara: Can I help?
Ariel: Yes, please. Can you check the data source? I'm fixing the charts.
Sara: Sure. Hmm, the database isn't responding.
Ariel: Can you call IT?
Sara: I'm calling them now. Don't worry.
Ariel: Thanks, Sara. You're a lifesaver.
? What's the problem? | The client is angry. ~ *The dashboard isn't working. ~ Ariel is sick.
? What is Ariel doing? | Calling IT ~ *Fixing the charts ~ Checking the data source
? Who is calling IT? | Ariel ~ *Sara ~ The client

## d41 | Last weekend | El fin de semana pasado | A2 | daily
Kim: How was your weekend?
Ariel: It was great, thanks. I visited my mom on Sunday.
Kim: Did you study English?
Ariel: Yes, I studied for an hour on Saturday. And you?
Kim: I watched a movie and cooked dinner for my friends.
Ariel: What did you cook?
Kim: I cooked pasta. It was delicious.
Ariel: That sounds nice.
? Who did Ariel visit? | His sister ~ *His mom ~ His friends
? What did Kim do? | She studied. ~ *She watched a movie and cooked. ~ She worked.
? What did Kim cook? | Rice ~ *Pasta ~ Chicken

## d42 | Yesterday at work | Ayer en el trabajo | A2 | work
Mark: What did you do yesterday?
Ariel: Yesterday I cleaned the survey data and checked the totals.
Mark: Were there any problems?
Ariel: Yes, there were some duplicates. I removed them.
Mark: How many duplicates were there?
Ariel: About three hundred.
Mark: Good job. Was the file complete?
Ariel: No, it wasn't. Two cities were missing. I asked the team for the data.
? What did Ariel remove? | Cities ~ *Duplicates ~ Totals
? How many duplicates were there? | About 30 ~ *About 300 ~ About 3,000
? Was the file complete? | Yes, it was. ~ *No, two cities were missing. ~ We don't know.

## d43 | My studies | Mis estudios | A2 | daily
Interviewer: Where did you study?
Ariel: I studied engineering at a university in Lima.
Interviewer: When did you finish?
Ariel: I finished in 2020.
Interviewer: Did you study data analysis at university?
Ariel: Not really. I learned SQL and Power BI later, with online courses.
Interviewer: Were the courses difficult?
Ariel: Some were difficult, but I practiced a lot.
? What did Ariel study at university? | Data analysis ~ *Engineering ~ English
? When did he finish? | 2002 ~ *2020 ~ 2012
? How did he learn SQL and Power BI? | At university ~ *With online courses ~ At work only

## d44 | A problem last week | Un problema la semana pasada | A2 | work
Sara: Was the report late last week?
Ariel: Yes, it was. The server stopped on Thursday.
Sara: Oh no. What happened?
Ariel: The server crashed at three p.m. IT restarted it at six.
Sara: Were the numbers correct?
Ariel: Yes, they were. I checked everything again on Friday.
Sara: And did the client receive it?
Ariel: Yes, I emailed it on Friday afternoon.
? Why was the report late? | Ariel was sick. ~ *The server stopped. ~ The client changed the data.
? When did IT restart the server? | At three ~ *At six ~ On Friday
? When did the client get the report? | Thursday ~ *Friday afternoon ~ Monday

## d45 | Review: my last job | Repaso: mi último trabajo | A2 | work
Recruiter: Tell me about your last job.
Ariel: I worked at a retail company for two years.
Recruiter: What did you do there?
Ariel: I analyzed sales data and created weekly reports in Excel.
Recruiter: Did you work with any other teams?
Ariel: Yes, I worked with marketing and finance.
Recruiter: What was your biggest achievement?
Ariel: I automated a report. It saved five hours every week.
? Where did Ariel work? | At a bank ~ *At a retail company ~ At a hospital
? How long did he work there? | One year ~ *Two years ~ Five years
? What was his biggest achievement? | He got a promotion. ~ *He automated a report. ~ He hired a team.
`
