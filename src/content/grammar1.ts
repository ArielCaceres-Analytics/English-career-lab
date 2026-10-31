// Fase 1 · Quincenas 1 y 2. Formato de ejercicios: ver src/lib/parse.ts
export const grammar1 = [
  {
    id: 'g01',
    level: 'A1',
    title: 'Verb to be (am / is / are)',
    titleEs: 'El verbo "to be": ser y estar',
    theory: `"To be" significa **ser** o **estar**. Tiene tres formas en presente:
- **I am** (I'm) → yo soy/estoy
- **He / She / It is** (he's, she's, it's)
- **You / We / They are** (you're, we're, they're)

Negativo: agrega **not** → *I'm not*, *she isn't*, *they aren't*.
Pregunta: invierte el orden → *Are you a data analyst?* *Is it ready?*

Ojo: en inglés la edad usa "to be": **I am 28 years old** (no "I have 28 years").`,
    items: `
C: I ___ a data analyst. | *am ~ is ~ are | Con "I" siempre se usa "am".
C: She ___ from Lima. | am ~ *is ~ are | Con he/she/it se usa "is".
C: They ___ my coworkers. | am ~ is ~ *are | Con you/we/they se usa "are".
C: ___ you ready for the meeting? | Is ~ Am ~ *Are | En preguntas el verbo va primero: Are you…?
C: The report ___ ready. | *is ~ are ~ am | "The report" = it, por eso "is".
C: The files ___ in the shared folder. | is ~ *are ~ am | "The files" es plural (they), por eso "are".
C: We ___ not in the office today. | is ~ am ~ *are | Con "we" se usa "are": we are not = we aren't.
C: ___ Excel open? | *Is ~ Are ~ Am | "Excel" es singular (it): Is Excel open?
C: My name ___ Ariel. | am ~ *is ~ are | "My name" = it → is.
C: I ___ 28 years old. | have ~ *am ~ has | La edad se dice con "to be", no con "have".
C: How old ___ you? | is ~ *are ~ am | Con "you" siempre "are".
F: I ___ (be) from Peru. | am ~ 'm | Con "I" usamos "am".
F: He ___ (be) my manager. | is ~ 's | He → is.
F: You ___ (be) very good at SQL. | are ~ 're | You → are.
F: The data ___ (be) clean now. | is ~ 's | En el trabajo "data" se usa casi siempre como singular: the data is.
F: My coworkers ___ (be) from the United States. | are | Plural → are.
F: ___ (be) she a data analyst? | is | Pregunta con she → Is she…?
F: I ___ (be / negativo) tired. | am not ~ 'm not | Negativo con I: I am not / I'm not. (No existe "amn't").
F: They ___ (be / negativo) at home. | are not ~ aren't ~ 're not | Negativo plural: are not = aren't.
F: It ___ (be / negativo) a big file. | is not ~ isn't ~ 's not | Negativo singular: is not = isn't.
F: ___ (be) the dashboards ready? | are | "The dashboards" es plural → Are.
O: I am a data analyst. | Sujeto + am + profesión.
O: She is not in the office. | Sujeto + is + not + lugar.
O: Are you from Lima? | Pregunta: Are + you + resto.
O: The report is ready. | Sujeto + is + adjetivo.
O: Is the meeting at ten? | Pregunta: Is + sujeto + resto.
O: We are not ready yet. | Negativo: are not.
T: Escribe en negativo | I am a manager. | I am not a manager. ~ I'm not a manager. | Agrega "not" después de "am".
T: Escribe en negativo | She is from Mexico. | She is not from Mexico. ~ She isn't from Mexico. ~ She's not from Mexico. | Agrega "not" después de "is".
T: Escribe la pregunta | You are a data analyst. | Are you a data analyst? | Invierte: Are + you.
T: Escribe la pregunta | The file is in the folder. | Is the file in the folder? | Invierte: Is + the file.
T: Escribe en negativo | They are in the meeting. | They are not in the meeting. ~ They aren't in the meeting. ~ They're not in the meeting. | are + not.
T: Escribe con contracción | I am happy. | I'm happy. | I am = I'm.
E: I is a data analyst. | I am a data analyst. ~ I'm a data analyst. | Con "I" siempre "am", nunca "is".
E: She are my boss. | She is my boss. ~ She's my boss. | Con "she" se usa "is".
E: I have 30 years. | I am 30 years old. ~ I'm 30 years old. ~ I am 30. ~ I'm 30. | La edad se dice con "to be": I am 30 (years old).
E: They is in Lima. | They are in Lima. ~ They're in Lima. | Con "they" se usa "are".
E: You is very good. | You are very good. ~ You're very good. | Con "you" siempre "are".
E: Is ready the report? | Is the report ready? | En la pregunta, el sujeto va justo después de "is".
E: I no am tired. | I am not tired. ~ I'm not tired. | El negativo se forma con "not" después del verbo, no con "no".`,
  },
  {
    id: 'g02',
    level: 'A1',
    title: 'Subject pronouns and possessives',
    titleEs: 'Pronombres y posesivos (I, my, your, his, her…)',
    theory: `**Pronombres sujeto** (quién hace la acción): I, you, he, she, it, we, they.
**Posesivos** (de quién es): my, your, his, her, its, our, their.

| Sujeto | Posesivo |
|---|---|
| I | my |
| you | your |
| he | his |
| she | her |
| it | its |
| we | our |
| they | their |

Diferencia clave en español: "su" puede ser **his** (de él), **her** (de ella) o **their** (de ellos). En inglés eliges según el dueño.
Ojo: **its** (posesivo) no lleva apóstrofo; **it's** = it is.`,
    items: `
C: This is my coworker. ___ name is Laura. | His ~ *Her ~ Their | Laura es mujer → her.
C: This is Mark. ___ is from Texas. | *He ~ His ~ Him | Como sujeto se usa "he".
C: Mark and Ana are analysts. ___ office is in New York. | Our ~ His ~ *Their | El dueño son ellos → their.
C: I work with SQL. ___ job is fun. | I ~ *My ~ Me | Antes de un sustantivo se usa el posesivo: my job.
C: We have a meeting. ___ manager is Tom. | We ~ *Our ~ Us | Posesivo de "we" → our.
C: What is ___ email address? | you ~ *your ~ you're | "Your" es posesivo. "You're" = you are.
C: The company is big. ___ main office is in Chicago. | It's ~ *Its ~ Their | Posesivo de "it" → its (sin apóstrofo).
C: Ana is my friend. ___ is a nurse. | Her ~ *She ~ His | Como sujeto: she.
C: John loves ___ job. | her ~ *his ~ its | John es hombre → his.
C: They love ___ new dashboard. | there ~ *their ~ they're | "Their" = de ellos. "There" = allí. "They're" = they are.
C: ___ a good day today. | Its ~ *It's ~ It | It's = it is.
C: My sister and I are engineers. ___ are from Arequipa. | They ~ *We ~ Us | "My sister and I" = we.
F: I am Ariel. ___ last name is Cáceres. | my | Posesivo de I → my.
F: Sara is a manager. ___ team is small. | her | Sara (ella) → her.
F: Mr. Smith is the CEO. ___ office is on the fifth floor. | his | Mr. Smith (él) → his.
F: We are a team. ___ goal is to clean the data. | our | Posesivo de we → our.
F: Are you new here? What is ___ name? | your | Posesivo de you → your.
F: The analysts are busy. ___ reports are due today. | their | Posesivo de they → their.
F: This is a dataset. ___ size is 2 GB. | its | Posesivo de it → its.
F: Paul and Kim are from Canada. ___ are very friendly. | they | Sujeto plural → they.
F: My mother is a teacher. ___ works in a school. | she | Sujeto femenino → she.
F: ___ name is David. He is my manager. | his | Posesivo masculino → his.
O: My name is Ariel. | Posesivo + sustantivo + is.
O: Her office is in Miami. | Her + sustantivo.
O: Their team is very small. | Their + sustantivo.
O: What is your email address? | Pregunta con What + is + your.
O: Our manager is from Texas. | Our + sustantivo.
O: His report is on the table. | His + sustantivo.
T: Cambia "the job of Laura" por un posesivo | This is the job of Laura. | This is her job. | Laura → her.
T: Cambia "the car of Peter" por un posesivo | It is the car of Peter. | It is his car. ~ It's his car. | Peter → his.
T: Cambia "the office of my team and me" por un posesivo | This is the office of my team and me. | This is our office. | Mi equipo y yo → our.
T: Cambia "the computers of the analysts" por un posesivo | These are the computers of the analysts. | These are their computers. | Los analistas → their.
T: Reemplaza "Maria" por un pronombre | Maria is from Cusco. | She is from Cusco. ~ She's from Cusco. | Maria → she.
T: Reemplaza "The report" por un pronombre | The report is late. | It is late. ~ It's late. | The report → it.
E: She is my boss. His name is Linda. | She is my boss. Her name is Linda. | Linda es mujer → her, no his.
E: They are happy with they results. | They are happy with their results. | Posesivo de they → their.
E: The app is fast. It's design is simple. | The app is fast. Its design is simple. | "It's" significa "it is". El posesivo es "its".
E: Me name is Carlos. | My name is Carlos. | "Me" no es posesivo. Se dice "my".
E: Is you're email correct? | Is your email correct? | "You're" = you are. Posesivo: your.
E: Him is my coworker. | He is my coworker. ~ He's my coworker. | Como sujeto se usa "he", no "him".`,
  },
  {
    id: 'g03',
    level: 'A1',
    title: 'A / an, plurals, this / that / these / those',
    titleEs: 'Artículos a/an, plurales y demostrativos',
    theory: `**A / an** = un, una. Depende del **sonido** inicial de la palabra siguiente:
- **a** + sonido de consonante: *a report, a table, a university* (suena "yu")
- **an** + sonido de vocal: *an analyst, an email, an hour* (la h no suena)

En inglés la profesión lleva artículo: **I'm a data analyst** (no "I'm data analyst").

**Plurales**: normalmente + s (*file → files*). Termina en s, sh, ch, x → + es (*box → boxes*). Consonante + y → ies (*company → companies*). Irregulares: *person → people, man → men, woman → women, child → children*.

**Demostrativos**: this (este, cerca, singular), these (estos, cerca, plural), that (ese/aquel, lejos, singular), those (esos, lejos, plural).`,
    items: `
C: I am ___ data analyst. | *a ~ an ~ – | "data" empieza con sonido de consonante → a. Y la profesión siempre lleva artículo.
C: She is ___ engineer. | a ~ *an ~ – | "engineer" empieza con sonido de vocal → an.
C: I have ___ email from my manager. | a ~ *an ~ – | "email" empieza con vocal → an.
C: It takes ___ hour. | a ~ *an ~ – | En "hour" la h no suena: empieza con sonido de vocal → an.
C: He studies at ___ university. | *a ~ an ~ – | "university" suena "yu-ni…": sonido de consonante → a.
C: I need ___ new laptop. | *a ~ an ~ – | "new" empieza con consonante → a.
C: Two ___ are in the meeting. | womans ~ *women ~ woman | Plural irregular: woman → women.
C: Many ___ use Excel every day. | persons ~ *people ~ peoples | El plural normal de "person" es "people".
C: Look at ___ chart here on my screen. | *this ~ these ~ those | Cerca y singular → this.
C: ___ files over there are old. | This ~ That ~ *Those | Lejos y plural → those.
C: ___ numbers here are correct. | *These ~ This ~ That | Cerca y plural → these.
C: Three ___ are hiring analysts. | companys ~ *companies ~ company | Consonante + y → ies.
F: She is ___ accountant. | an | "accountant" empieza con vocal → an.
F: I have ___ question. | a | "question" empieza con consonante → a.
F: Can I see ___ (estos) reports? | these | Cerca y plural → these.
F: Who is ___ (aquella) woman? | that | Lejos y singular → that.
F: I have two ___ (box). | boxes | Termina en x → + es.
F: The ___ (child) are at school. | children | Plural irregular: child → children.
F: We have five ___ (analyst) on the team. | analysts | Plural regular → + s.
F: There are three ___ (city) in the report. | cities | Consonante + y → ies.
F: He is ___ honest person. | an | En "honest" la h no suena → an.
F: ___ (Este) is my desk. | This | Cerca y singular → this.
O: I am a data analyst. | La profesión lleva "a".
O: This is an important email. | "an" porque "important" empieza con vocal.
O: Those people are my coworkers. | Those + plural.
O: These reports are ready. | These + plural + are.
O: She is an excellent manager. | "an" + excellent.
O: That is a big company. | That + is + a.
T: Escribe en plural | This is a file. | These are files. | This → these, is → are, a file → files.
T: Escribe en plural | That is a big company. | Those are big companies. | That → those, company → companies.
T: Escribe en singular | These are my reports. | This is my report. | These → this, are → is.
T: Escribe en plural | He is a man. | They are men. | He → they, man → men.
T: Completa con a o an | I am ___ analyst. | I am an analyst. ~ I'm an analyst. | analyst empieza con vocal.
T: Escribe en plural | This is a box. | These are boxes. | box → boxes.
E: I am data analyst. | I am a data analyst. ~ I'm a data analyst. | La profesión lleva artículo: a data analyst.
E: She is a engineer. | She is an engineer. ~ She's an engineer. | "engineer" empieza con vocal → an.
E: This files are new. | These files are new. | Plural → these.
E: I have three childs. | I have three children. | Plural irregular: children.
E: Those is my laptop. | That is my laptop. ~ That's my laptop. | Singular → that is.
E: He works for an university. | He works for a university. | "university" suena "yu": a university.`,
  },
  {
    id: 'g04',
    level: 'A1',
    title: 'Present simple (affirmative)',
    titleEs: 'Presente simple: afirmativo',
    theory: `Úsalo para **rutinas, hechos y trabajo habitual**: *I work with data. She lives in Miami.*

Regla de oro: con **he / she / it** el verbo lleva **-s**.
- I work → She work**s**
- watch, fix, go, do → watch**es**, fix**es**, go**es**, do**es**
- study → stud**ies** (consonante + y)
- have → **has**

Con I, you, we, they el verbo no cambia: *They analyze sales data.*`,
    items: `
C: She ___ in a bank. | work ~ *works ~ working | Con "she" el verbo lleva -s.
C: I ___ SQL every day. | uses ~ *use ~ using | Con "I" el verbo no cambia.
C: My manager ___ two meetings on Mondays. | have ~ *has ~ haves | Con he/she/it, "have" cambia a "has".
C: They ___ the data every morning. | checks ~ *check ~ checking | Con "they" el verbo no cambia.
C: He ___ the reports on Fridays. | send ~ *sends ~ sending | Con "he": send → sends.
C: The dashboard ___ the sales by region. | show ~ *shows ~ showing | "The dashboard" = it → shows.
C: Ana ___ Python at night. | study ~ *studies ~ studys | Consonante + y → ies.
C: We ___ in the same team. | works ~ *work ~ is work | Con "we" el verbo no cambia y no lleva "is".
C: My brother ___ to the gym after work. | go ~ *goes ~ gos | go → goes.
C: The meeting ___ at 9 a.m. | start ~ *starts ~ is start | "The meeting" = it → starts.
C: You ___ very fast. | learns ~ *learn ~ learning | Con "you" el verbo no cambia.
C: She ___ the bugs in the code. | fixs ~ *fixes ~ fix | Termina en x → + es.
F: She ___ (work) from home on Fridays. | works | he/she/it + s.
F: I ___ (clean) the data before the analysis. | clean | Con "I" no cambia.
F: He ___ (have) a big project. | has | have → has.
F: The company ___ (sell) software. | sells | "The company" = it → sells.
F: We ___ (use) Power BI for our dashboards. | use | Con "we" no cambia.
F: My boss ___ (watch) the numbers closely. | watches | Termina en ch → + es.
F: Laura ___ (do) the weekly report. | does | do → does.
F: They ___ (live) in Lima. | live | Con "they" no cambia.
F: The app ___ (update) every night. | updates | it → updates.
F: Carlos ___ (study) English every day. | studies | Consonante + y → ies.
O: I work with Excel every day. | Sujeto + verbo + complemento + frecuencia.
O: She checks the dashboard every morning. | she + checks.
O: The report shows the monthly sales. | it + shows.
O: My team meets on Mondays. | team (it) + meets.
O: He has a meeting at ten. | he + has.
O: We analyze customer data. | we + analyze.
T: Cambia el sujeto a "She" | I work in a bank. | She works in a bank. | she → works.
T: Cambia el sujeto a "He" | I have a new job. | He has a new job. | have → has.
T: Cambia el sujeto a "My manager" | We go to the office on Tuesdays. | My manager goes to the office on Tuesdays. | go → goes.
T: Cambia el sujeto a "They" | She studies SQL. | They study SQL. | Con they: study.
T: Cambia el sujeto a "It" | The reports show the results. | It shows the results. | it → shows.
T: Cambia el sujeto a "Ana" | I fix the errors. | Ana fixes the errors. | fix → fixes.
E: She work in a big company. | She works in a big company. | Con she el verbo lleva -s.
E: He have two monitors. | He has two monitors. | have → has.
E: I works with data. | I work with data. | Con "I" el verbo no lleva -s.
E: The dashboard update every hour. | The dashboard updates every hour. | it → updates.
E: My manager studys statistics. | My manager studies statistics. | study → studies.
E: They goes to the meeting. | They go to the meeting. | Con they el verbo no cambia.`,
  },
  {
    id: 'g05',
    level: 'A1',
    title: 'Present simple (negative and questions)',
    titleEs: 'Presente simple: negativo y preguntas (do / does)',
    theory: `Para negar y preguntar usamos el auxiliar **do / does** y el verbo vuelve a su forma base.

**Negativo**: I/you/we/they **don't** work · he/she/it **doesn't** work (¡sin -s!).
**Pregunta**: **Do** you work…? · **Does** she work…?
**Respuestas cortas**: Yes, I do. / No, she doesn't.

Error típico: *She doesn't works* ✗ → **She doesn't work** ✓. La -s ya está en "does".
Con preguntas abiertas: *Where do you work? What does she do?*`,
    items: `
C: I ___ like long meetings. | doesn't ~ *don't ~ not | Con I se usa don't.
C: She ___ work on weekends. | don't ~ *doesn't ~ isn't | Con she se usa doesn't.
C: ___ you use Excel at work? | Does ~ *Do ~ Are | Con you la pregunta empieza con Do.
C: ___ he speak English? | Do ~ *Does ~ Is | Con he se usa Does.
C: Where ___ your manager live? | do ~ *does ~ is | "Your manager" = he/she → does.
C: He doesn't ___ Python. | knows ~ *know ~ knowing | Después de doesn't el verbo va en forma base.
C: Does she ___ the report on Fridays? | sends ~ *send ~ sending | Después de does el verbo va en forma base.
C: What ___ you do? | does ~ *do ~ are | Con you: What do you do?
C: They ___ have a dashboard yet. | doesn't ~ *don't ~ aren't | Con they se usa don't.
C: Do you work with SQL? — Yes, I ___. | am ~ *do ~ work | Respuesta corta: Yes, I do.
C: Does the app work offline? — No, it ___. | don't ~ *doesn't ~ isn't | Respuesta corta con it: No, it doesn't.
C: How often ___ the data update? | do ~ *does ~ is | "The data" (it) → does.
F: I ___ (not / work) on Sundays. | don't work ~ do not work | Negativo con I: don't + verbo.
F: She ___ (not / like) coffee. | doesn't like ~ does not like | Negativo con she: doesn't + verbo base.
F: ___ you speak Spanish? | do | Pregunta con you → Do.
F: ___ he work in finance? | does | Pregunta con he → Does.
F: What time ___ the meeting start? | does | "The meeting" = it → does.
F: We ___ (not / use) Tableau. | don't use ~ do not use | Negativo con we: don't.
F: Where ___ you live? | do | Pregunta abierta con you → do.
F: My boss ___ (not / answer) emails at night. | doesn't answer ~ does not answer | doesn't + forma base.
F: ___ they need the file today? | do | Pregunta con they → Do.
F: Does she work here? — Yes, she ___. | does | Respuesta corta afirmativa: Yes, she does.
O: I don't work on weekends. | Sujeto + don't + verbo.
O: Does she use Power BI? | Does + sujeto + verbo base.
O: Where do you work? | Palabra de pregunta + do + sujeto + verbo.
O: He doesn't have the file. | doesn't + have (no "has").
O: What does your company do? | What + does + sujeto + do.
O: Do they need help? | Do + they + verbo.
T: Escribe en negativo | She works on Saturdays. | She doesn't work on Saturdays. ~ She does not work on Saturdays. | doesn't + work (sin -s).
T: Escribe en negativo | I like this tool. | I don't like this tool. ~ I do not like this tool. | don't + like.
T: Escribe la pregunta | You use SQL. | Do you use SQL? | Do + you + use.
T: Escribe la pregunta | He has a meeting today. | Does he have a meeting today? | Does + he + have (no "has").
T: Escribe en negativo | The report shows the costs. | The report doesn't show the costs. ~ The report does not show the costs. | doesn't + show.
T: Escribe la pregunta | They live in Lima. | Do they live in Lima? | Do + they + live.
E: She don't like Excel. | She doesn't like Excel. ~ She does not like Excel. | Con she se usa doesn't.
E: He doesn't works here. | He doesn't work here. ~ He does not work here. | Después de doesn't el verbo no lleva -s.
E: Do she speak English? | Does she speak English? | Con she se usa Does.
E: Where you work? | Where do you work? | Falta el auxiliar "do".
E: I no understand. | I don't understand. ~ I do not understand. | El negativo se hace con don't, no con "no".
E: Does he has a car? | Does he have a car? | Después de does: have (no "has").`,
  },
  {
    id: 'g06',
    level: 'A1',
    title: 'Adverbs of frequency and time expressions',
    titleEs: 'Adverbios de frecuencia y expresiones de tiempo',
    theory: `Dicen **cada cuánto** haces algo:
**always** (100%) → **usually** → **often** → **sometimes** → **rarely** → **never** (0%)

**Posición**:
- **Antes** del verbo normal: *I **usually** check the data at 9.*
- **Después** de "to be": *She is **always** on time.*
- Con negativos/preguntas: *I don't **usually** work late. Do you **often** use SQL?*

Expresiones al final de la frase: **every day, every week, once a week, twice a month, on Mondays, in the morning, at night**.
Pregunta: **How often** do you…?`,
    items: `
C: I ___ check my email in the morning. | *always ~ always am ~ am always | El adverbio va antes del verbo normal.
C: She is ___ late for meetings. | *never ~ never is ~ is never | Con "to be" el adverbio va después: She is never late.
C: ___ do you use Power BI? | How much ~ *How often ~ How many | Para preguntar frecuencia: How often.
C: I go to the office ___. | twice week ~ *twice a week ~ two times week | Se dice "twice a week" (dos veces por semana).
C: He works ___ Mondays. | in ~ at ~ *on | Días de la semana con "on".
C: I study English ___ the evening. | on ~ *in ~ at | Partes del día: in the morning/afternoon/evening.
C: I study ___ night. | in ~ on ~ *at | Excepción: at night.
C: They ___ work on Sundays. (0%) | sometimes ~ always ~ *never | 0% = never.
C: I ___ drink coffee at work. (50%) | never ~ *sometimes ~ always | Más o menos la mitad del tiempo = sometimes.
C: We have a meeting ___. | every days ~ *every day ~ all day | "Every" va con singular: every day.
C: Do you ___ work late? | usually do ~ *usually ~ are usually | En preguntas: Do you usually work…?
C: The report is ___ ready on Fridays. | *usually ~ usual ~ usually is | Después de "is": is usually ready.
F: I ___ (siempre) start with a SQL query. | always | always = siempre.
F: She ___ (nunca) works on weekends. | never | never = nunca.
F: We ___ (normalmente) have lunch at 1 p.m. | usually | usually = normalmente.
F: ___ often do you go to the gym? | how | How often = ¿con qué frecuencia?
F: I update the dashboard once ___ week. | a | once a week = una vez por semana.
F: He is ___ (a menudo) busy on Mondays. | often | often = a menudo.
F: I call my mom ___ Sundays. | on | Días con "on".
F: They ___ (a veces) work from home. | sometimes | sometimes = a veces.
F: I read the news ___ the morning. | in | in the morning.
F: My manager ___ (rara vez) sends emails at night. | rarely ~ seldom | rarely = rara vez.
O: I always check the data first. | always antes del verbo.
O: She is never late. | never después de is.
O: How often do you use SQL? | How often + do + you + verbo.
O: We usually meet on Mondays. | usually antes de meet.
O: I study English every day. | Expresión de tiempo al final.
O: He sometimes works at night. | sometimes antes del verbo.
T: Agrega "always" en la posición correcta | I check the numbers. | I always check the numbers. | Antes del verbo normal.
T: Agrega "usually" en la posición correcta | She is busy. | She is usually busy. ~ She's usually busy. | Después de "is".
T: Agrega "never" en la posición correcta | They work on Sundays. | They never work on Sundays. | Antes del verbo.
T: Escribe la pregunta con How often | You go to the office. | How often do you go to the office? | How often + do + you + go.
T: Agrega "often" en la posición correcta | We are tired on Fridays. | We are often tired on Fridays. ~ We're often tired on Fridays. | Después de "are".
T: Agrega "sometimes" en la posición correcta | He works late. | He sometimes works late. | Antes del verbo.
E: I check always my email. | I always check my email. | El adverbio va antes del verbo.
E: She never is late. | She is never late. ~ She's never late. | Con "to be" el adverbio va después.
E: I go to the gym twice in a week. | I go to the gym twice a week. | Se dice "twice a week", sin "in".
E: We meet in Mondays. | We meet on Mondays. | Días de la semana con "on".
E: How often you go to the office? | How often do you go to the office? | Falta el auxiliar: How often do you…?
E: I study in the night. | I study at night. | Se dice "at night".`,
  },
]
