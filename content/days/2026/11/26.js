/* 26 ноября 2026. Источник ошибок: текст о себе из чата 26.11.2026 */
export default {
type: 'regular',
id: '2026-11-26', date: '2026-11-26',
related: ['to-be/need', 'to-be/which', 'to-be/neg-q', 'to-be/or-verb', 'present-simple/meaning'],
title: 'Кто я и чем занимаюсь',
focus: 'am / is / are: в каждом предложении нужен глагол · рассказ о себе',

review: `
<p>Твой текст и исправленная версия. Ошибки из него и стали темой дня.</p>
<div class="rule"><p class="mute">Было:</p><p>hi, I live un german. i'm stydying to study english because i want to read philosophy, speak to native and so on. i make an effort to writing to you. so my english in beginner syage but i am makung progress.</p>
<p class="mute">Стало:</p><p><b>Hi! I live in Germany. I'm learning English because I want to read philosophy, speak with native speakers and so on. I'm making an effort to write to you. My English is at a beginner level, but I'm making progress.</b></p></div>
<div class="fix"><span><s>my english in beginner stage</s> → <b>My English is at a beginner level</b></span><span class="mute"><b style="color:inherit">Главная ошибка.</b> Пропущен глагол <b>is</b>. По-русски можно «мой английский на начальном уровне» без глагола, а в английском так нельзя: в каждом предложении есть глагол. Разбираем ниже.</span></div>
<div class="fix"><span><s>make an effort to writing</s> → <b>make an effort to write</b></span><span class="mute">После <b>to</b> идёт глагол в начальной форме. Ты сам записал это правило 13 ноября: make an effort to + V. Знать правило мало, нужно его автоматизировать, поэтому оно есть в повторении.</span></div>
<div class="fix"><span><s>in german</s> → <b>in Germany</b></span><span class="mute">Germany это страна, German это «немецкий» и «немец». I live in Germany. I speak German.</span></div>
<div class="fix"><span><s>i'm studying to study english</s> → <b>I'm learning English</b></span><span class="mute">Два одинаковых глагола подряд не нужны. Подходят оба варианта: I'm learning English / I'm studying English.</span></div>
<div class="fix"><span><s>speak to native</s> → <b>speak with native speakers</b></span><span class="mute">Native это прилагательное («родной»). Людей называют <b>native speakers</b>, во множественном числе, потому что их много.</span></div>
<div class="fix"><span><s>i</s> → <b>I</b></span><span class="mute">«Я» всегда пишется с большой буквы, даже в середине предложения. Начало предложения тоже с большой.</span></div>
<div class="fix"><span><s>stydying, syage, makung</s></span><span class="mute">Опечатки. Пиши медленнее и включи проверку орфографии в браузере. Опечатки мешают мне увидеть настоящие ошибки.</span></div>
<div class="fix"><span><b>but I am making progress</b> ✓</span><span class="mute">Здесь всё правильно, хорошо.</span></div>`,

theory: `
<div class="rule"><b>Правило.</b> В английском предложении всегда есть глагол. Если в русском предложении глагола нет, ставим <b>am / is / are</b>, то есть «быть».</div>
<table class="ex">
<tr><td>Я <i>—</i> студент.</td><td><b>I am</b> a student.</td></tr>
<tr><td>Мой английский <i>—</i> слабый.</td><td>My English <b>is</b> weak.</td></tr>
<tr><td>Я <i>—</i> в Германии.</td><td><b>I am</b> in Germany.</td></tr>
<tr><td>Это <i>—</i> интересно.</td><td>It <b>is</b> interesting.</td></tr>
<tr><td>Мы <i>—</i> дома.</td><td>We <b>are</b> at home.</td></tr>
</table>
<p>Совет: ставь мысленно «—» в русском предложении. Там, где прочерк, нужен <b>am / is / are</b>.</p>
<h2>Кому что</h2>
<table class="ex"><tr><td><b>I</b> am · I'm</td><td>я</td></tr><tr><td><b>he / she / it</b> is · he's, she's, it's</td><td>он, она, оно, а также <i>my English, philosophy, this book</i></td></tr><tr><td><b>you / we / they</b> are · you're, we're, they're</td><td>ты/вы, мы, они, а также <i>my parents, people</i></td></tr></table>
<h2>Обратная ловушка</h2>
<div class="trap">Если глагол уже есть (живу, учу, хочу), am / is / are <b>не нужен</b>: <s>I am live in Germany</s> → I live in Germany. <s>I am want</s> → I want.<br>
Исключение: <b>I'm learning / I'm making progress</b>. Это другое время (Present Continuous, «прямо сейчас, в этот период»), его разберём позже. Пока запомни эти фразы целиком.</div>
<h2>Отрицание и вопрос</h2>
<table class="ex"><tr><td>I'm <b>not</b> German.</td><td>Я не немец. (not сразу после am)</td></tr>
<tr><td>My English <b>isn't</b> very good yet.</td><td>Мой английский пока не очень хороший.</td></tr>
<tr><td><b>Are</b> you a student?</td><td>Ты студент? (am/is/are переходит в начало)</td></tr>
<tr><td><b>Is</b> it interesting?</td><td>Это интересно?</td></tr></table>
<h2>Мини-словарик: страна, язык, человек</h2>
<table class="ex"><tr><td>Germany</td><td>German: немецкий язык, немец, немецкий</td></tr><tr><td>Russia · Ukraine</td><td>Russian · Ukrainian</td></tr><tr><td>the USA</td><td>American (а язык English)</td></tr></table>
<p class="mute">Национальность обычно без артикля: <b>I'm German</b>, <b>She's American</b>.</p>`,

phrases: [
{en:'Nice to meet you.', ru:'Приятно познакомиться.'},
{en:'I live in Germany.', ru:'Я живу в Германии.', note:'live = глагол, поэтому без am'},
{en:"I'm learning English.", ru:'Я учу английский.', note:'запомни целиком'},
{en:"My English isn't very good yet.", ru:'Мой английский пока не очень хороший.', note:'yet в конце = «пока ещё»'},
{en:"I'm at a beginner level, but I'm making progress.", ru:'Я на начальном уровне, но я прогрессирую.'},
{en:'What do you do?', ru:'Чем ты занимаешься? (работа, дело)', note:'Не «что ты делаешь сейчас»: это вопрос о профессии'},
{en:"I'm interested in philosophy.", ru:'Мне интересна философия.', note:'interested IN, и обязательно am'},
{en:'I want to read Aristotle in English.', ru:'Я хочу читать Аристотеля на английском.'},
{en:'What are you into?', ru:'Чем ты увлекаешься?', note:'разговорное'},
{en:'How about you?', ru:'А ты? А как насчёт тебя?', note:'возвращаешь вопрос собеседнику'},
{en:"That's a good question. Let me think.", ru:'Хороший вопрос. Дай подумать.', note:'выигрываешь время, чтобы собрать фразу'},
{en:'Could you say that again, please?', ru:'Не могли бы вы повторить, пожалуйста?'},
{en:'Could you speak more slowly, please?', ru:'Не могли бы вы говорить помедленнее?'}
],

translate: [
{ru:'Моя сестра — врач.', a:['My sister is a doctor.'], note:'Прочерк → is. Профессия с a.'},
{ru:'Эта книга очень старая.', a:['This book is very old.']},
{ru:'Мы не голодны.', a:["We aren't hungry.", "We're not hungry."]},
{ru:'Твои друзья дома?', a:['Are your friends at home?', 'Are your friends home?'], note:'Friends = they → Are в начало.'},
{ru:'Он живёт в Берлине и работает в банке.', a:['He lives in Berlin and works in a bank.', 'He lives in Berlin and he works in a bank.'], note:'Ловушка: тут есть глаголы, поэтому is не нужен. He → lives, works.'},
{ru:'Мистер Икс интересуется историей.', a:['Mr. X is interested in history.', 'Mr X is interested in history.'], note:'«Интересуется» по-русски глагол, а в английском прилагательное → is interested in.'},
{ru:'Я не уверен.', a:["I'm not sure."]},
{ru:'Этот вопрос сложный, но интересный.', a:['This question is difficult but interesting.', 'This question is difficult, but it is interesting.', 'This question is hard but interesting.', 'This question is hard, but it is interesting.', 'This question is complicated but interesting.']},
{ru:'Почему ты устал?', a:['Why are you tired?']},
{ru:'Мне нравится философия, но я её не понимаю.', a:["I like philosophy, but I don't understand it."], note:'Like и understand это глаголы, поэтому am не нужен. «Её» = it.'}
],

letter: {
from: 'Mr. X',
text: `Hi!

My name is X. Well, it isn't my real name, but I like it. I'm 42 and I live in Boston, in the USA. I work in a small bookshop. The shop is old and quiet, and I love it.

I'm interested in philosophy too. My favorite philosopher is Aristotle. He says we become brave by doing brave things. I think it's the same with languages: we learn to speak by speaking!

So, tell me about yourself. Where are you from? What do you do? Why are you learning English?

Write soon,
X`,
gloss: [['real','настоящий'],['bookshop','книжный магазин'],['quiet','тихий'],['favorite','любимый'],['become','становиться'],['brave','смелый'],['by doing','делая что-то'],['the same with','то же самое с'],['Write soon','Пиши скорее (концовка письма)']]
},

speak: {
task: 'Mr. X звонит тебе по видео и говорит: "Tell me about yourself!" Ответь ему за 1–2 минуты.',
plan: ['Кто ты и где живёшь (I live in…, I\'m…)', 'Чем занимаешься (I work…/I study…/I\'m a…)', 'Почему учишь английский (because I want to…)', 'Что тебе интересно и почему (I\'m interested in… because…)', 'Закончи вопросом: How about you? What are you into?']
},

write: {
task: 'Ответь на письмо Mr. X. Ответь на все его 3 вопроса, расскажи, что думаешь про его мысль об Аристотеле, и задай ему 2 своих вопроса. 6–10 предложений.',
words: ["I'm interested in", 'make an effort to', 'even when', "I'm making progress", 'What are you into?', 'How about you?', "I agree / I don't agree"]
},

think: `
<div class="rule"><b>Привычка «прочерк».</b> 3 раза за день: когда садишься за ПК, когда ешь, когда выходишь из дома. Скажи про себя 3 предложения через am / is / are, только о том, что видишь и чувствуешь:<br>
<i>I'm at home. I'm tired. The coffee is hot.</i> · <i>The street is cold. People are busy.</i></div>
<div class="rule"><b>Вопрос философу.</b> <i>What is a good life?</i><br>
Ответь в голове 3–5 простыми предложениями: <i>A good life is… It is not… I think… because…</i><br>
Главное правило: <b>не переводи с русского</b>. Бери только слова, которые уже знаешь. Если слова нет, скажи проще: не «осмысленная», а <i>a life with a purpose</i>. Это и есть думать на английском: сразу строить мысль из тех слов, что у тебя есть.</div>
<p class="mute">Ответ на вопрос можешь вписать в поле «Трудно / выписал», я проверю.</p>`
};
