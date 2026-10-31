// Fase 1 · Quincenas 4, 5 y 6
export const grammar3 = [
  {
    id: 'g11',
    level: 'A1',
    title: 'Can / can\'t and imperatives',
    titleEs: 'Habilidad y permiso con can / can\'t; imperativos',
    theory: `**Can** = poder / saber hacer. No cambia con ninguna persona y el verbo va en forma base:
*I can write SQL queries. She can speak English.* (no "she cans", no "can to speak")
Negativo: **can't** (cannot). Pregunta: **Can you** help me?

Para pedir algo con cortesía: **Can you…? / Could you…?** (más formal): *Could you repeat that, please?*

**Imperativo** = verbo base, sin sujeto: *Open the file. Check the numbers.*
Negativo: **Don't** + verbo: *Don't delete the column.*
Sugerencia en grupo: **Let's** + verbo: *Let's start the meeting.*`,
    items: `
C: I ___ write SQL queries. | can to ~ *can ~ cans | Después de "can" va el verbo base sin "to".
C: She ___ speak three languages. | cans ~ *can ~ can to | "Can" no cambia con she.
C: ___ you help me with this formula? | Do ~ *Can ~ Are | Pedir ayuda: Can you…?
C: I ___ open the file. It's broken. | don't can ~ *can't ~ not can | Negativo: can't.
C: ___ you repeat that, please? | *Could ~ Do ~ Are | Pedido cortés: Could you…?
C: ___ the door, please. | Opening ~ *Open ~ You open | Imperativo: verbo base sin sujeto.
C: ___ delete that column! | Not ~ *Don't ~ No | Imperativo negativo: Don't + verbo.
C: ___ start the meeting. Everyone is here. | Let ~ *Let's ~ Lets to | Sugerencia: Let's + verbo.
C: Can he ___ Power BI? | uses ~ *use ~ to use | Después de can: verbo base.
C: Can you speak English? — Yes, I ___. | do ~ *can ~ speak | Respuesta corta: Yes, I can.
C: Please ___ the report before Friday. | sending ~ *send ~ to send | Imperativo: verbo base.
C: We ___ finish today. We need more time. | *can't ~ don't can ~ can | No podemos → can't.
F: I ___ (poder) speak a little English. | can | can + verbo base.
F: She ___ (no poder) come to the meeting. | can't ~ cannot ~ can not | Negativo de can.
F: ___ you send me the file? | can ~ could | Pedido: Can/Could you…?
F: ___ (No) forget to save the file. | don't ~ do not | Imperativo negativo: Don't…
F: ___ (Hagamos) a short break. | let's ~ let us | Sugerencia: Let's.
F: Can she ___ (drive)? | drive | Después de can: verbo base.
F: ___ (Revisa) the numbers again. | check ~ review | Imperativo: verbo base.
F: Could you speak more ___, please? | slowly | Speak more slowly = hable más despacio.
F: Can they work on Saturday? — No, they ___. | can't ~ cannot | Respuesta corta negativa.
F: I ___ (poder) use Excel and SQL. | can | can.
O: Can you help me, please? | Can + you + verbo.
O: I can't open this file. | can't + verbo.
O: Could you repeat that, please? | Pedido cortés.
O: Don't send the email yet. | Don't + verbo.
O: Let's check the data together. | Let's + verbo.
O: She can write Python scripts. | can + verbo base.
T: Escribe en negativo | I can come tomorrow. | I can't come tomorrow. ~ I cannot come tomorrow. | can → can't.
T: Escribe la pregunta | You can share your screen. | Can you share your screen? | Can + you…
T: Haz el pedido más formal con Could | Can you send me the link? | Could you send me the link? | Could = más cortés.
T: Escribe en imperativo negativo | You close the file. | Don't close the file. ~ Do not close the file. | Don't + verbo.
T: Escribe una sugerencia con Let's | We start the meeting. | Let's start the meeting. | Let's + verbo.
T: Escribe la pregunta | She can speak English. | Can she speak English? | Can + she…
E: I can to speak English. | I can speak English. | Después de can no se usa "to".
E: She cans use Tableau. | She can use Tableau. | "Can" no lleva -s.
E: I don't can open the file. | I can't open the file. ~ I cannot open the file. | Negativo: can't.
E: Do you can help me? | Can you help me? ~ Could you help me? | La pregunta empieza con Can.
E: No touch the server. | Don't touch the server. ~ Do not touch the server. | Imperativo negativo: Don't.
E: Lets go to the meeting. | Let's go to the meeting. | Let's lleva apóstrofo (let us).`,
  },
  {
    id: 'g12',
    level: 'A2',
    title: 'Past simple: was / were and regular verbs',
    titleEs: 'Pasado simple: was/were y verbos regulares (-ed)',
    theory: `**Was / were** = pasado de "to be":
- I / he / she / it **was** · you / we / they **were**
- Negativo: wasn't, weren't · Pregunta: *Was it difficult? Were you at work?*

**Verbos regulares**: + **-ed** para todas las personas: *I worked, she worked, they worked.*
- Termina en e → + d: *update → updated*
- Consonante + y → ied: *study → studied*
- Una sílaba corta → dobla: *stop → stopped, plan → planned*

**Pronunciación de -ed** (muy importante):
- /t/ después de sonidos sordos: work**ed**, check**ed**, fix**ed**
- /d/ después de sonidos sonoros: clean**ed**, call**ed**, analyz**ed**
- /ɪd/ solo después de t o d: updat**ed**, add**ed**, start**ed**

Palabras clave: **yesterday, last week, last year, two days ago, in 2023**.`,
    items: `
C: I ___ at the office yesterday. | were ~ *was ~ am | I → was.
C: They ___ in the meeting last Monday. | was ~ *were ~ are | They → were.
C: ___ you at work yesterday? | Was ~ *Were ~ Did | You → Were.
C: The report ___ ready on time. | weren't ~ *wasn't ~ didn't | The report (it) → wasn't.
C: I ___ the data yesterday. | clean ~ *cleaned ~ cleaning | Pasado regular: + ed.
C: She ___ English last year. | studyed ~ *studied ~ studies | Consonante + y → ied.
C: We ___ the project two weeks ago. | start ~ *started ~ starting | Ago → pasado.
C: The server ___ at 3 p.m. | stoped ~ *stopped ~ stops | Una sílaba corta: stop → stopped.
C: In "updated", -ed sounds like… | /t/ ~ /d/ ~ */ɪd/ | Después de t o d suena /ɪd/.
C: In "worked", -ed sounds like… | */t/ ~ /d/ ~ /ɪd/ | Después de k (sonido sordo) suena /t/.
C: In "cleaned", -ed sounds like… | /t/ ~ */d/ ~ /ɪd/ | Después de n (sonido sonoro) suena /d/.
C: It ___ very cold last night. | were ~ *was ~ is | It → was.
F: I ___ (be) in Lima last week. | was | I → was.
F: The meetings ___ (be) very long yesterday. | were | Plural → were.
F: She ___ (call) the client yesterday. | called | call → called.
F: We ___ (analyze) the survey last month. | analyzed ~ analysed | analyze → analyzed.
F: He ___ (update) the dashboard on Friday. | updated | update → updated.
F: I ___ (not / be) at home. | wasn't ~ was not | Negativo: wasn't.
F: They ___ (not / be) happy with the results. | weren't ~ were not | Negativo plural: weren't.
F: ___ the file correct? | was | Pregunta singular → Was.
F: I ___ (plan) the project in January. | planned | plan → planned (doble n).
F: The client ___ (ask) for a new report. | asked | ask → asked.
O: I was at the office yesterday. | was + lugar + tiempo.
O: We worked on the report last week. | Verbo en pasado + last week.
O: Were you in the meeting? | Were + you…
O: She cleaned the data two days ago. | pasado + ago.
O: The results were very good. | were (plural).
O: He started his job in 2023. | started + in + año.
T: Escribe en pasado | I am tired. | I was tired. | am → was.
T: Escribe en pasado | They are in New York. | They were in New York. | are → were.
T: Escribe en pasado (yesterday) | I work from home. | I worked from home yesterday. ~ Yesterday I worked from home. ~ Yesterday, I worked from home. | work → worked, agrega yesterday.
T: Escribe en pasado | She studies statistics. | She studied statistics. | studies → studied.
T: Escribe la pregunta | You were at work. | Were you at work? | Invierte: Were you…
T: Escribe en negativo | The data was correct. | The data wasn't correct. ~ The data was not correct. | was → wasn't.
E: I were at home yesterday. | I was at home yesterday. | I → was.
E: They was in the office. | They were in the office. | They → were.
E: She studyed a lot. | She studied a lot. | study → studied.
E: We work on this project last year. | We worked on this project last year. | Last year → pasado: worked.
E: The meeting were long. | The meeting was long. | The meeting (it) → was.
E: He stoped the process. | He stopped the process. | stop → stopped (doble p).`,
  },
  {
    id: 'g13',
    level: 'A2',
    title: 'Past simple: irregular verbs, negatives and questions',
    titleEs: 'Pasado simple: irregulares, negativo y preguntas (did)',
    theory: `Muchos verbos frecuentes son **irregulares** y hay que memorizarlos:
go → **went** · have → **had** · do → **did** · make → **made** · get → **got** · see → **saw** · say → **said** · find → **found** · send → **sent** · take → **took** · write → **wrote** · come → **came** · give → **gave** · know → **knew** · think → **thought** · buy → **bought** · run → **ran** · meet → **met** · build → **built** · lose → **lost**

**Negativo**: **didn't** + verbo base: *I didn't find the error.* (no "didn't found")
**Pregunta**: **Did** + sujeto + verbo base: *Did you send the file? What did you do yesterday?*
Respuesta corta: *Yes, I did. / No, I didn't.*`,
    items: `
C: Yesterday I ___ to the office by bus. | goed ~ *went ~ go | go → went (irregular).
C: She ___ an error in the code. | finded ~ *found ~ find | find → found.
C: I ___ the report to my manager. | sended ~ *sent ~ send | send → sent.
C: We ___ a meeting with the client. | haved ~ *had ~ has | have → had.
C: I didn't ___ the email. | saw ~ *see ~ seen | Después de didn't: verbo base.
C: ___ you finish the dashboard? | Were ~ *Did ~ Do | Pregunta en pasado: Did.
C: What did you ___ last weekend? | did ~ *do ~ done | Después de did: verbo base.
C: He ___ a new dashboard last week. | builded ~ *built ~ build | build → built.
C: Did she call you? — No, she ___. | wasn't ~ *didn't ~ doesn't | Respuesta corta: No, she didn't.
C: I ___ that the numbers were wrong. | thinked ~ *thought ~ think | think → thought.
C: They ___ the client in New York. | meeted ~ *met ~ meet | meet → met.
C: She ___ a great presentation. | maked ~ *made ~ make | make → made.
F: I ___ (write) three emails yesterday. | wrote | write → wrote.
F: We ___ (get) good results last month. | got | get → got.
F: She ___ (not / come) to the meeting. | didn't come ~ did not come | didn't + verbo base.
F: ___ you see the new chart? | did | Pregunta en pasado: Did.
F: He ___ (take) the bus to work. | took | take → took.
F: I ___ (not / find) the file. | didn't find ~ did not find | didn't + find.
F: What ___ she say? | did | Pregunta: What did…?
F: They ___ (buy) a new server. | bought | buy → bought.
F: I ___ (know) the answer. | knew | know → knew.
F: My manager ___ (give) me good feedback. | gave | give → gave.
O: I went to the office yesterday. | went = pasado de go.
O: Did you send the report? | Did + sujeto + verbo base.
O: She didn't find the error. | didn't + verbo base.
O: What did you do last weekend? | What + did + you + do.
O: We had a meeting with the client. | had = pasado de have.
O: He wrote a SQL query. | wrote = pasado de write.
T: Escribe en pasado | I go to the gym. | I went to the gym. | go → went.
T: Escribe en negativo | She sent the email. | She didn't send the email. ~ She did not send the email. | didn't + send (base).
T: Escribe la pregunta | You saw the results. | Did you see the results? | Did + you + see.
T: Escribe en pasado | We have a problem. | We had a problem. | have → had.
T: Escribe la pregunta | He made a mistake. | Did he make a mistake? | Did + he + make.
T: Escribe en negativo | They found the bug. | They didn't find the bug. ~ They did not find the bug. | didn't + find.
E: I goed to work. | I went to work. | go → went.
E: She didn't sent the file. | She didn't send the file. ~ She did not send the file. | Después de didn't: verbo base.
E: Did you saw the email? | Did you see the email? | Después de did: verbo base.
E: What you did yesterday? | What did you do yesterday? | Pregunta: What + did + you + do.
E: He maked a dashboard. | He made a dashboard. | make → made.
E: We buyed a new laptop. | We bought a new laptop. | buy → bought.`,
  },
  {
    id: 'g14',
    level: 'A2',
    title: 'Future (going to / will), would like and should',
    titleEs: 'Futuro con going to y will; would like; should',
    theory: `**Going to** = planes ya decididos: *I'm going to present the results on Friday.*
**Will** = decisiones en el momento, promesas, predicciones: *I'll send it now. I think sales will grow.*
Negativo: *I'm not going to… / I won't…* · Pregunta: *Are you going to…? / Will you…?*

**Would like** = quisiera (cortés): *I'd like a coffee. Would you like to join the call?* (would like + **to** + verbo)

**Should** = consejo / recomendación: *You should check the data first. We shouldn't use this file.* (sin "to")

Standup diario: *Yesterday I **finished**… Today I'm **going to** work on… I'm **blocked by**…*`,
    items: `
C: Tomorrow I ___ present the results. | will to ~ *am going to ~ going | Plan decidido: am going to.
C: The phone is ringing. — I ___ answer it. | am going to ~ *'ll ~ will to | Decisión en el momento: I'll.
C: ___ you like a coffee? | Do ~ *Would ~ Will | Ofrecer: Would you like…?
C: I'd like ___ the meeting. | join ~ *to join ~ joining | would like + to + verbo.
C: You ___ check the data before the meeting. | should to ~ *should ~ shoulds | should + verbo base, sin "to".
C: We ___ finish today. We need more time. | aren't going ~ *aren't going to ~ don't going to | Negativo: aren't going to.
C: I think sales ___ increase next year. | *will ~ are ~ going | Predicción → will.
C: She ___ to call the client tomorrow. | will ~ *is going ~ going | She + is going to.
C: ___ you going to work on Saturday? | Do ~ *Are ~ Will | Pregunta: Are you going to…?
C: I promise I ___ send it today. | *will ~ am ~ going | Promesa → will.
C: You look tired. You ___ rest. | would ~ *should ~ will to | Consejo → should.
C: I ___ like to ask a question. | will ~ *would ~ should | Pedir con cortesía: I would like to…
F: I'm going ___ clean the data tomorrow. | to | going to + verbo.
F: She ___ (will / not) be at the meeting. | won't ~ will not | Negativo de will: won't.
F: ___ you like to see the dashboard? | would | Would you like to…?
F: You ___ (deberías) ask your manager. | should | Consejo → should.
F: We ___ going to launch the report next week. | are ~ 're | We + are going to.
F: I think it ___ rain today. | will | Predicción → will.
F: I'd like ___ (order) the salad, please. | to order | would like + to + verbo.
F: You ___ (no deberías) delete that file. | shouldn't ~ should not | Consejo negativo.
F: Today I'm going to ___ (work) on the sales dashboard. | work | going to + verbo base.
F: Don't worry, I ___ help you. | will ~ 'll | Ofrecimiento en el momento → will.
O: I am going to present the results. | am going to + verbo.
O: Would you like to join the call? | Would you like + to + verbo.
O: You should check the numbers again. | should + verbo base.
O: I will send it right now. | will + verbo.
O: We are not going to finish today. | are not going to.
O: Today I'm going to work on the dashboard. | Frase típica de standup.
T: Escribe con going to | I plan to visit my family next week. | I am going to visit my family next week. ~ I'm going to visit my family next week. | Plan → going to.
T: Escribe en negativo | I will be late. | I won't be late. ~ I will not be late. | will → won't.
T: Haz la pregunta | You are going to work tomorrow. | Are you going to work tomorrow? | Invierte: Are you…
T: Escribe como consejo con should | It's a good idea to test the query. | You should test the query. | Consejo → should.
T: Escribe de forma cortés con I'd like | I want a glass of water. | I'd like a glass of water. ~ I would like a glass of water. | want → would like.
T: Escribe en negativo | She is going to come. | She isn't going to come. ~ She is not going to come. ~ She's not going to come. | is not going to.
E: I will to send the file. | I will send the file. ~ I'll send the file. | Después de will no va "to".
E: You should to rest. | You should rest. | Después de should no va "to".
E: I'd like join the team. | I'd like to join the team. ~ I would like to join the team. | would like + to.
E: Tomorrow I going to call him. | Tomorrow I am going to call him. ~ Tomorrow I'm going to call him. | Falta "am".
E: Do you would like a coffee? | Would you like a coffee? | La pregunta empieza con Would.
E: She will sends the report. | She will send the report. | Después de will: verbo base.`,
  },
]
