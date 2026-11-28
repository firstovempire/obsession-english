/* 28 ноября 2026. Источник ошибок: отчёт за 27.11.2026 (перевод, письмо Mr. X, говорение) + вопрос про the gym и предлоги */
export default {
type: 'regular',
id: '2026-11-28', date: '2026-11-28',
related: ['prepositions-1/time', 'prepositions-1/place', 'prepositions-1/work', 'articles-1/fixed'],
title: 'Где и когда',
focus: 'in / on / at · work for / at / on · the gym, но at work',

warmup: [
{ru:'Какой твой любимый фильм?', a:["What's your favorite film?", "What is your favorite film?", "What's your favorite movie?", "What is your favorite movie?", "What's your favourite film?", "What is your favourite film?", "What's your favourite movie?", "What is your favourite movie?"], topic:'to-be/neg-q', note:'Вчера: «what your favorite game?». Без is вопроса нет: What\'s = What is.'},
{ru:'Мой друг работает в IT-компании.', a:['My friend works for an IT company.', 'My friend works at an IT company.', 'My friend works in an IT company.'], topic:'articles-1/a-use', note:'Вчера: «works for IT company». For ты запомнил, а an потерял. An IT company.'},
{ru:'Он любит играть на гитаре.', a:['He likes playing the guitar.', 'He likes to play the guitar.', 'He loves playing the guitar.', 'He loves to play the guitar.'], topic:'present-simple/s', note:'Вчера: «likes play». После like нужно -ing или to: likes playing / likes to play.'},
{ru:'Тяжело, но оно того стоит.', a:["It's hard, but it's worth it.", "It's hard but it's worth it.", "It is hard, but it is worth it.", "It's difficult, but it's worth it."], topic:'to-be/need', note:'Вчера: «it worth it». Worth не глагол, нужен is: it\'s worth it.'},
{ru:'Каждую ночь он гуляет один.', a:['He walks alone every night.', 'Every night he walks alone.', 'He goes for a walk alone every night.', 'Every night he goes for a walk alone.'], topic:'present-simple/s', note:'Вчера: «every day he is walking». Привычка = Present Simple: he walks.'}
],

review: `
<p><b>Итог вчера.</b> Тесты: 93–100%. Перевод с первой попытки: <b>3 из 12</b>. Позавчера было 4 из 10, то есть лучше не стало. Правило ты узнаёшь в тесте, а в своём предложении теряешь.</p>
<p>Отдельная беда: <b>6 опечаток в 17 предложениях</b> (quet, tou, engeener, interestig, inderstand, quclky). Твоё «Spealing quclky is hard for me» грамматически верное, я добавил этот вариант в ответы. Но засчитать его с такими буквами нельзя. С сегодняшнего дня перед Enter перечитывай предложение по буквам. Это 3 секунды.</p>
<p>И ещё: в отчёте «Минут всего: ?». Отмечай минуты в плане и жми «Закончить день», иначе прогресс по времени не виден.</p>
<div class="rule"><p class="mute">Твоё письмо:</p><p>My day is simple too. I get up at 3 pm, I know that is my mode brake, but I am restoring it. Then I drink a coffee and do work. Then learn English and read philosophy. I have a friend Erich. He works for IT company. He likes play the guitar and every day he is walking alone at night. Workflow is app for AI creators. workflow just helps to automate creation process. You just соединяешь nods and take result. I don't read Ligotti in english. And I agree with you about Sisyphus and leaning english. Did you play Gta 6? And what your favorite game? What your favorite fantastic world? may be it is darksoulls, god of war, marvel, the witcher, warhammer 40000?</p>
<p class="mute">Исправленная версия:</p><p><b>My day is simple too. I get up at 3 p.m. I know my sleep schedule is a mess, but I'm fixing it. Then I drink coffee and work. After that, I learn English and read philosophy. I have a friend, Erich. He works for an IT company. He likes playing the guitar, and every night he walks alone. Workflow is an app for AI creators. It helps to automate the creative process: you just connect nodes and get the result. I don't read Ligotti in English. And I agree with you about Sisyphus and learning English. Have you played GTA 6? What's your favorite game? And what's your favorite fantasy world? Maybe it's Dark Souls, God of War, Marvel, The Witcher or Warhammer 40,000?</b></p></div>
<div class="fix"><span><s>what your favorite game?</s> → <b>What's your favorite game?</b> · <s>I from Germany</s> → <b>I'm from Germany</b> · <s>it worth it</s> → <b>it's worth it</b></span><span class="mute"><b style="color:inherit">Главная ошибка дня, и она вернулась.</b> 26.11 ты её почти победил, а вчера потерял is три раза. В вопросе со словом what после него обязательно is / are: What's your name? What are your plans?</span></div>
<div class="fix"><span><s>works on fabric</s> → <b>works at a factory</b> · <s>work on a hospital</s> → <b>work in a hospital</b> · <s>on a weekend</s> → <b>on weekends</b></span><span class="mute">Ты переводишь русское «на» как on. Но on значит только «на поверхности». На заводе, на работе, на вокзале = <b>at</b>. Fabric это ткань, завод это factory. Разбираем ниже, это тема дня.</span></div>
<div class="fix"><span><s>my mode brake</s>, <s>my mood crashed</s> → <b>my sleep schedule is a mess</b> · <s>fantastic world</s> → <b>fantasy world</b> · <s>nods</s> → <b>nodes</b></span><span class="mute">Ложные друзья. Режим сна = sleep schedule (mode это режим у программы, mood это настроение, brake это тормоз). Fantastic = потрясающий, а жанр = fantasy. Nods = кивки.</span></div>
<div class="fix"><span><s>every day he is walking</s>, <s>he is usually walking</s> → <b>every night he walks</b>, <b>he usually walks</b> · <s>I'm writing new words</s> → <b>I write down new words</b></span><span class="mute">Если это привычка (every day, usually, always), нужен Present Simple: he walks. Форма is walking значит «прямо сейчас». Её ещё не проходили, поэтому пока не используй.</span></div>
<div class="fix"><span><s>he studies math and watch TV series</s> → <b>he studies math and watches TV series</b></span><span class="mute">Тот же урок, что позавчера: два действия через and, -s получают оба глагола.</span></div>
<div class="fix"><span><s>works for IT company</s> → <b>works for an IT company</b> · <s>Workflow is app</s> → <b>an app</b> · <s>automate creation process</s> → <b>the creative process</b> · <s>take result</s> → <b>get the result</b></span><span class="mute">Голое считаемое слово опять. Перед каждой вещью проверяй: a / an / the / my.</span></div>
<div class="fix"><span><s>but is interestig</s> → <b>but it's interesting</b> · <s>Then learn English</s> → <b>Then I learn English</b></span><span class="mute">Ровно та же ошибка, что в позавчерашнем переводе, тот же самый пример. У каждого глагола должно быть подлежащее.</span></div>
<div class="fix"><span><s>loudly places</s> → <b>loud / noisy places</b> · <s>change faster</s> → <b>change quickly</b> · <s>may be</s> → <b>maybe</b></span><span class="mute">Перед существительным ставится прилагательное (loud), а -ly описывает действие (speak loudly). Faster значит «быстрее». «Может быть» пишется одним словом: maybe.</span></div>
<div class="fix"><span><s>I walk for an IT company</s> → <b>I work for an IT company</b></span><span class="mute">Это диктовка услышала work как walk. Значит, ты их произносишь одинаково. Work: звук как в «бёрк», рот почти закрыт, без «о». Walk: «уоок», круглые губы. Задание в «Говорении».</span></div>
<div class="fix"><span><b>✓ I don't read Ligotti · He doesn't like · It's cold and I don't want to go out · She gets up … and goes to the gym · Reading Aristotle is… · And I go for a walk</b></span><span class="mute">Do / be ты вчера ни разу не перепутал: эта ошибка уходит. Действие как подлежащее (Reading…, Speaking…) тоже получилось оба раза. Вопросы ты задаёшь сам, это хорошо. Но вопрос «Does Plato…?» из задания ты пропустил, а свою мысль про Сизифа так и не написал.</span></div>`,

theory: `
<h2>Твой вопрос: почему «по назначению без the», но go to the gym?</h2>
<div class="rule">Ты прав, правило было написано слишком широко, я его исправил. «Без артикля по назначению» работает <b>только для короткого списка</b>: <b>home, work, school, university, bed, church, prison</b> (и hospital у британцев).<br>
Всё остальное идёт с <b>the</b>, даже если ты идёшь туда «по делу»: go to <b>the</b> gym, <b>the</b> shop, <b>the</b> cinema, <b>the</b> bank, <b>the</b> doctor.<br>
Порядок проверки: 1) слово из списка? Да → без артикля. 2) Нет → the.</div>
<table class="ex">
<tr><td>She goes to [—] work.</td><td>She goes to [the] gym.</td></tr>
<tr><td>after [—] work, at [—] school</td><td>at [the] gym, at [the] shop</td></tr>
<tr><td>go [—] home (без to!)</td><td>go to [the] park</td></tr>
</table>

<h2>Время: at → on → in</h2>
<p>Чем длиннее отрезок, тем «шире» предлог.</p>
<table class="ex">
<tr><td>[at] + точка</td><td>[at] seven, [at] 3 p.m., [at] night</td></tr>
<tr><td>[on] + один день</td><td>[on] Monday, [on] Mondays, [on] 5 May, [on] weekends (американский)</td></tr>
<tr><td>[in] + длиннее дня или часть дня</td><td>[in] May, [in] 2027, [in] winter, [in] the morning, [in] the evening</td></tr>
<tr><td>[—] предлога нет</td><td>every day, last week, next Monday, this morning, today, tomorrow</td></tr>
</table>
<div class="trap"><s>on a weekend</s> так не говорят: [on] weekends (каждые) или [on] the weekend (эти). И [in] the evening, но [at] night.</div>

<h2>Место: in → on → at</h2>
<table class="ex">
<tr><td>[in] = внутри</td><td>[in] the bag, [in] the room, [in] Berlin, [in] Germany, [in] a car</td></tr>
<tr><td>[on] = на поверхности</td><td>[on] the table, [on] the wall, [on] the floor, [on] the bus</td></tr>
<tr><td>[at] = точка, куда приходят что-то делать</td><td>[at] home, [at] work, [at] the bus stop, [at] a party, [at] the gym</td></tr>
</table>
<div class="trap"><b>Главная ловушка для русского: «на» ≠ on.</b> On только там, где есть поверхность. На работе = [at] work. На заводе = [at] a factory. На вокзале = [at] the station. На вечеринке = [at] a party.</div>

<h2>Работа: смотри, что стоит после work</h2>
<table class="ex">
<tr><td>work [for] + работодатель</td><td>I work [for] an IT company.</td></tr>
<tr><td>work [at] + место</td><td>My dad works [at] a factory. I work [at] home.</td></tr>
<tr><td>work [in] + сфера или помещение</td><td>She works [in] IT. He works [in] a hospital.</td></tr>
<tr><td>work [on] + проект</td><td>I work [on] a new workflow.</td></tr>
<tr><td>work as + профессия</td><td>She works as a nurse.</td></tr>
</table>
<p class="mute">Теперь проверка любого своего предложения состоит из 5 вопросов: 1) есть подлежащее? 2) есть глагол (is / are тоже глагол)? 3) he/she/it → -s? 4) у вещи есть a / the / my? 5) предлог: я перевёл русское «на» или подумал, что это: поверхность, точка или внутри?</p>`,

phrases: [
{en:'My sleep schedule is a mess.', ru:'У меня сбит режим сна.', note:'не mode, не mood'},
{en:"I'm trying to fix my sleep schedule.", ru:'Я пытаюсь наладить режим.'},
{en:'I work from home.', ru:'Я работаю из дома, удалённо.'},
{en:'He works at a factory.', ru:'Он работает на заводе.', note:'factory, не fabric (это ткань)'},
{en:'What do you do on weekends?', ru:'Что ты делаешь по выходным?'},
{en:'See you on Monday!', ru:'Увидимся в понедельник!'},
{en:"I'm at work right now.", ru:'Я сейчас на работе.', note:'at work, не on work'},
{en:'I go to the gym after work.', ru:'После работы я хожу в зал.', note:'the gym, но after work'},
{en:'in my free time', ru:'в свободное время'},
{en:"I'm into video games.", ru:'Я увлекаюсь видеоиграми.'},
{en:'Maybe.', ru:'Может быть.', note:'одним словом'},
{en:'What do you think about it?', ru:'Что ты об этом думаешь?'}
],

translate: [
{ru:'По понедельникам я работаю из дома.', a:['I work from home on Mondays.', 'On Mondays I work from home.', 'I work at home on Mondays.', 'On Mondays I work at home.', 'On Mondays, I work from home.', 'On Mondays, I work at home.'], note:'День недели → on Mondays. Дома → at home / from home.'},
{ru:'Мой дядя работает на заводе в Берлине.', a:['My uncle works at a factory in Berlin.', 'My uncle works in a factory in Berlin.'], note:'Завод = factory. Место → at, город → in.'},
{ru:'Встреча в пятницу в десять.', a:['The meeting is on Friday at ten.', 'The meeting is on Friday at 10.', 'The meeting is at ten on Friday.', 'The meeting is at 10 on Friday.', 'Our meeting is on Friday at ten.', 'The meeting is on Friday at ten o\'clock.'], note:'День → on, час → at. И не забудь is.'},
{ru:'Она медсестра, она работает в больнице.', a:["She's a nurse. She works in a hospital.", "She's a nurse, she works in a hospital.", "She's a nurse and she works in a hospital.", "She's a nurse. She works at a hospital.", "She's a nurse, she works at a hospital.", "She's a nurse and she works at a hospital.", "She is a nurse. She works in a hospital.", "She is a nurse, she works in a hospital.", "She is a nurse. She works at a hospital.", "She is a nurse, she works at a hospital."], note:'a nurse: профессия с a. In / at a hospital, только не on.'},
{ru:'Эрих работает над новым проектом.', a:['Erich works on a new project.', 'Erich is working on a new project.'], note:'«Работать над» = work on.'},
{ru:'По выходным я не работаю.', a:["I don't work on weekends.", "On weekends I don't work.", "I don't work at weekends.", "I don't work on the weekend.", "I don't work at the weekend.", "On weekends, I don't work."], note:'on weekends, не on a weekend.'},
{ru:'Ночью город очень тихий.', a:['The city is very quiet at night.', 'At night the city is very quiet.', 'At night, the city is very quiet.', 'The town is very quiet at night.', 'At night the town is very quiet.'], note:'at night. И is: город «есть» тихий.'},
{ru:'Ключи на столе, а телефон в сумке.', a:['The keys are on the table, and the phone is in the bag.', 'The keys are on the table and the phone is in the bag.', 'The keys are on the table, but the phone is in the bag.', 'The keys are on the table, and my phone is in my bag.', 'The keys are on the table and my phone is in my bag.', 'The keys are on the table, and the phone is in my bag.', 'My keys are on the table, and my phone is in my bag.', 'My keys are on the table and my phone is in my bag.'], note:'Поверхность → on, внутри → in. Keys are, phone is.'},
{ru:'Он ходит в спортзал после работы.', a:['He goes to the gym after work.', 'After work he goes to the gym.', 'After work, he goes to the gym.'], note:'the gym (не из списка), after work (из списка).'},
{ru:'Я живу в Германии, в маленьком городе.', a:['I live in Germany, in a small town.', 'I live in Germany in a small town.', 'I live in a small town in Germany.', 'I live in Germany, in a small city.', 'I live in a small city in Germany.'], note:'Страна и город → in. A small town.'},
{ru:'Я люблю читать по вечерам.', a:['I like reading in the evening.', 'I like to read in the evening.', 'I like reading in the evenings.', 'I like to read in the evenings.', 'I love reading in the evening.', 'I love to read in the evening.', 'I love reading in the evenings.', 'I love to read in the evenings.'], note:'like + -ing или to. In the evening(s).'},
{ru:'Мой день рождения в мае.', a:['My birthday is in May.'], note:'Месяц → in. И is.'}
],

letter: {
from: 'Mr. X',
text: `Hi!

Thank you for your letter. 3 p.m.? Wow! At that time I'm at work, and Plato is asleep on the history books. But I understand. A sleep schedule is like a garden: you fix it slowly, a little every day.

Your friend Erich sounds interesting. He works for an IT company, he plays the guitar, and he walks alone at night. Maybe he is a philosopher too! Many philosophers love long walks.

So in Workflow you connect nodes, and the program does the work? It sounds like LEGO for adults. I like that.

You ask about games. No, I don't play GTA 6. I don't play video games at all. I'm a book man! But I know The Witcher. It's a book first, by a Polish writer, Andrzej Sapkowski. I sell it in my shop, and young people often buy it. My favorite fantasy world is Middle-earth from The Lord of the Rings. I read it every winter, in December, in my chair by the window.

On Saturdays the shop is busy. On Sundays it is closed, and I stay at home with Plato.

What do you do on weekends? Where does Erich walk at night: in a park or in the city? And in Germany, do shops open on Sundays?

And you didn't say: is Sisyphus happy? What do you think?

Take care,
X`,
gloss: [['asleep','спит (is asleep = спит)'],['sleep schedule','режим сна'],['like a garden','как сад'],['a little every day','понемногу каждый день'],['sounds interesting','звучит интересно'],['the program does the work','программа делает работу'],['LEGO for adults','LEGO для взрослых'],['not … at all','совсем не'],['a book man','книжный человек'],['by a Polish writer','польского писателя (by = автор)'],['Middle-earth','Средиземье'],['by the window','у окна'],['busy','занятой; в магазине много людей'],['closed','закрыт'],['stay at home','оставаться дома']]
},

write: {
task: 'Ответь Mr. X. 1) Расскажи про свои выходные: что ты делаешь в субботу и в воскресенье, где и когда (минимум 3 предлога времени: at / on / in, и 3 предлога места). 2) Ответь, где гуляет Эрих и где он работает (work for / at / in). 3) Ответь про магазины в Германии по воскресеньям. 4) Ответь про Сизифа: счастлив он или нет и почему, 3 предложения: Sisyphus is… / He doesn\'t… / I think… because… 5) Спроси Mr. X про его магазин: один вопрос с Where…?, один с Does Plato…? (вчера ты этот вопрос пропустил). Всего 12–15 предложений. Перед отправкой проверь каждое предложение по 5 вопросам из теории и перечитай по буквам.',
words: ['on Saturdays', 'at night', 'in the morning', 'at home', 'at the gym', 'works for an', 'I think … because …', 'What do you think?']
},

speak: {
task: 'Сначала 2 минуты на произношение: work / walk. Скажи по 10 раз: I work. I walk. I work for an IT company. I go for a walk. Потом продиктуй через Win+H 5 раз: «I work for an IT company». Если диктовка хоть раз написала walk, повтори ещё 5 раз. Потом говори 2 минуты: «My week: where and when». Каждый день недели: где ты утром, днём и вечером.',
plan: ['Произношение: work («бёрк», без «о») ×10, walk («уоок», круглые губы) ×10', 'On Mondays I… At 3 p.m. I… In the evening I…', 'Где: I\'m at home… I\'m at the gym… I work from home…', 'On Saturdays… On Sundays… In Germany the shops…', 'Про Эриха: He works for… He walks in… at night.', 'Конец: What do you do on weekends?']
},

think: `
<div class="rule"><b>Привычка «GPS».</b> Сегодня 5 раз за день, когда меняешь место, скажи про себя, где ты и когда: <i>It's 4 p.m. I'm at home. I'm in my room. My phone is on the table.</i><br>
Каждый раз минимум одно in, одно on и одно at.</div>
<div class="rule"><b>Вопрос философу.</b> <i>Is Sisyphus happy?</i> Ты этот вопрос уже два раза обходишь стороной.<br>
4–6 предложений в голове, потом запиши: <i>I think Sisyphus is… because… Every day he… He doesn't… The stone is… Maybe…</i><br>
Одно предложение с <b>every day</b> (без предлога!), одно с <b>at night</b> или <b>in the morning</b>.</div>
<p class="mute">Запиши ответ в поле «Трудно / выписал», я проверю.</p>`
};
