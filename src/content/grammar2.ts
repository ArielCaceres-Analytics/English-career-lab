// Fase 1 · Quincenas 3 y 4
export const grammar2 = [
  {
    id: 'g07',
    level: 'A1',
    title: 'There is / there are',
    titleEs: 'Hay: there is / there are',
    theory: `"Hay" en inglés depende de si lo que sigue es singular o plural:
- **There is** (there's) + singular: *There is a problem with the file.*
- **There are** + plural: *There are 200 missing values.*

Negativo: *There isn't a meeting today. There aren't any errors.*
Pregunta: *Is there a printer here? Are there any questions?*
Respuesta corta: *Yes, there is. / No, there aren't.*

Ojo: no se dice "It has a problem" para decir "hay un problema".`,
    items: `
C: ___ a problem with the dashboard. | There are ~ *There is ~ It has | Singular → There is.
C: ___ 200 missing values in the file. | There is ~ *There are ~ Have | Plural → There are.
C: ___ any errors in the report? | Is there ~ *Are there ~ There are | Pregunta en plural → Are there.
C: ___ a meeting room on this floor? | *Is there ~ Are there ~ Has | Pregunta en singular → Is there.
C: There ___ any coffee in the kitchen. | aren't ~ *isn't ~ don't | "Coffee" es incontable → isn't.
C: There ___ three new analysts on the team. | is ~ *are ~ be | Plural → are.
C: Is there a bank near here? — Yes, there ___. | are ~ *is ~ has | Respuesta corta: Yes, there is.
C: Are there any questions? — No, there ___. | isn't ~ *aren't ~ don't | Respuesta corta plural: No, there aren't.
C: How many columns ___ in the table? | there are ~ *are there ~ is there | How many + are there.
C: There ___ a lot of data in this database. | are ~ *is ~ have | "Data" (como masa) va con is.
C: ___ two files in the folder. | It has ~ There is ~ *There are | "Hay" plural = There are.
C: There ___ any duplicates. | isn't ~ *aren't ~ not | Plural negativo → aren't.
F: There ___ a new email for you. | is ~ 's | Singular → is.
F: There ___ five people in my team. | are | Plural → are.
F: ___ there a problem? | is | Pregunta singular → Is there.
F: ___ there any null values? | are | Pregunta plural → Are there.
F: There ___ (negativo) a printer here. | isn't ~ is not | Negativo singular.
F: There ___ (negativo) any free rooms. | aren't ~ are not | Negativo plural.
F: How many rows ___ there? | are | How many + are there.
F: There ___ an error in line 15. | is ~ 's | Singular → is.
F: Is there a café near the office? — Yes, there ___. | is | Respuesta corta afirmativa.
F: There ___ some important numbers in this chart. | are | Plural → are.
O: There is a problem with the data. | There is + singular.
O: There are ten rows in the table. | There are + plural.
O: Is there a meeting today? | Pregunta: Is there.
O: Are there any questions? | Pregunta: Are there + any.
O: There aren't any errors. | Negativo plural.
O: How many files are there? | How many + sustantivo + are there.
T: Escribe en negativo | There is a meeting today. | There isn't a meeting today. ~ There is not a meeting today. | is → isn't.
T: Escribe en negativo | There are some errors. | There aren't any errors. ~ There are not any errors. | En negativo, some → any.
T: Escribe la pregunta | There is a printer here. | Is there a printer here? | Invierte: Is there.
T: Escribe la pregunta | There are some new files. | Are there any new files? | En preguntas, some → any.
T: Cambia a plural | There is one error. | There are two errors. | Plural: are + errors (usa "two").
T: Escribe la pregunta con How many | There are 50 columns. | How many columns are there? | How many + columns + are there.
E: It has a problem with the file. | There is a problem with the file. ~ There's a problem with the file. | "Hay" se dice "there is", no "it has".
E: There is many errors. | There are many errors. | Plural → there are.
E: There are a meeting at 3. | There is a meeting at 3. ~ There's a meeting at 3. | Singular → there is.
E: Is there any questions? | Are there any questions? | Plural → Are there.
E: Have a bank near here? | Is there a bank near here? | "¿Hay…?" = Is there…?
E: There aren't some duplicates. | There aren't any duplicates. | En negativo se usa "any".`,
  },
  {
    id: 'g08',
    level: 'A1',
    title: 'Prepositions of time and place (in, on, at)',
    titleEs: 'Preposiciones de tiempo y lugar: in, on, at',
    theory: `**Tiempo**
- **at** + hora exacta: *at 9 a.m., at noon, at night*
- **on** + día o fecha: *on Monday, on March 5th, on the weekend* (EE.UU.)
- **in** + mes, año, estación, partes del día: *in May, in 2026, in the morning*

**Lugar**
- **in** = dentro: *in the file, in Lima, in the folder, in the meeting room*
- **on** = sobre una superficie / en una página o pantalla: *on the desk, on page 2, on the screen, on the website*
- **at** = en un punto o lugar de actividad: *at work, at home, at the office, at the airport*

Otras: **next to** (al lado), **between** (entre), **under** (debajo), **in front of** (delante).`,
    items: `
C: The meeting is ___ 10 a.m. | in ~ on ~ *at | Hora exacta → at.
C: I have a call ___ Monday. | in ~ *on ~ at | Día → on.
C: She started her job ___ 2024. | on ~ at ~ *in | Año → in.
C: The file is ___ the shared folder. | *in ~ on ~ at | Dentro de una carpeta → in.
C: The chart is ___ page 3. | in ~ *on ~ at | Página → on.
C: I am ___ work right now. | in ~ on ~ *at | at work (lugar de actividad).
C: He lives ___ Miami. | on ~ at ~ *in | Ciudad → in.
C: I study ___ the morning. | on ~ *in ~ at | in the morning.
C: My birthday is ___ June 12th. | in ~ *on ~ at | Fecha concreta → on.
C: The numbers are ___ the screen. | in ~ *on ~ at | En pantalla → on.
C: The printer is ___ the door and the window. | next ~ *between ~ under | Entre dos cosas → between.
C: The laptop is ___ the desk. | in ~ *on ~ at | Sobre una superficie → on.
F: The report is due ___ Friday. | on | Día → on.
F: We have lunch ___ noon. | at | at noon.
F: I was born ___ 1996. | in | Año → in.
F: Please save it ___ the Sales folder. | in | Dentro de una carpeta → in.
F: She is ___ home today. | at | at home.
F: The office is closed ___ December 25th. | on | Fecha → on.
F: I work best ___ the afternoon. | in | in the afternoon.
F: The data is ___ the second tab of the spreadsheet. | on ~ in | Ambas se usan con pestañas; "on the second tab" es lo más común.
F: He is ___ the airport. | at | Punto o lugar de actividad → at.
F: The company is ___ New York. | in | Ciudad → in.
O: The meeting is at three o'clock. | at + hora.
O: I work from home on Fridays. | on + día.
O: The file is in the shared folder. | in + carpeta.
O: My office is next to the kitchen. | next to = al lado de.
O: The total is on page five. | on + página.
O: We started the project in March. | in + mes.
T: Corrige la preposición | The meeting is in Monday. | The meeting is on Monday. | Día → on.
T: Corrige la preposición | I start work on 8 a.m. | I start work at 8 a.m. | Hora → at.
T: Corrige la preposición | She lives at Peru. | She lives in Peru. | País → in.
T: Corrige la preposición | The chart is in page 4. | The chart is on page 4. | Página → on.
T: Corrige la preposición | We have a meeting at July. | We have a meeting in July. | Mes → in.
T: Corrige la preposición | I am in work. | I am at work. ~ I'm at work. | at work.
E: See you in Tuesday. | See you on Tuesday. | Día → on.
E: The call is on 4 p.m. | The call is at 4 p.m. | Hora → at.
E: I live on Lima. | I live in Lima. | Ciudad → in.
E: I study in night. | I study at night. | Expresión fija: at night.
E: The link is in the website. | The link is on the website. | En una página web → on.
E: My birthday is in May 3rd. | My birthday is on May 3rd. | Fecha concreta → on.`,
  },
  {
    id: 'g09',
    level: 'A1',
    title: 'Countable / uncountable, some / any, much / many',
    titleEs: 'Contables e incontables: some, any, much, many',
    theory: `**Contables**: se pueden contar (a file, two files). **Incontables**: no llevan plural ni "a" (*information, data, advice, money, software, feedback, work, coffee*).

- **some** → afirmativo: *I have some questions. There is some data.*
- **any** → negativo y preguntas: *I don't have any questions. Do you have any feedback?*
- Ofrecer o pedir: *Would you like some coffee? Can I have some help?*
- **many** + contable plural · **much** + incontable (sobre todo en negativo y preguntas): *How many files? How much time?*
- **a lot of** sirve para ambos: *a lot of data, a lot of errors*.

Errores típicos del hispanohablante: *informations, advices, softwares* ✗.`,
    items: `
C: I have ___ questions about the report. | any ~ *some ~ a | Afirmativo plural → some.
C: Do you have ___ questions? | some ~ *any ~ a | Pregunta → any.
C: We don't have ___ time today. | some ~ *any ~ many | Negativo → any.
C: How ___ files do you need? | much ~ *many ~ any | "Files" es contable → many.
C: How ___ time do we have? | many ~ *much ~ any | "Time" es incontable → much.
C: I need some ___ about the project. | informations ~ *information ~ an information | "Information" es incontable: sin -s.
C: Can you give me some ___? | advices ~ *advice ~ an advice | "Advice" es incontable.
C: There is ___ data in this table. | many ~ *a lot of ~ a | "A lot of" sirve con incontables.
C: Would you like ___ coffee? | any ~ *some ~ many | Para ofrecer se usa "some".
C: We don't have ___ customers in Chile. | much ~ *many ~ some | Contable plural en negativo → many.
C: I received ___ feedback from my manager. | a ~ *some ~ many | "Feedback" es incontable → some.
C: The company uses three types of ___. | softwares ~ *software ~ a software | "Software" no tiene plural.
F: There are ___ errors in the file. (algunos) | some | Afirmativo → some.
F: Are there ___ duplicates? | any | Pregunta → any.
F: I don't have ___ experience with Python. | any ~ much | Negativo → any (o much).
F: How ___ rows are there? | many | Rows (contable) → many.
F: How ___ money do you need? | much | Money (incontable) → much.
F: She doesn't have ___ friends here. | many ~ any | Contable negativo.
F: Can I have ___ water, please? | some | Pedir → some.
F: We have a lot ___ work today. | of | a lot of.
F: There isn't ___ milk in the fridge. | any | Negativo → any.
F: How ___ people work in your company? | many | People (contable) → many.
O: I have some questions. | some en afirmativo.
O: Do you have any feedback? | any en preguntas.
O: How many customers do we have? | How many + contable.
O: How much time do you need? | How much + incontable.
O: We don't have any duplicates. | any en negativo.
O: There is a lot of data. | a lot of + incontable.
T: Escribe en negativo | I have some questions. | I don't have any questions. ~ I do not have any questions. | Negativo: some → any.
T: Escribe la pregunta | You have some feedback. | Do you have any feedback? | Pregunta: some → any.
T: Haz la pregunta con How many | There are 30 files. | How many files are there? | Contable → How many.
T: Haz la pregunta con How much | It costs 50 dollars. | How much does it cost? | Precio → How much.
T: Escribe en negativo | There is some coffee. | There isn't any coffee. ~ There is not any coffee. | some → any.
T: Corrige el sustantivo | I need more informations. | I need more information. | Information no tiene plural.
E: I have many informations. | I have a lot of information. ~ I have much information. | Information es incontable: no lleva -s.
E: Do you have some questions? | Do you have any questions? | En preguntas normalmente se usa "any".
E: How much files are there? | How many files are there? | Contable → many.
E: She gave me an advice. | She gave me some advice. ~ She gave me a piece of advice. | Advice es incontable.
E: We don't have some time. | We don't have any time. ~ We do not have any time. | Negativo → any.
E: How many money do you need? | How much money do you need? | Money es incontable → much.`,
  },
  {
    id: 'g10',
    level: 'A1',
    title: 'Present continuous vs. present simple',
    titleEs: 'Presente continuo (lo que pasa ahora) vs. presente simple',
    theory: `**Presente continuo** = am/is/are + verbo-**ing**. Para lo que pasa **ahora** o en estos días:
*I'm working on a sales report. She's cleaning the data right now.*

**Presente simple** = rutina o hecho general: *I work with sales data every day.*

Palabras clave: **now, right now, at the moment, today, this week** → continuo. **every day, usually, always** → simple.

Ortografía: work → working · make → making (quita la e) · run → running (dobla la consonante) · lie → lying.
Algunos verbos casi nunca van en -ing: **know, like, want, need, understand, believe**: *I need help* (no "I'm needing").`,
    items: `
C: I ___ on a sales report right now. | work ~ *am working ~ working | Ahora mismo → presente continuo.
C: She usually ___ from home on Fridays. | is working ~ *works ~ working | Rutina (usually) → presente simple.
C: Look! The dashboard ___. | *is loading ~ loads ~ load | Está pasando ahora → continuo.
C: What ___ you doing? | do ~ *are ~ is | Continuo: are you doing?
C: They ___ to the meeting at the moment. | go ~ *are going ~ goes | At the moment → continuo.
C: I ___ what you mean. | am understanding ~ *understand ~ understanding | "Understand" no se usa en -ing.
C: He ___ a new dataset this week. | analyze ~ *is analyzing ~ analyzing | This week (temporal) → continuo.
C: We ___ SQL every day. | are using ~ *use ~ using | Every day → presente simple.
C: She ___ coffee now. Call her later. | drinks ~ *is having ~ have | Ahora → continuo.
C: I ___ more time to finish. | am needing ~ *need ~ needing | "Need" no se usa en continuo.
C: Is he ___ the code? | test ~ *testing ~ tests | Continuo: is + verbo-ing.
C: The servers ___ right now. | doesn't work ~ *aren't working ~ not working | Ahora + plural → aren't working.
F: I ___ (write) an email now. | am writing ~ 'm writing | am + writing (write pierde la e).
F: She ___ (clean) the data at the moment. | is cleaning ~ 's cleaning | is + cleaning.
F: They ___ (not / work) today. It's a holiday. | aren't working ~ are not working ~ 're not working | Negativo continuo.
F: ___ you listening to me? | are | Pregunta en continuo: Are you + verbo-ing?
F: He ___ (run) the query right now. | is running ~ 's running | run → running (doble n).
F: I usually ___ (start) work at 8. | start | Rutina → simple.
F: We ___ (make) a new dashboard this month. | are making ~ 're making | make → making.
F: She ___ (know) the answer. | knows | "Know" no va en continuo.
F: Look, it ___ (rain). | is raining ~ 's raining | Ahora → continuo.
F: My team ___ (meet) every Monday. | meets | Rutina → simple.
O: I am working on a new report. | am + working.
O: What are you doing right now? | What + are + you + doing.
O: She is not answering her phone. | is not + verbo-ing.
O: They are testing the new dashboard. | are + testing.
O: He usually works from home. | Rutina → simple.
O: Is the query running? | Pregunta continua: Is + sujeto + verbo-ing.
T: Escribe en presente continuo | I write the report. | I am writing the report. ~ I'm writing the report. | am + writing.
T: Escribe en presente continuo | She checks the numbers. | She is checking the numbers. ~ She's checking the numbers. | is + checking.
T: Escribe la pregunta | They are working today. | Are they working today? | Invierte: Are they…
T: Escribe en negativo | He is using Excel. | He isn't using Excel. ~ He is not using Excel. ~ He's not using Excel. | is not + using.
T: Escribe en presente continuo | We run the tests. | We are running the tests. ~ We're running the tests. | run → running.
T: Escribe en presente continuo | I make a chart. | I am making a chart. ~ I'm making a chart. | make → making.
E: I working on the report. | I am working on the report. ~ I'm working on the report. | Falta el verbo "am".
E: She is work now. | She is working now. ~ She's working now. | Continuo: is + verbo-ing.
E: I am needing help. | I need help. | "Need" no se usa en continuo.
E: What you are doing? | What are you doing? | En la pregunta, "are" va antes de "you".
E: He is runing the query. | He is running the query. ~ He's running the query. | run → running (doble n).
E: Every day I am checking the data. | Every day I check the data. | Rutina (every day) → presente simple.`,
  },
]
