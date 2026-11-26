/* ТЕМА: This / that / these / those. Формат вопросов описан в articles-1.js */
(function(){
const ex = rows => '<table class="ex">' + rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') + '</table>';

TOPICS.push({
id: 'demonstratives', group: 'Существительное и слова перед ним',
title: 'This / that / these / those',
desc: 'Указательные слова и согласование с существительными',
modules: [

/* ============ 1 ============ */
{ id:'choice', title:'Два вопроса: где и сколько', desc:'Близко или далеко, один или несколько',
theory: `
<p>Четыре слова, но выбор делается всего по двум вопросам: <b>близко или далеко?</b> и <b>один или несколько?</b></p>
${ex([
 ['[this] + один, близко','[this] book: эта книга, вот здесь'],
 ['[these] + несколько, близко','[these] books: эти книги, вот здесь'],
 ['[that] + один, далеко','[that] book: та книга, вон там'],
 ['[those] + несколько, далеко','[those] books: те книги, вон там'],
])}
<p>Цвет помогает запомнить: синий = близко, розовый = далеко.</p>
<h2>Алгоритм</h2>
<div class="rule"><ol class="alg">
<li><b>Один или несколько?</b> Один → пара [this] / [that]. Несколько → пара [these] / [those].</li>
<li><b>Близко или далеко?</b> Можешь дотронуться → [this] / [these]. Нужно показать рукой → [that] / [those].</li>
</ol></div>
<h2>Подсказки</h2>
${ex([
 ['here («здесь»)','[this] / [these]'],
 ['over there («вон там»)','[that] / [those]'],
])}
<p>Близость бывает не только в пространстве. Текущее время близко: [this] week. Прошлое далеко: in [those] days.</p>
<h2>Как не спутать на слух</h2>
${ex([
 ['[this]: короткое «и», в конце [s]','один'],
 ['[these]: длинное «и-и», в конце [z]','несколько'],
])}
<div class="trap"><b>Ловушка.</b> По-русски часто говорят «эта звезда» и про далёкую. В английском для далёкого предмета обычно берут [that]: <i>[that] star in the sky</i>.</div>`,
questions: [
{q:'___ phone here in my hand is new.',a:'this',ru:'Этот телефон у меня в руке новый.',w:{
 this:'Phone один, и он в руке, то есть близко → [this].',
 that:'Число верное, но [that] для далёкого. А телефон прямо в руке.',
 these:'Близость поймана верно, но [these] для нескольких предметов. Телефон один.',
 those:'[those] значит «несколько и далеко». Здесь один и близко: не совпало ничего.'}},
{q:'Look at ___ stars in the sky!',a:'those',ru:'Посмотри на те звёзды в небе!',w:{
 this:'[this] значит «один и близко», а звёзд много и они далеко.',
 that:'Далеко, верно, но [that] для одного предмета. Stars множественное число.',
 these:'Число верное, но [these] для близкого. Звёзды в небе далеко.',
 those:'Stars множественное число, и они далеко → [those].'}},
{q:'Do you see ___ man over there?',a:'that',ru:'Видишь вон того мужчину?',w:{
 this:'Мужчина один, верно, но over there («вон там») значит далеко.',
 that:'Man один, over there = далеко → [that].',
 these:'[these] для нескольких и близко. Man один, men было бы несколько.',
 those:'Далеко, верно, но [those] требует множественного числа: [those] men.'}},
{q:'___ shoes I am wearing now are too small.',a:'these',ru:'Туфли, которые на мне сейчас, слишком малы.',w:{
 this:'Близко, верно, но shoes множественное число. Одна туфля: [this] shoe.',
 that:'[that] значит «один и далеко». Туфли две, и они на мне.',
 these:'Shoes множественное число, и они на мне, то есть близко → [these].',
 those:'Число верное, но [those] для далёкого. А туфли на мне.'}},
{q:'Take ___ cup. It is right here.',a:'this',ru:'Возьми эту чашку. Она прямо здесь.',w:{
 this:'Cup одна, right here = совсем близко → [this].',
 that:'Right here («прямо здесь») исключает далёкое [that].',
 these:'Cup в единственном числе. Для нескольких: [these] cups.',
 those:'Не подходит ни по числу (чашка одна), ни по расстоянию (она здесь).'}},
{q:'What is ___ building on the hill, far away?',a:'that',ru:'Что это за здание вдалеке на холме?',w:{
 this:'По-русски «это здание», но оно far away. Для далёкого нужно другое слово.',
 that:'Building одно, far away = далеко → [that].',
 these:'Building в единственном числе, и оно далеко. [these] не подходит дважды.',
 those:'Расстояние верное, но здание одно. [those] buildings было бы несколько.'}},
{q:'___ apples here are sweet, but the ones over there are sour.',a:'these',ru:'Эти яблоки здесь сладкие, а те кислые.',w:{
 this:'Here = близко, верно, но apples множественное число.',
 that:'[that] для одного далёкого. Яблок много, и они здесь.',
 these:'Apples много, here = близко → [these].',
 those:'Число верное, но here значит близко.'}},
{q:'Can you bring me ___ boxes from the other room?',a:'those',ru:'Можешь принести мне те коробки из другой комнаты?',w:{
 this:'Коробок несколько, и они в другой комнате. Не подходит ни число, ни расстояние.',
 that:'Далеко, верно, но boxes множественное число. Одна коробка: [that] box.',
 these:'Число верное, но коробки в другой комнате, не рядом.',
 those:'Boxes несколько, они в другой комнате → [those].'}},
{q:'I am very busy ___ week.',hint:'Речь о текущей неделе.',a:'this',ru:'На этой неделе я очень занят.',w:{
 this:'Текущее время «близко», неделя одна → [this] week.',
 that:'[that] week = «та неделя», из прошлого. А речь о текущей.',
 these:'Week одна. [these] weeks = «эти недели».',
 those:'[those] значит несколько и далеко во времени. Неделя одна и идёт сейчас.'}},
{q:'My grandmother was born in 1930. In ___ days people had no TV.',a:'those',ru:'Бабушка родилась в 1930 году. В те дни у людей не было телевизора.',w:{
 this:'Days множественное число, и это далёкое прошлое.',
 that:'Прошлое, верно, но days множественное число. Один день: on [that] day.',
 these:'[these] days = «в наши дни». А речь о прошлом.',
 those:'Days несколько, далёкое прошлое → in [those] days, «в те времена».'}},
{q:'Какое слово значит «несколько предметов близко»?',a:'these',w:{
 this:'[this] близко, но это один предмет.',
 that:'[that] один и далеко.',
 these:'Близко + несколько → [these].',
 those:'[those] несколько, но далеко.'}},
]},

/* ============ 2 ============ */
{ id:'agreement', title:'Согласование с существительным и глаголом', desc:'is или are, хитрые слова, one / ones',
theory: `
<p>Указательное слово, существительное и глагол должны быть <b>в одном числе</b>. Проверяй цепочку целиком.</p>
${ex([
 ['[this] / [that] + book + <b>is</b>','[this] book is old'],
 ['[these] / [those] + books + <b>are</b>','[these] books are old'],
])}
<h2>Главная ловушка: русское «это»</h2>
<p>По-русски «это» не меняется: «это друг», «это друзья». В английском меняется.</p>
${ex([
 ['[This] is my friend.','Это мой друг.'],
 ['[These] are my friends.','Это мои друзья.'],
])}
<div class="trap"><s>This are</s>, <s>these is</s>, <s>this books</s>: так не бывает никогда.</div>
<h2>Хитрые слова</h2>
${ex([
 ['Множественное без -s: people, children, men, women, teeth, feet','[these] people <b>are</b>'],
 ['Всегда множественные: jeans, trousers, glasses (очки), scissors, clothes','[these] jeans <b>are</b>'],
 ['Несчитаемые: money, information, advice, furniture, work','[this] money <b>is</b>'],
 ['Есть -s, но число единственное: news','[this] news <b>is</b>'],
])}
<p>Русское число не помощник: деньги и новости у нас множественные, а в английском [this] money, [this] news.</p>
<h2>Чтобы не повторять слово: one / ones</h2>
${ex([
 ['I like [this] shirt, not [that] <b>one</b>.','вместо shirt, один'],
 ['I like [these] shoes, not [those] (<b>ones</b>).','вместо shoes, несколько'],
])}
<h2>Ответ на вопрос с this / these</h2>
${ex([
 ['What is [this]? – <b>It</b> is a key.','один → it'],
 ['What are [these]? – <b>They</b> are keys.','несколько → they'],
])}`,
questions: [
{q:'___ are my friends, Ann and Max.',hint:'Друзья стоят рядом.',a:'these',ru:'Это мои друзья, Анна и Макс.',w:{
 this:'Русское «это» одно на все случаи, но здесь are и friends: множественное число.',
 that:'[that] единственное число, с are не сочетается.',
 these:'Friends + are = множественное, они рядом → [these].',
 those:'Число верное, но [those] для далёких, а друзья рядом.'}},
{q:'These books ___ very interesting.',a:'are',ru:'Эти книги очень интересные.',w:{
 is:'Is для одного предмета: [this] book is. С [these] books не сочетается.',
 are:'[these] + books = множественное → are.',
 am:'Am бывает только с I: I am.'}},
{q:'___ people are waiting for you.',hint:'Люди стоят рядом.',a:'these',ru:'Эти люди ждут тебя.',w:{
 this:'На конце people нет -s, но это множественное число от person. Подсказка: are.',
 that:'[that] единственное число, а people множественное.',
 these:'People = «люди», множественное, рядом → [these].',
 those:'Число верное, но люди рядом, а [those] для далёких.'}},
{q:'Whose money is ___ here on the table?',a:'this',ru:'Чьи это деньги здесь на столе?',w:{
 this:'Money несчитаемое, всегда единственное (is), here = близко → [this].',
 that:'Число верное, но here значит близко.',
 these:'По-русски «деньги» множественное, но английское money единственное. Подсказка: is.',
 those:'Money единственное и лежит здесь, не подходит ни число, ни расстояние.'}},
{q:'___ jeans here are too long for me.',a:'these',ru:'Эти джинсы мне слишком длинные.',w:{
 this:'Jeans одна вещь, но слово всегда множественное. Подсказка: are. Можно [this] pair of jeans.',
 that:'[that] единственное число, а jeans всегда множественное, к тому же они здесь.',
 these:'Jeans всегда множественное, here = близко → [these].',
 those:'Число верное, но here значит близко.'}},
{q:'I can\'t believe it! ___ news I am reading is terrible.',a:'this',ru:'Не могу поверить! Новости, которые я читаю, ужасны.',w:{
 this:'News единственное число, хотя есть -s: глагол is. Читаю прямо сейчас → [this].',
 these:'Окончание -s обманывает. News в английском единственное: news is.',
 those:'[those] для множественного, а news единственное число: news is.'}},
{q:'___ information is wrong.',hint:'Информация у тебя перед глазами.',a:'this',ru:'Эта информация неверная.',w:{
 this:'Information несчитаемое, глагол is, перед глазами → [this].',
 these:'[these] требует множественного числа, а information его не имеет.',
 those:'Information не бывает множественным, и она близко.'}},
{q:'This jacket is too expensive. How much is that ___?',a:'one',ru:'Эта куртка слишком дорогая. Сколько стоит та?',w:{
 one:'Заменяем jacket, одна вещь, и стоит [that] → one.',
 ones:'Ones заменяет несколько предметов. После [that] только единственное число.',
 it:'[that] it не говорят: it не стоит после указательного слова.'}},
{q:'Which shoes do you want: the black ___ or the red ones?',a:'ones',ru:'Какие туфли ты хочешь: чёрные или красные?',w:{
 one:'One заменяет один предмет, а shoes множественное число.',
 ones:'Заменяем shoes, множественное → ones. Дальше подсказка: the red ones.',
 they:'They заменяет всю фразу целиком и не стоит после прилагательного.'}},
{q:'What are these? – ___ are my keys.',a:'they',ru:'Что это? – Это мои ключи.',w:{
 it:'It для одного предмета и требует is. Здесь are и keys.',
 they:'Вопрос о нескольких ([these]) → отвечаем they are.',
 this:'[this] единственное число, с are не сочетается.'}},
{q:'What is that? – ___ is an old camera.',a:'it',ru:'Что это? – Это старый фотоаппарат.',w:{
 it:'Вопрос об одном предмете → отвечаем it is.',
 they:'They для нескольких и требует are. Камера одна.',
 those:'[those] множественное число, с is не сочетается.'}},
{q:'Какое предложение верное?',a:'Those children are noisy.',w:{
 'That children are noisy.':'Children множественное число (один ребёнок = child). [that] нужно заменить на [those].',
 'Those children are noisy.':'[those] + children + are: вся цепочка во множественном.',
 'Those children is noisy.':'[those] children множественное, а is единственное. Нужно are.'}},
{q:'Найди предложение С ОШИБКОЙ.',a:'This scissors are sharp.',w:{
 'This scissors are sharp.':'Ошибка здесь: scissors всегда множественное → [these] scissors are.',
 'This furniture is new.':'Здесь всё верно: furniture несчитаемое, единственное → [this] + is.',
 'These glasses are mine.':'Здесь всё верно: glasses (очки) всегда множественное → [these] + are.'}},
]},

/* ============ 3 ============ */
{ id:'usage', title:'В живой речи и всё вместе', desc:'Знакомство, телефон, время, реакция',
theory: `
<p>Кроме расстояния, у этих слов есть типичные ситуации. Логика та же: <b>сейчас и рядом</b> → [this] / [these], <b>уже прошло или в стороне</b> → [that] / [those].</p>
<h2>1. Знакомим людей и представляемся по телефону → [this]</h2>
${ex([
 ['Mum, [this] is Oleg.','Мама, это Олег. (He is Oleg так не скажешь)'],
 ['Hello, [this] is Anna speaking.','Алло, это Анна.'],
])}
<h2>2. Время</h2>
${ex([
 ['[this] morning, [this] year','сегодня утром, в этом году'],
 ['[these] days','в наши дни'],
 ['in [those] days','в те времена'],
 ['[that] day, [that] summer','в тот день, тем летом'],
])}
<h2>3. Реакция на то, что уже сказали → [that]</h2>
${ex([
 ['I passed! – [That] is great!','Я сдал! – Это здорово!'],
 ['[That] is right. [That] is all.','Верно. Это всё.'],
])}
<h2>4. Сейчас скажу или покажу → [this]</h2>
${ex([['Listen to [this]: ...','Послушай вот что: ...'],['Do it like [this].','Делай вот так. (показываю)']])}
<h2>5. «Те, кто» → [those] who</h2>
${ex([['[those] who work hard','те, кто усердно работает']])}
<div class="trap"><b>Ловушка.</b> Не ставь артикль или my рядом: <s>the this book</s>, <s>this my book</s>. Нужно [this] book или my book. «Эта моя книга» = [this] book of mine.</div>`,
questions: [
{q:'Mum, ___ is my friend Oleg.',hint:'Ты знакомишь их, Олег стоит рядом с тобой.',a:'this',ru:'Мама, это мой друг Олег.',w:{
 this:'Знакомим с одним человеком, который рядом → [this] is.',
 that:'[that] is подойдёт, если показываешь на человека вдали. Олег рядом.',
 these:'[these] для нескольких человек и с are. Олег один.',
 it:'It is про человека при знакомстве не говорят, звучит как о вещи.'}},
{q:'Hello, ___ is Anna speaking. Can I talk to Max?',hint:'Анна звонит и представляется.',a:'this',ru:'Алло, это Анна. Можно поговорить с Максом?',w:{
 this:'Представляясь по телефону, говорят [this] is + имя.',
 these:'[these] для нескольких, а говорит одна Анна.',
 those:'[those] множественное и далёкое. Говорящий для себя «близко».'}},
{q:'I got the job! – ___ is wonderful!',hint:'Реакция на слова собеседника.',a:'that',ru:'Меня взяли на работу! – Это чудесно!',w:{
 that:'Реагируем на одну новость, которую только что услышали → [that] is.',
 these:'Новость одна, глагол is. [these] требует are.',
 those:'[those] множественное число, с is не сочетается.'}},
{q:'___ days everybody has a smartphone.',hint:'Речь о нашем времени.',a:'these',ru:'В наши дни у всех есть смартфон.',w:{
 this:'Days множественное число, [this] только с одним: [this] day.',
 that:'[that] единственное число, а days множественное.',
 these:'[these] days = «в наши дни», время близкое.',
 those:'[those] days = «те времена», прошлое. А has говорит о настоящем.'}},
{q:'We met in 2010. ___ summer was very hot.',a:'that',ru:'Мы познакомились в 2010 году. То лето было очень жарким.',w:{
 this:'[this] summer = «этим летом», текущим. А речь о 2010 годе.',
 that:'Summer одно и в прошлом → [that] summer.',
 these:'Summer в единственном числе, глагол was.',
 those:'Прошлое, верно, но лето одно. [those] summers were было бы несколько.'}},
{q:'I woke up at six ___ morning, and I am sleepy now.',hint:'Речь о сегодняшнем утре.',a:'this',ru:'Сегодня утром я проснулся в шесть и сейчас хочу спать.',w:{
 this:'Сегодняшнее утро близко во времени → [this] morning.',
 that:'[that] morning = «тем утром», в прошлом. Здесь сегодняшнее.',
 these:'Morning одно, [these] нужно множественное.',
 those:'[those] значит несколько и далеко. Утро одно, сегодняшнее.'}},
{q:'___ who study every day learn faster.',a:'those',ru:'Те, кто занимается каждый день, учатся быстрее.',w:{
 this:'[this] это один предмет. А study без -s показывает, что людей много.',
 that:'[that] единственное число, а «те, кто» это группа людей.',
 these:'Смысл близкий, но выражение «те, кто» закреплено как [those] who.',
 those:'«Те, кто» = [those] who, готовое выражение.'}},
{q:'Watch me and do it like ___.',hint:'Ты показываешь движение прямо сейчас.',a:'this',ru:'Смотри на меня и делай вот так.',w:{
 this:'Показываю прямо сейчас, сам → like [this], «вот так».',
 that:'Like [that] = «так, как ты или он», о том, что уже показано другим.',
 these:'Движение одно, [these] множественное.',
 those:'[those] множественное и далёкое. Движение одно, показываю сейчас.'}},
{q:'Какое предложение верное?',a:'This is my car.',w:{
 'This my car is fast.':'[this] и my вместе не стоят. Нужно My car is fast или [this] car is fast.',
 'The this car is fast.':'[the] и [this] вместе не стоят: оба указывают «какой именно».',
 'This is my car.':'Здесь [this] = «это», отдельное подлежащее. А my относится к car. Всё верно.'}},
{q:'Are ___ your glasses? I found them on the sofa.',hint:'Очки у тебя в руке.',a:'these',ru:'Это твои очки? Я нашёл их на диване.',w:{
 this:'Предмет один, но glasses множественное: are и them это показывают.',
 that:'[that] единственное число, с are не сочетается.',
 these:'Glasses + are = множественное, очки в руке → [these].',
 those:'Число верное, но очки у тебя в руке, близко.'}},
{q:'___ cake over there looks delicious!',a:'that',ru:'Вон тот торт выглядит вкусно!',w:{
 this:'Торт один, верно, но over there значит далеко.',
 that:'Cake один, over there → [that].',
 these:'Cake в единственном числе (looks с -s), и он далеко.',
 those:'Расстояние верное, но торт один: looks, а не look.'}},
{q:'___ women near the door, far from us, are doctors.',a:'those',ru:'Те женщины у двери, вдали от нас, врачи.',w:{
 this:'Women множественное число (одна: woman), и они далеко.',
 that:'Далеко, верно, но women множественное: глагол are.',
 these:'Число верное, но far from us значит далеко.',
 those:'Women множественное, far from us → [those].'}},
{q:'Найди предложение БЕЗ ошибки.',a:'These teeth are clean.',w:{
 'This teeth are clean.':'Teeth множественное число от tooth → [these] teeth.',
 'These teeth are clean.':'[these] + teeth + are: всё во множественном.',
 'These tooth are clean.':'Tooth один зуб. После [these] нужно teeth.'}},
{q:'I don\'t like this sofa. I like ___ one over there.',a:'that',ru:'Мне не нравится этот диван. Мне нравится вон тот.',w:{
 this:'Over there значит далеко, к тому же он противопоставлен [this] sofa.',
 that:'One = один диван, over there → [that] one.',
 these:'One заменяет один предмет, [these] с ним не стоит.',
 those:'Далеко, верно, но с [those] было бы ones, а здесь one.'}},
]},

]});
})();
