/* ТЕМА: глагол to be (am / is / are). Формат вопросов описан в articles-1.js.
   Правило для тестов: предложения в вопросах НЕ совпадают с примерами из теории, они проверяют то же правило на новом материале. */
const ex = rows => '<table class="ex">' + rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') + '</table>';
const Z = '—';

export default {
id: 'to-be', level: 'A1', group: 'Основа предложения: глагол',
title: 'To be: am / is / are',
desc: 'Где по-русски прочерк, там в английском am / is / are',
modules: [

/* ============ 1 ============ */
{ id:'need', title:'Когда нужен am / is / are', desc:'Правило прочерка',
theory: `
<div class="rule"><b>Правило.</b> В английском предложении всегда есть глагол. Если по-русски глагола нет («я студент», «суп горячий»), ставим <b>am / is / are</b>.</div>
${ex([['Я — студент.','I <b>am</b> a student.'],['Суп — горячий.','The soup <b>is</b> hot.'],['Мы — в парке.','We <b>are</b> in the park.'],['Это — важно.','It <b>is</b> important.']])}
<h2>Метод прочерка</h2>
<p>Произнеси русское предложение и найди место, где можно поставить «—». Туда и встаёт am / is / are.</p>
<h2>Где прочерк есть, хотя по-русски его не видно</h2>
${ex([['Ему 30 лет.','He <b>is</b> 30. (возраст через be, а не через have)'],['Мне холодно.','I <b>am</b> cold. (не «me cold»)'],['Я боюсь.','I <b>am</b> afraid. (afraid это прилагательное, а не глагол)']])}
<div class="trap"><b>Ловушка.</b> <s>She very kind.</s> Без is это набор слов. Нужно She <b>is</b> very kind.</div>`,
questions: [
{q:"The coffee ___ cold.",a:'is',ru:'Кофе холодный.',w:{
 is:'По-русски «кофе — холодный», с прочерком. Прочерк → is. Coffee = it.',
 [Z]:'Без глагола нельзя: в английском предложении всегда есть глагол.',
 are:'Coffee это одна вещь, он = it → is.'}},
{q:"My brother ___ 20 years old.",a:'is',ru:'Моему брату 20 лет.',w:{
 is:'Возраст в английском передаётся через be: he is 20.',
 has:'По-русски «ему 20 лет», но через have возраст не говорят. Have значит «иметь».',
 [Z]:'Глагол нужен. Прочерк: «брату — 20 лет» → is.'}},
{q:"Найди правильное предложение.",a:'She is a teacher.',w:{
 'She a teacher.':'Пропущен is. По-русски «она — учитель», прочерк → is.',
 'She is a teacher.':'Всё на месте: is и артикль [a] перед профессией.',
 'She is teacher.':'Is на месте, но перед профессией нужен [a]: a teacher.'}},
{q:"Как перевести: «Мой брат в Берлине»?",a:'My brother is in Berlin.',w:{
 'My brother in Berlin.':'Нет глагола. «Брат — в Берлине», прочерк → is.',
 'My brother is in Berlin.':'Где находишься тоже через be: is in Berlin.',
 'My brother lives Berlin.':'Это «живёт», другой смысл. К тому же после lives нужно in.'}},
{q:"It ___ late. Let's go home.",a:'is',ru:'Уже поздно. Пойдём домой.',w:{
 is:'«(Сейчас) — поздно». В английском нужен подлежащее it и глагол is.',
 [Z]:'«It late» без глагола не работает.',
 are:'It это «оно», один → is.'}},
{q:"I ___ hungry.",a:'am',ru:'Я голоден.',w:{
 am:'Hungry это прилагательное («голодный»). Прочерк → am.',
 have:'«У меня голод» в английском не говорят. Hungry описывает тебя самого → I am.',
 [Z]:'Без глагола нельзя: I am hungry.'}},
{q:"These questions ___ easy.",a:'are',ru:'Эти вопросы лёгкие.',w:{
 are:'Questions во множественном числе = they → are.',
 is:'Is для одного предмета. Вопросов несколько.',
 [Z]:'Прочерк «вопросы — лёгкие» → нужен глагол.'}},
{q:"Как сказать «Мне холодно»?",a:"I'm cold.",w:{
 "I'm cold.":'В английском холодно тебе самому: I am cold.',
 'Me is cold.':'Дословный перевод «мне». В английском подлежащее I: I am cold.',
 'I have cold.':'Have = «иметь». A cold с артиклем значит «простуда»: I have a cold.'}},
]},

/* ============ 2 ============ */
{ id:'which', title:'am, is или are', desc:'Кому какая форма',
theory: `
${ex([['<b>I</b> → am (I\'m)','только с «я»'],['<b>he / she / it</b> → is (he\'s, she\'s, it\'s)','один человек или одна вещь: my mother, the book, English'],['<b>you / we / they</b> → are (you\'re, we\'re, they\'re)','ты/вы и все, кого больше одного: my friends, people'],])}
<h2>Как определить</h2>
<p>Замени подлежащее на местоимение: <i>my car</i> → it → is; <i>Tom and Ann</i> → they → are; <i>you and I</i> → we → are.</p>
<div class="trap"><b>Ловушка: people.</b> People («люди») всегда множественное число: people <b>are</b>. <s>People is</s>.<br><b>Ловушка: they're / their / there.</b> Звучат одинаково. they're = they are; their = их; there = там.</div>`,
questions: [
{q:"My parents ___ in Spain now.",a:'are',ru:'Мои родители сейчас в Испании.',w:{
 are:'Parents = they → are.',
 is:'Родителей двое, это «они», нужно are.',
 am:'Am бывает только с I.'}},
{q:"Philosophy ___ my hobby.",a:'is',ru:'Философия — моё хобби.',w:{
 is:'Philosophy одно понятие = it → is.',
 are:'Are для «они». Философия одна.',
 am:'Am только с I.'}},
{q:"You and I ___ good friends.",a:'are',ru:'Мы с тобой хорошие друзья.',w:{
 are:'You and I = we → are.',
 am:'Am стоит рядом с I, но подлежащее здесь «ты и я», это мы.',
 is:'Is для одного. Здесь двое.'}},
{q:"Anna ___ from Poland.",a:'is',ru:'Анна из Польши.',w:{
 is:'Anna = she → is.',
 are:'Are для you, we, they. Анна одна.',
 am:'Am только с I.'}},
{q:"I ___ ready!",a:'am',ru:'Я готов!',w:{
 am:'С I всегда am.',
 is:'Is для he, she, it.',
 are:'Are для you, we, they.'}},
{q:"The people here ___ very nice.",a:'are',ru:'Люди здесь очень милые.',w:{
 are:'People всегда множественное число → are.',
 is:'Частая ошибка: people кажется одним словом, но это «люди» = they.',
 am:'Am только с I.'}},
{q:"Mr. X and his wife ___ from Boston.",a:'are',ru:'Мистер Икс и его жена из Бостона.',w:{
 are:'Двое людей = they → are.',
 is:'Is подошло бы только для Mr. X одного.',
 am:'Am только с I.'}},
{q:"Как правильно сократить «they are»?",a:"they're",w:{
 "they're":"they are → they're. Апостроф стоит на месте пропавшей буквы a.",
 their:'Their значит «их»: their books.',
 there:'There значит «там»: The book is there.'}},
{q:"My English ___ better now.",a:'is',ru:'Мой английский теперь лучше.',w:{
 is:'My English = it → is.',
 are:'Английский один, it → is.',
 am:'Am только с I, а подлежащее здесь my English.'}},
]},

/* ============ 3 ============ */
{ id:'neg-q', title:'Отрицание и вопрос', desc:"isn't / aren't, Are you…?, краткие ответы",
theory: `
<h2>Отрицание: not сразу после am / is / are</h2>
${ex([['I am not → I\'m not','Я не…'],['he is not → he isn\'t / he\'s not',''],['they are not → they aren\'t / they\'re not',''],])}
<p class="mute">Сокращения <s>amn't</s> нет. Говорят I'm not.</p>
<h2>Вопрос: am / is / are переходит в начало</h2>
${ex([['You are busy.','<b>Are</b> you busy?'],['The film is long.','<b>Is</b> the film long?'],['Where are the keys?','Вопросительное слово ставится перед ним.']])}
<h2>Краткий ответ</h2>
${ex([['Is it cold? — Yes, it <b>is</b>. / No, it <b>isn\'t</b>.',''],['Are you OK? — Yes, I <b>am</b>. / No, I\'m <b>not</b>.','']])}
<div class="trap"><b>Ловушка.</b> Do / does здесь не нужны: <s>Do you tired?</s> → Are you tired? Do помогает только обычному глаголу (Do you work?).<br>В конце ответа сокращать нельзя: <s>Yes, I'm.</s> → Yes, I am.</div>`,
questions: [
{q:"I ___ tired.",hint:'Я не устал.',a:'am not',w:{
 'am not':'Not сразу после am: I am not tired.',
 "don't":"[don't] помогает обычному глаголу. Tired это не глагол → am not.",
 'not am':'Порядок обратный: сначала am, потом not.'}},
{q:"She ___ at home.",hint:'Её нет дома.',a:"isn't",w:{
 "isn't":'«Она — не дома» → is not → isn\'t.',
 "doesn't":"[doesn't] нужен для обычного глагола (she doesn't work). Здесь глагола нет.",
 not:'Одного not мало, нужен is: she is not / isn\'t.'}},
{q:"___ you from Germany?",a:'Are',ru:'Ты из Германии?',w:{
 Are:'Глагола действия нет → вопрос через Are.',
 Do:'Do нужен с глаголом действия: Do you live in Germany? Здесь глагола нет.',
 Is:'Is для he, she, it. С you → are.'}},
{q:"___ it difficult?",a:'Is',ru:'Это трудно?',w:{
 Is:'It → is, ставим в начало.',
 Does:'[does] для обычного глагола (Does it work?). Difficult это прилагательное.',
 Are:'Are для you, we, they.'}},
{q:"Какой вопрос составлен правильно?",a:'Is your sister a doctor?',w:{
 'Is your sister a doctor?':'Is в начале, потом подлежащее. Классический вопрос.',
 'Does your sister a doctor?':'Does без глагола действия не работает.',
 'Your sister a doctor?':'Нет глагола. Так говорят только в небрежной речи с интонацией удивления.'}},
{q:"Why ___ you sad?",a:'are',ru:'Почему ты грустный?',w:{
 are:'Why + are + you. Sad это прилагательное.',
 do:'[do] для глагола действия: Why do you cry?',
 is:'С you → are.'}},
{q:"Are you a student? — Yes, ___.",a:'I am',w:{
 'I am':'Краткий ответ повторяет глагол вопроса без сокращения.',
 "I'm":"В конце фразы сокращать нельзя: <s>Yes, I'm.</s>",
 'I do':'Вопрос был с are, а не с do. Отвечаем тем же глаголом.'}},
{q:"They ___ here today.",hint:'Их сегодня здесь нет.',a:"aren't",w:{
 "aren't":"They → are not → aren't.",
 "isn't":'Isn\'t для he, she, it.',
 "don't":"[don't] нужен для обычного глагола, а здесь его нет."}},
]},

/* ============ 4 ============ */
{ id:'or-verb', title:'To be или обычный глагол', desc:'Главная ловушка: I am live',
theory: `
<div class="rule"><b>Одно из двух.</b> Если в предложении есть обычный глагол (живу, люблю, знаю, работаю), am / is / are <b>не ставим</b>. Если глагола нет, ставим.</div>
${ex([['Я работаю в офисе.','I <b>work</b> in an office. (есть глагол)'],['Я — в офисе.','I <b>am</b> in an office. (нет глагола)'],['Он любит музыку.','He <b>loves</b> music.'],['Он — музыкант.','He <b>is</b> a musician.']])}
<h2>Обманки: в русском глагол, в английском прилагательное</h2>
${ex([['Я боюсь','I am afraid'],['Я интересуюсь','I am interested in'],['Я устал','I am tired'],['Я согласен','I agree (а тут, наоборот, глагол!)']])}
<div class="trap"><s>I am agree</s>, <s>I am want</s>, <s>She is like</s>: одна из самых частых ошибок русскоговорящих. Is like значит «похож на».</div>`,
questions: [
{q:"I ___ in a small flat.",a:'live',ru:'Я живу в маленькой квартире.',w:{
 live:'Live это глагол действия, am не нужен.',
 'am live':'Am и live вместе = два глагола. Выбери один: тут нужен live.',
 living:'Без am форма living не работает, а с am это другое время (Present Continuous). Для «живу постоянно» нужен live.'}},
{q:"He ___ happy today.",a:'is',ru:'Он сегодня счастлив.',w:{
 is:'Happy это прилагательное, глагола нет → is.',
 does:'[does] помогает обычному глаголу в вопросах и отрицаниях.',
 [Z]:'Глагол нужен: He is happy.'}},
{q:"We ___ English every day.",a:'study',ru:'Мы учим английский каждый день.',w:{
 study:'Study это глагол, am / is / are не нужен.',
 'are study':'Два глагола подряд: are лишнее.',
 are:'«Мы — английский» не имеет смысла. Нужен глагол study.'}},
{q:"Какое предложение верное?",a:'I want to sleep.',w:{
 'I am want to sleep.':'Want это глагол, am лишнее.',
 'I want to sleep.':'Один глагол want, всё верно.',
 'I wanting to sleep.':'Want почти не ставят в -ing, и без am это не работает.'}},
{q:"My friend ___ philosophy.",a:'likes',ru:'Мой друг любит философию.',w:{
 likes:'Like это глагол. Friend = he → likes.',
 'is like':'Is like значит «похож на»: He is like his father.',
 is:'«Друг — философия» не имеет смысла.'}},
{q:"My friend ___ interested in philosophy.",a:'is',ru:'Мой друг интересуется философией.',w:{
 is:'Interested это прилагательное («заинтересованный»), нужен is.',
 [Z]:'По-русски «интересуется» это глагол, но в английском interested прилагательное → is.',
 does:'[does] для глагола действия, interested не глагол.'}},
{q:"They ___ know the answer.",hint:'Они не знают ответа.',a:"don't",w:{
 "don't":"Know это глагол, отрицание через [don't].",
 "aren't":"Aren't для предложений без глагола. Здесь есть know.",
 not:'Нужен помощник: do not / don\'t.'}},
{q:"She ___ a lot of books.",a:'has',ru:'У неё много книг.',w:{
 has:'«У неё есть» = she has. Это глагол have.',
 is:'«Она — много книг» не имеет смысла.',
 'is have':'Is лишнее: has уже глагол.'}},
{q:"Как сказать «Я согласен»?",a:'I agree.',w:{
 'I agree.':'Agree это глагол, am не нужен.',
 'I am agree.':'Классическая ошибка: agree уже глагол.',
 'I agreed.':'Это прошедшее время: «я согласился».'}},
]},

/* ============ 5 ============ */
{ id:'mix', title:'Всё вместе', desc:'Смешанные предложения и поиск ошибок',
theory: `
<p>В этом модуле нет новых правил. Перед каждым ответом задай себе три вопроса:</p>
<div class="rule"><ol class="alg"><li>Есть ли в предложении обычный глагол? Есть → am / is / are не нужен.</li><li>Глагола нет → кто подлежащее? I → am, он / она / оно → is, остальные → are.</li><li>Это отрицание или вопрос? not после глагола, в вопросе глагол идёт в начало.</li></ol></div>`,
questions: [
{q:"Athens ___ in Greece.",a:'is',ru:'Афины находятся в Греции.',w:{
 is:'Город один = it → is. «Находится» в английском передаётся через be.',
 are:'Athens заканчивается на -s, но это один город.',
 [Z]:'Глагол нужен: Athens is in Greece.'}},
{q:"My hands ___ cold.",a:'are',ru:'У меня холодные руки.',w:{
 are:'Hands = they → are.',
 is:'Рук две → are.',
 [Z]:'Прочерк: «руки — холодные» → are.'}},
{q:"I ___ 30 years old.",a:'am',ru:'Мне 30 лет.',w:{
 am:'Возраст через be. С I → am.',
 have:'«Иметь 30 лет» по-английски не говорят.',
 [Z]:'Без глагола нельзя.'}},
{q:"Mr. X ___ in a bookshop.",a:'works',ru:'Мистер Икс работает в книжном магазине.',w:{
 works:'Work это глагол. He → works.',
 'is work':'Is и work вместе = два глагола.',
 is:'«Он — в магазине» = находится, а нам нужно «работает».'}},
{q:"___ your friends interested in books?",a:'Are',ru:'Твои друзья интересуются книгами?',w:{
 Are:'Interested это прилагательное, friends = they → Are.',
 Do:'Do подошёл бы к глаголу: Do your friends like books?',
 Is:'Друзей много → are.'}},
{q:"Какое предложение верное?",a:"I'm not sure.",w:{
 "I'm not sure.":'Sure это прилагательное («уверенный») → am not.',
 "I don't sure.":"[don't] для глагола. Sure не глагол.",
 'I not sure.':'Пропущен am.'}},
{q:"I ___ agree with you.",hint:'Я не согласен с тобой.',a:"don't",w:{
 "don't":"Agree это глагол → I don't agree.",
 'am not':'Очень частая ошибка: agree глагол, am не нужен.',
 not:'Нужен помощник do: I do not agree.'}},
{q:"It ___ important to me.",a:'is',ru:'Это важно для меня.',w:{
 is:'Important это прилагательное → it is.',
 [Z]:'Глагол нужен: It is important.',
 does:'[does] для глагола действия.'}},
{q:"Как сказать «Я боюсь темноты»?",a:"I'm afraid of the dark.",w:{
 "I'm afraid of the dark.":'Afraid это прилагательное → I am afraid of.',
 'I afraid of the dark.':'Пропущен am: в русском «боюсь» глагол, а в английском afraid нет.',
 'I have afraid of the dark.':'Have = «иметь». Нужно I am.'}},
{q:"People in my city ___ very friendly.",a:'are',ru:'Люди в моём городе очень дружелюбные.',w:{
 are:'People всегда «они» → are.',
 is:'Ловушка: people это множественное число.',
 am:'Am только с I.'}},
]},

]};
