/* ТЕМА: Предлоги места и времени: in / on / at (+ work for / at / on / as). Формат вопросов описан в articles-1.js.
   Метки [in] [on] [at] [for] [—] раскрашиваются. Варианты ответа = ключи w. */
const ex = rows => '<table class="ex">' + rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') + '</table>';
const Z = '—';

export default {
id: 'prepositions-1', level: 'A1', group: 'Предлоги и связки',
title: 'Предлоги места и времени: in / on / at',
desc: 'Когда in, когда on, когда at, и где предлог не нужен',
modules: [

/* ============ 1 ============ */
{ id:'time', title:'Время: at, on, in', desc:'Часы, дни, месяцы и слова без предлога',
theory: `
<p>Русское «в» переводится тремя разными словами. Выбор зависит от того, <b>какой длины отрезок времени</b>.</p>
${ex([
 ['[at] + точка','[at] seven, [at] 8:30, [at] noon, [at] night'],
 ['[on] + один день','[on] Monday, [on] Mondays, [on] 5 May, [on] my birthday, [on] Friday evening'],
 ['[in] + больше дня или часть дня','[in] May, [in] 2027, [in] winter, [in] the morning, [in] the evening'],
 ['[—] перед every / last / next / this','[—] every day, [—] last week, [—] next Monday, [—] this morning'],
 ['[—] перед today / tomorrow / yesterday','I\'m free [—] tomorrow.'],
])}
<h2>Алгоритм</h2>
<div class="rule"><ol class="alg">
<li><b>Есть every, last, next, this, today, tomorrow?</b> Да → предлога нет.</li>
<li><b>Время на часах или night?</b> → [at].</li>
<li><b>Один день: день недели, дата, праздник-день?</b> → [on].</li>
<li><b>Месяц, год, время года, часть дня?</b> → [in].</li>
</ol></div>
<div class="trap"><b>Ловушки.</b> [in] the morning, но [on] Monday morning: как только назван день, побеждает [on].<br>
[in] the evening, но [at] night. Это надо просто запомнить.<br>
Выходные: американцы говорят [on] weekends / [on] the weekend, британцы [at] the weekend. Mr. X американец. Но <s>on a weekend</s> никто не говорит: либо weekends (каждые), либо the weekend (эти).</div>`,
questions: [
{q:'I get up ___ seven.',a:'at',ru:'Я встаю в семь.',w:{
 at:'Время на часах = точка → [at].',
 on:'[on] для одного дня: [on] Monday. Seven это час, а не день.',
 in:'[in] для длинных отрезков: [in] May, [in] the morning. Час это точка.'}},
{q:'The shop is closed ___ Sundays.',a:'on',ru:'По воскресеньям магазин закрыт.',w:{
 at:'[at] для точки на часах. Воскресенье это целый день.',
 on:'День недели → [on]. Sundays с -s = «по воскресеньям», каждое.',
 in:'[in] для месяцев и лет. День недели всегда с [on].'}},
{q:'My birthday is ___ April.',a:'in',ru:'Мой день рождения в апреле.',w:{
 at:'Апрель не точка на часах, а целый месяц.',
 on:'[on] нужен, если назвать день: [on] 12 April. Просто месяц идёт с другим предлогом.',
 in:'Месяц длиннее дня → [in].'}},
{q:'She usually reads ___ the evening.',a:'in',ru:'Обычно она читает вечером.',w:{
 at:'[at] бывает с night: [at] night. А с evening нет.',
 on:'[on] появится, только если назвать день: [on] Friday evening.',
 in:'Часть дня → [in] the morning, [in] the afternoon, [in] the evening.'}},
{q:'The city is very quiet ___ night.',a:'at',ru:'Ночью город очень тихий.',w:{
 at:'Готовая фраза: [at] night, без артикля.',
 on:'[on] для одного дня, а night не день недели.',
 in:'Логично по аналогии с in the evening, но ночь исключение: [at] night.'}},
{q:'See you ___ Friday!',a:'on',ru:'Увидимся в пятницу!',w:{
 at:'Пятница не точка на часах.',
 on:'День недели → [on].',
 in:'[in] для месяцев и лет. По-русски «в пятницу», но это день → [on].'}},
{q:'I go to the gym ___ every day.',a:Z,ru:'Я хожу в зал каждый день.',w:{
 on:'Перед every предлог не ставят: «every» уже отвечает на вопрос «когда».',
 in:'Every day работает как готовое «когда». Предлог лишний.',
 [Z]:'Every / last / next / this → предлога нет.'}},
{q:'We have a meeting ___ Monday morning.',a:'on',ru:'У нас встреча в понедельник утром.',w:{
 at:'Morning не точка на часах.',
 on:'Как только назван день (Monday), побеждает [on], даже если дальше morning.',
 in:'[in] the morning без дня. С днём недели: [on] Monday morning.'}},
{q:'It is very cold here ___ winter.',a:'in',ru:'Зимой здесь очень холодно.',w:{
 at:'Зима длится месяцы, это не точка.',
 on:'[on] только для одного дня.',
 in:'Время года → [in] winter, [in] summer.'}},
{q:'I\'m very busy ___ this week.',a:Z,ru:'На этой неделе я очень занят.',w:{
 on:'Перед this предлог не нужен.',
 in:'По-русски «на этой неделе», но this уже отвечает «когда».',
 [Z]:'This / last / next + week → без предлога.'}},
{q:'The film starts ___ 8:30.',a:'at',ru:'Фильм начинается в 8:30.',w:{
 at:'Время на часах → [at].',
 on:'[on] для дня.',
 in:'[in] 8:30 нельзя. [in] + время значит «через»: [in] ten minutes = через десять минут.'}},
{q:'My exam is ___ 12 December.',a:'on',ru:'Мой экзамен 12 декабря.',w:{
 at:'Дата это целый день, не точка на часах.',
 on:'Дата = один день → [on].',
 in:'[in] December без числа. С числом это один день → [on].'}},
{q:'Do you work ___ weekends?',hint:'Американский английский, как у Mr. X.',a:'on',ru:'Ты работаешь по выходным?',w:{
 on:'В американском [on] weekends (каждые выходные) или [on] the weekend.',
 in:'[in] для месяцев и лет. Выходные так не говорят.',
 at:'Так говорят в Британии: [at] weekends, [at] the weekend. У нас американский вариант.'}},
{q:'Найди предложение БЕЗ ошибки.',a:'I\'m free tomorrow.',w:{
 'I\'m free tomorrow.':'Перед tomorrow, today, yesterday предлога нет.',
 'I\'m free on tomorrow.':'Tomorrow сам отвечает «когда». [on] лишний.',
 'I\'m free in tomorrow.':'Tomorrow, today, yesterday всегда без предлога.'}},
]},

/* ============ 2 ============ */
{ id:'place', title:'Место: in, on, at', desc:'Внутри, на поверхности, в точке',
theory: `
<p>Для места те же три слова, но вопрос другой: <b>как предмет связан с местом?</b></p>
${ex([
 ['[in] = внутри, со всех сторон границы','[in] the bag, [in] the room, [in] the park, [in] Berlin, [in] Germany, [in] the car'],
 ['[on] = на поверхности или линии','[on] the table, [on] the wall, [on] the floor, [on] the third floor, [on] page 5, [on] the screen'],
 ['[at] = точка, место, где что-то делают','[at] home, [at] work, [at] school, [at] the bus stop, [at] the door, [at] a party, [at] the gym'],
])}
<h2>Алгоритм</h2>
<div class="rule"><ol class="alg">
<li><b>Предмет внутри чего-то: сумки, комнаты, города, страны?</b> → [in].</li>
<li><b>Лежит, висит или стоит на поверхности: стол, стена, пол, экран, этаж?</b> → [on].</li>
<li><b>Место как точка на карте, куда приходят что-то делать: дом, работа, вокзал, вечеринка?</b> → [at].</li>
</ol></div>
<div class="trap"><b>Русское «на» не равно on.</b> На работе = [at] work. На заводе = [at] a factory. На вокзале = [at] the station. На вечеринке = [at] a party. Здесь нет поверхности, это места-точки.<br>
<b>Транспорт.</b> [in] a car, [in] a taxi (маленькое, сидишь внутри). Но [on] a bus, [on] a train, [on] a plane (большое, можно ходить).</div>`,
questions: [
{q:'My phone is ___ my bag.',a:'in',ru:'Мой телефон в сумке.',w:{
 in:'Телефон внутри сумки, со всех сторон стенки → [in].',
 on:'[on] my bag = лежит сверху на сумке.',
 at:'[at] для мест-точек, куда приходят: [at] home. Сумка это вместилище.'}},
{q:'There is a picture ___ the wall.',a:'on',ru:'На стене картина.',w:{
 in:'[in] the wall = внутри стены, как кабель.',
 on:'Картина висит на поверхности → [on].',
 at:'[at] the wall = «возле стены», стоять у стены. Картина на ней.'}},
{q:'I\'m ___ home right now.',a:'at',ru:'Я сейчас дома.',w:{
 in:'[in] the house возможно (внутри здания), но «дома» = готовая фраза [at] home.',
 on:'«Дома» никогда не on.',
 at:'Дом как место, где ты живёшь → [at] home, без артикля.'}},
{q:'She lives ___ Berlin.',a:'in',ru:'Она живёт в Берлине.',w:{
 in:'Город это пространство с границами → [in].',
 on:'Город не поверхность.',
 at:'[at] для точки внутри города: [at] the station. Сам город → [in].'}},
{q:'Wait for me ___ the bus stop.',a:'at',ru:'Подожди меня на остановке.',w:{
 in:'Остановка не помещение, внутрь не зайдёшь.',
 on:'По-русски «на остановке», но поверхности здесь нет.',
 at:'Остановка = точка, куда приходят → [at].'}},
{q:'Your keys are ___ the table.',a:'on',ru:'Твои ключи на столе.',w:{
 in:'[in] the table = внутри стола, например в ящике. Тогда говорят [in] the drawer.',
 on:'Лежат на поверхности → [on].',
 at:'[at] the table = сидеть за столом. Ключи лежат на нём.'}},
{q:'I live ___ the third floor.',a:'on',ru:'Я живу на третьем этаже.',w:{
 in:'Этаж в английском как поверхность, по которой ходишь.',
 on:'Этаж → [on] the third floor.',
 at:'[at] не говорят с этажом.'}},
{q:'We are ___ the bus now.',a:'on',ru:'Мы сейчас в автобусе.',w:{
 in:'По-русски «в автобусе», и для машины верно: [in] a car. Но автобус большой, по нему ходят.',
 on:'Большой транспорт → [on] the bus, [on] the train, [on] the plane.',
 at:'[at] the bus stop = на остановке. Мы уже внутри.'}},
{q:'Is your mom ___ work today?',a:'at',ru:'Твоя мама сегодня на работе?',w:{
 in:'[in] work не говорят.',
 on:'Русское «на работе», но здесь нет поверхности. <s>on work</s> частая ошибка.',
 at:'Работа как место, куда приходят → [at] work.'}},
{q:'There is a mistake ___ page 10.',a:'on',ru:'На десятой странице ошибка.',w:{
 in:'[in] the book (внутри книги), но страница это поверхность.',
 on:'Страница = поверхность → [on] page 10.',
 at:'С page [at] не бывает.'}},
{q:'My brother is ___ a party tonight.',a:'at',ru:'Сегодня вечером мой брат на вечеринке.',w:{
 in:'Вечеринка это событие, а не помещение.',
 on:'Поверхности нет. Русское «на» обманывает.',
 at:'Событие, куда приходят люди → [at] a party, [at] a concert, [at] a meeting.'}},
{q:'There are many old trees ___ the park.',a:'in',ru:'В парке много старых деревьев.',w:{
 in:'У парка есть границы, деревья внутри → [in].',
 on:'Парк не поверхность.',
 at:'[at] the park возможно, когда парк = точка встречи («встретимся у парка»). Деревья растут внутри.'}},
{q:'Найди предложение С ОШИБКОЙ.',a:'I am on work now.',w:{
 'I am on work now.':'Ошибка: «на работе» = [at] work.',
 'I am at work now.':'Верно: работа = место-точка.',
 'My bag is on the chair.':'Верно: сумка на поверхности стула.'}},
]},

/* ============ 3 ============ */
{ id:'work', title:'Работа и места: for, at, on, as', desc:'work for / at / on / as, go to the gym, go home',
theory: `
<p>Про работу русское «работать в / на / над» переводится по-разному. Смотри не на русский предлог, а на то, <b>что стоит после глагола</b>.</p>
${ex([
 ['work [for] + работодатель','I work [for] an IT company. He works [for] Siemens. She works [for] my uncle.'],
 ['work [at] + место','He works [at] a factory. She works [at] a bank. I work [at] home.'],
 ['work [in] + сфера или помещение','She works [in] IT. He works [in] an office. She works [in] a hospital.'],
 ['work [on] + проект, задача','I work [on] a new app. We are working [on] a workflow.'],
 ['work as + профессия','She works as a nurse. = She is a nurse.'],
])}
<div class="trap"><b>Ложный друг.</b> Fabric = ткань. Завод, фабрика = <b>factory</b>, или plant. <s>He works on a fabric</s> значит «он работает на ткани».</div>
<h2>Куда идёшь: go to + место</h2>
${ex([
 ['go to [—] work, [—] school, [—] bed, [—] university','слова из короткого списка: без артикля'],
 ['go to [the] gym, [the] shop, [the] cinema, [the] park, [the] doctor','всё остальное: с [the]'],
 ['go [—] home, go out','без to: home здесь значит «домой»'],
 ['after [—] work, after [—] school','«после работы» тоже без артикля'],
])}
<div class="rule"><b>Почему the gym, если в зал идут «по назначению»?</b> Правило «без артикля по назначению» работает только для короткого списка: home, work, school, university, college, bed, church, prison (+ hospital у британцев). Gym, shop, cinema, bank в него не входят. Порядок проверки: сначала «слово из списка?», и только потом «по назначению?».</div>`,
questions: [
{q:'My father works ___ a factory.',a:'at',ru:'Мой отец работает на заводе.',w:{
 at:'Завод = место, куда приходят работать → [at] a factory. Можно и [in] a factory.',
 on:'Русское «на заводе», но поверхности нет. <s>on a factory</s> не говорят.',
 for:'[for] + работодатель, компания по имени: [for] Siemens. Factory здесь место.'}},
{q:'My brother works ___ a small German company.',a:'for',ru:'Мой брат работает в маленькой немецкой компании.',w:{
 for:'Компания = работодатель, на кого ты работаешь → [for].',
 on:'[on] + проект: work [on] a project. Компания не проект.',
 as:'As + профессия: as an engineer. Компания не профессия.'}},
{q:'Erich works ___ a new project.',a:'on',ru:'Эрих работает над новым проектом.',w:{
 for:'[for] + работодатель. Проект не платит Эриху зарплату.',
 on:'Проект, задача → work [on]. «Работать над» = work on.',
 at:'[at] + место: [at] the office. Проект не место.'}},
{q:'He works ___ a taxi driver.',a:'as',ru:'Он работает таксистом.',w:{
 as:'Профессия, роль → work as. Или проще: He is a taxi driver.',
 like:'Like = «как, похоже на». He works like a taxi driver = «работает, как будто он таксист».',
 for:'[for] + работодатель. Taxi driver это его профессия.'}},
{q:'He goes to ___ gym three times a week.',a:'the',ru:'Он ходит в спортзал три раза в неделю.',w:{
 the:'Gym не входит в короткий список (home, work, school, bed…), поэтому [the].',
 [Z]:'Без артикля только go to work, go to school, go to bed. Gym не из списка.'}},
{q:'I go to ___ bed at midnight.',a:Z,ru:'Я ложусь спать в полночь.',w:{
 the:'[the] bed = кровать как мебель: sit on [the] bed. Ложиться спать: go to bed.',
 [Z]:'Bed из короткого списка, «по назначению» (спать) → без артикля.'}},
{q:'Let\'s meet after ___ work.',a:Z,ru:'Давай встретимся после работы.',w:{
 the:'After [the] work так не говорят. Work из короткого списка: after work.',
 [Z]:'After work, after school → без артикля.'}},
{q:'I\'m tired. I want to go ___ home.',a:Z,ru:'Я устал. Хочу домой.',w:{
 to:'<s>go to home</s>: home здесь уже значит «домой», to лишний. Сравни: go to work, но go home.',
 [Z]:'Go home, без to и без артикля.'}},
{q:'Her husband works ___ education.',a:'in',ru:'Её муж работает в сфере образования.',w:{
 in:'Education = сфера → work [in] education, как [in] IT, [in] marketing.',
 on:'[on] + проект. Образование это целая отрасль.',
 for:'[for] + конкретная организация: [for] a school. Сфера → [in].'}},
{q:'Do you work ___ home?',a:'at',ru:'Ты работаешь дома?',w:{
 at:'Дом = место → [at] home. Ещё говорят work from home: работать из дома, удалённо.',
 in:'[in] home не говорят. Можно [in] the house, но «дома» = [at] home.',
 on:'«Дома» с [on] не бывает.'}},
{q:'We have no milk. I need to go to ___ shop.',a:'the',ru:'У нас нет молока. Мне надо в магазин.',w:{
 the:'Shop не из короткого списка → [the]. Обычно имеют в виду «наш» магазин рядом.',
 [Z]:'Без артикля только home, work, school, bed и ещё несколько. Shop не из них.'}},
{q:'Найди предложение С ОШИБКОЙ.',a:'He works on a fabric.',w:{
 'He works on a fabric.':'Две ошибки: fabric = ткань (нужно factory) и on вместо at.',
 'He works at a factory.':'Верно: место → [at] a factory.',
 'He works for a big company.':'Верно: работодатель → [for].'}},
{q:'Найди предложение БЕЗ ошибки.',a:'She goes to the gym after work.',w:{
 'She goes to the gym after work.':'Gym не из списка → [the]. After work → без артикля.',
 'She goes to gym after the work.':'Наоборот: нужно to [the] gym и after [—] work.',
 'She goes to the gym after the work.':'Gym верно, но after work без артикля.'}},
]},

]};
