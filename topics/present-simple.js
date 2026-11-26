/* ТЕМА: Present Simple. Формат вопросов описан в articles-1.js */
(function(){
const ex = rows => '<table class="ex">' + rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') + '</table>';

TOPICS.push({
id: 'present-simple', group: 'Основа предложения: глагол',
title: 'Present Simple',
desc: 'Привычки, факты, утверждения, отрицания, do / does, -s',
modules: [

/* ============ 1 ============ */
{ id:'meaning', title:'Когда нужен Present Simple', desc:'Привычки, факты, утверждения',
theory: `
<p>Present Simple говорит о том, что происходит <b>вообще, регулярно или всегда</b>. Не «прямо сейчас», а «как обычно».</p>
<h2>1. Привычки: что делаем регулярно</h2>
${ex([['I drink tea every morning.','Я пью чай каждое утро.'],['We go to the gym on Fridays.','По пятницам мы ходим в зал.']])}
<h2>2. Факты: что верно всегда</h2>
${ex([['Water boils at 100°C.','Вода кипит при 100 градусах.'],['Cats like fish.','Кошки любят рыбу.']])}
<h2>3. Постоянные ситуации</h2>
${ex([['I live in Kyiv.','Я живу в Киеве.'],['They work in a bank.','Они работают в банке.']])}
<h2>4. Чувства, мысли, желания</h2>
<p>like, love, want, need, know, understand, believe обычно ставят в Present Simple, даже если речь о «сейчас».</p>
${ex([['I want a coffee.','Я хочу кофе (сейчас).'],['I know the answer.','Я знаю ответ.']])}
<h2>5. Расписания</h2>
${ex([['The train leaves at nine.','Поезд отправляется в девять.']])}
<h2>Как строится утверждение</h2>
<div class="rule"><p><b>I / you / we / they</b> + глагол: I <b>work</b>, they <b>work</b></p>
<p><b>he / she / it</b> + глагол + [-s]: she <b>works</b> (подробно в модуле 2)</p></div>
<h2>Слова-маячки</h2>
<p>always, usually, often, sometimes, never, every day, on Mondays, twice a week.</p>
<div class="trap"><b>Ловушка.</b> Не вставляй am / is / are перед обычным глаголом: <s>I am work</s>, <s>They are live here</s>. Нужно I work, They live here. Am / is / are нужны, когда глагола действия нет: I am tired.</div>`,
questions: [
{q:"I ___ coffee every morning.",a:'drink',ru:'Я пью кофе каждое утро.',w:{
 drink:'Every morning = привычка. С I глагол стоит в чистом виде → drink.',
 drinks:'Окончание [-s] только для he, she, it. Здесь I.',
 'am drink':'Am не ставится перед обычным глаголом. Действие уже выражено словом drink.'}},
{q:"They ___ in a small town.",a:'live',ru:'Они живут в маленьком городе.',w:{
 live:'Постоянная ситуация, с they глагол без окончания → live.',
 lives:'[-s] бывает с he, she, it. They («они») в настоящем без [-s].',
 'are live':'Are и глагол live вместе лишние. Are нужно без глагола действия: They are happy.'}},
{q:"Water ___ at 100 degrees.",a:'boils',ru:'Вода кипит при 100 градусах.',w:{
 boil:'Факт распознан, но water = it, а с it нужно [-s].',
 boils:'Факт, верный всегда. Water = it → boil + [-s].',
 'is boils':'Is перед обычным глаголом в Present Simple не ставят.'}},
{q:"Какое предложение говорит о привычке?",a:'We play chess on Sundays.',ru:'По воскресеньям мы играем в шахматы.',w:{
 'We play chess on Sundays.':'On Sundays = каждое воскресенье, регулярно. Это привычка, Present Simple.',
 'We are playing chess now.':'Now и форма are playing говорят о моменте речи, а не о привычке.',
 'We played chess last Sunday.':'Last Sunday и played это один раз в прошлом.'}},
{q:"Когда Present Simple НЕ подходит?",a:'Действие идёт прямо сейчас: «Тише, ребёнок спит»',w:{
 'Действие идёт прямо сейчас: «Тише, ребёнок спит»':'Верно: для процесса в момент речи нужен Present Continuous: The baby is sleeping.',
 'Факт: «Солнце встаёт на востоке»':'Факты как раз для Present Simple: The sun rises in the east.',
 'Привычка: «Я бегаю по утрам»':'Привычки как раз для Present Simple: I run in the mornings.'}},
{q:"I ___ your idea. Let's do it!",a:'like',ru:'Мне нравится твоя идея. Давай!',w:{
 like:'Like выражает чувство, его ставят в Present Simple. С I без окончания.',
 'am like':'Am like значило бы «я похож на». Перед обычным глаголом am не нужно.',
 likes:'[-s] только с he, she, it.'}},
{q:"The film ___ at seven. Let's hurry!",a:'starts',ru:'Фильм начинается в семь. Поспешим!',w:{
 start:'Расписание, верно, но film = it. Нужно [-s].',
 starts:'Расписание → Present Simple. The film = it → starts.',
 'is start':'Is и обычный глагол вместе не стоят.'}},
{q:"We ___ tired today.",a:'are',ru:'Мы сегодня устали.',w:{
 are:'Tired прилагательное, глагола действия нет. Поэтому нужна форма to be: we are.',
 do:'[do] помогает глаголу в вопросах и отрицаниях. Связать we и tired может только are.',
 'ничего':'По-русски «мы уставшие» без глагола, но в английском предложению нужен глагол: are.'}},
{q:"Найди предложение БЕЗ ошибки.",a:'My parents work a lot.',w:{
 'My parents are work a lot.':'Are перед обычным глаголом work лишнее.',
 'My parents work a lot.':'My parents = they, глагол без [-s]. Всё верно.',
 'My parents works a lot.':'Parents это «они». [-s] нужно только для he, she, it.'}},
{q:"I ___ understand your question. Can you repeat it?",a:"don't",ru:'Я не понимаю твой вопрос. Можешь повторить?',w:{
 "don't":"Understand обычный глагол, отрицание с I строится через [don't].",
 "am not":'Am not ставят без глагола действия: I am not tired. Здесь есть understand.',
 not:'Одного not мало: в английском ему нужен помощник [do].'}},
]},

/* ============ 2 ============ */
{ id:'s', title:'Окончание [-s]: he, she, it', desc:'Кому нужно и как пишется',
theory: `
<div class="rule"><b>Правило.</b> Если можно сказать «он», «она» или «оно» (he, she, it), глагол получает [-s]. Всем остальным [-s] не нужно.</div>
${ex([
 ['I / you / we / they work','без окончания'],
 ['he / she / it work<b>s</b>','с [-s]'],
])}
<h2>Сначала замени подлежащее</h2>
${ex([
 ['My brother → he','My brother work<b>s</b>'],
 ['The shop → it','The shop open<b>s</b> at nine'],
 ['Ann and I → we','Ann and I work'],
 ['Tom and Ann → they','Tom and Ann work'],
 ['Everybody, nobody → как he','Everybody know<b>s</b>'],
])}
<h2>Как писать</h2>
${ex([
 ['Обычно просто -s','work → works, play → plays'],
 ['После -s, -sh, -ch, -x, -z, -o: -es','watch → watches, wash → washes, go → goes, do → does'],
 ['Согласная + y: меняем на -ies','study → studies, cry → cries'],
 ['Гласная + y: просто -s','play → plays, buy → buys'],
 ['Исключение','have → has'],
])}
<p>Зачем -es: «watchs» трудно произнести, гласный звук помогает: «уотчиз».</p>
<div class="trap"><b>Ловушка.</b> У существительных -s значит «много», а у глаголов [-s] значит «он один». Поэтому -s обычно только в одном месте: The boy run<b>s</b>. The boy<b>s</b> run.</div>
<p><b>Ещё ловушка.</b> После can, must, will, should [-s] не бывает: she can swim, а не <s>she can swims</s>.</p>`,
questions: [
{q:"My sister ___ in a hospital.",a:'works',ru:'Моя сестра работает в больнице.',w:{
 work:'My sister = she, а с she глаголу нужно [-s].',
 works:'My sister = she → work + [-s].',
 workes:'Work заканчивается на k, после него просто -s. -es нужно после -s, -sh, -ch, -x, -o.'}},
{q:"He ___ TV in the evening.",a:'watches',ru:'Вечером он смотрит телевизор.',w:{
 watch:'С he обязательно окончание.',
 watchs:'Окончание нужно, но после -ch пишется -es: иначе не произнести.',
 watches:'He → окончание, после -ch это -es.'}},
{q:"She ___ English every day.",a:'studies',ru:'Она учит английский каждый день.',w:{
 study:'С she нужно окончание.',
 studys:'Перед y стоит согласная d, поэтому y меняется на ie: studies.',
 studies:'Согласная + y → -ies.'}},
{q:"He ___ football very well.",a:'plays',ru:'Он очень хорошо играет в футбол.',w:{
 play:'С he нужно [-s].',
 plaies:'Y меняется только после согласной. Перед y стоит гласная a, значит просто -s.',
 plays:'He → окончание. Гласная + y → просто -s.'}},
{q:"Ann and Max ___ in this street.",a:'live',ru:'Анна и Макс живут на этой улице.',w:{
 live:'Ann and Max = they, двое → без [-s].',
 lives:'Max один взял бы [-s], но здесь двое: they.'}},
{q:"My dog ___ long ears.",a:'has',ru:'У моей собаки длинные уши.',w:{
 have:'My dog = it. С he, she, it have меняется на has.',
 haves:'Логично, но have исключение: не haves, а has.',
 has:'My dog = it → has, особая форма от have.'}},
{q:"He ___ to school by bus.",a:'goes',ru:'Он ездит в школу на автобусе.',w:{
 go:'С he нужно окончание.',
 gos:'После -o пишется -es: goes.',
 goes:'He → окончание, после -o это -es.'}},
{q:"The boys ___ in the park after school.",a:'run',ru:'Мальчики бегают в парке после школы.',w:{
 run:'The boys = they → без [-s]. Буква -s уже у существительного.',
 runs:'Runs было бы с одним мальчиком: The boy runs.'}},
{q:"Everybody ___ this song.",a:'knows',ru:'Все знают эту песню.',w:{
 know:'По-русски «все» множественное, но everybody = «каждый» и работает как he.',
 knows:'Everybody грамматически «каждый», один → [-s].'}},
{q:"She can ___ three languages.",a:'speak',ru:'Она умеет говорить на трёх языках.',w:{
 speak:'После can глагол всегда в чистом виде, даже с she.',
 speaks:'She speaks верно без can. После can, must, will [-s] исчезает.',
 'to speak':'После can частица to не ставится.'}},
{q:"My friend and I ___ the same music.",a:'like',ru:'Нам с другом нравится одна музыка.',w:{
 like:'My friend and I = we → без [-s].',
 likes:'Один friend взял бы [-s], но вместе с I получается we.'}},
{q:"The bank ___ at six.",a:'closes',ru:'Банк закрывается в шесть.',w:{
 close:'The bank = it, нужно [-s].',
 closes:'The bank = it → closes.',
 'is closes':'Is и глагол с [-s] вместе не стоят.'}},
{q:"My mother ___ the dishes after dinner.",a:'washes',ru:'Мама моет посуду после ужина.',w:{
 wash:'My mother = she, нужно окончание.',
 washs:'После -sh пишется -es.',
 washes:'She → окончание, после -sh это -es.'}},
{q:"The children ___ sweets.",a:'love',ru:'Дети обожают сладости.',w:{
 love:'Children множественное число = they → без [-s].',
 loves:'На конце children нет -s, но это «дети», they. [-s] было бы с child.'}},
]},

/* ============ 3 ============ */
{ id:'negative', title:"Отрицание: [don't] и [doesn't]", desc:'Как сказать «не»',
theory: `
<p>Одного not для отрицания мало. Нужен помощник [do] или [does]. После него глагол стоит <b>в чистом виде</b>.</p>
${ex([
 ["I / you / we / they + [don't] + глагол","I [don't] work"],
 ["he / she / it + [doesn't] + глагол","she [doesn't] work"],
])}
<h2>Куда делась [-s]?</h2>
<div class="rule"><p>[-s] одна на предложение. Помощник забирает её себе: do + es = [does].</p>
<p>She work<b>s</b> → She [doesn't] work</p></div>
${ex([
 ['He likes tea.',"He [doesn't] like tea."],
 ['She has a car.',"She [doesn't] have a car."],
 ['They live here.',"They [don't] live here."],
])}
<h2>Когда [don't] не нужен</h2>
<p>С am / is / are и can помощник не нужен, они сами умеют отрицать:</p>
${ex([
 ['I am tired.','I am not tired.'],
 ['She is at home.',"She isn't at home."],
 ['He can swim.',"He can't swim."],
])}
<div class="trap"><b>Ловушки.</b><br>1. Двойная [-s]: <s>She doesn't works</s>.<br>2. Без помощника: <s>I not like</s>.<br>3. Два отрицания: <s>I don't never drink</s>. По-русски «никогда не пью», по-английски одно «не»: I never drink.</div>`,
questions: [
{q:"I ___ like fish.",a:"don't",ru:'Я не люблю рыбу.',w:{
 "don't":"С I помощник [do] + not = [don't].",
 "doesn't":"[doesn't] только для he, she, it.",
 "am not":'Am not ставят без глагола действия. Здесь есть like.'}},
{q:"She ___ eat meat.",a:"doesn't",ru:'Она не ест мясо.',w:{
 "don't":"[don't] для I, you, we, they. С she нужен помощник с [-s].",
 "doesn't":"С she → [does] + not = [doesn't].",
 "isn't":"Isn't ставят без глагола действия. Здесь есть eat."}},
{q:"He doesn't ___ in this office.",a:'work',ru:'Он не работает в этом офисе.',w:{
 work:"[doesn't] уже забрал [-s], глагол остаётся в чистом виде.",
 works:"[-s] уже есть внутри [doesn't]. Второй раз её не ставят.",
 working:"После [doesn't] только чистый глагол, без -ing."}},
{q:"My parents ___ speak English.",a:"don't",ru:'Мои родители не говорят по-английски.',w:{
 "don't":"My parents = they → [don't].",
 "doesn't":"[doesn't] для одного: he, she, it. Родителей двое.",
 "aren't":"Aren't не сочетается с чистым глаголом speak."}},
{q:"My phone ___ work.",a:"doesn't",ru:'Мой телефон не работает.',w:{
 "don't":"My phone = it, а [don't] для I, you, we, they.",
 "doesn't":"My phone = it → [doesn't].",
 "isn't":"Isn't не сочетается с чистым глаголом work."}},
{q:"She doesn't ___ a car.",a:'have',ru:'У неё нет машины.',w:{
 has:"Has это have с [-s] внутри, а [-s] уже забрал [doesn't].",
 have:"После [doesn't] чистая форма: have.",
 having:"После [doesn't] форма на -ing не ставится."}},
{q:"I ___ hungry, thank you.",a:'am not',ru:'Я не голоден, спасибо.',w:{
 "don't":"[don't] нужен перед глаголом действия. Hungry прилагательное.",
 'am not':'Hungry прилагательное, глагола действия нет → am not.',
 "doesn't":"[doesn't] для he, she, it, и только перед глаголом."}},
{q:"He ___ drinks coffee.",a:'never',ru:'Он никогда не пьёт кофе.',w:{
 never:'Never уже значит «никогда не», второе отрицание не нужно. Drinks сохраняет [-s].',
 "doesn't never":"Два отрицания подряд. По-русски так можно, по-английски нет.",
 "doesn't":"После [doesn't] было бы drink, без [-s]. А здесь drinks."}},
{q:"Какое предложение верное?",a:"Tom doesn't know the answer.",ru:'Том не знает ответа.',w:{
 "Tom doesn't knows the answer.":"Двойная [-s]: в [doesn't] и в knows. Достаточно одной.",
 "Tom don't know the answer.":"Tom = he, нужен [doesn't].",
 "Tom doesn't know the answer.":"Tom = he → [doesn't] + чистый глагол. Верно."}},
{q:"We ___ watch TV. We read books.",a:"don't",ru:'Мы не смотрим телевизор. Мы читаем книги.',w:{
 "don't":"С we → [don't] + чистый глагол.",
 "aren't":"Aren't с чистым глаголом watch не сочетается.",
 not:'Not без помощника не работает.'}},
{q:"She ___ swim.",a:"can't",hint:'«Не умеет плавать».',ru:'Она не умеет плавать.',w:{
 "can't":"Can само умеет отрицать: can't. Помощник [does] не нужен.",
 "doesn't can":"Can не берёт помощника [does], он сам помощник.",
 "isn't can":'Is и can вместе не стоят.'}},
{q:"It ___ rain here in summer.",a:"doesn't",ru:'Летом здесь не идёт дождь.',w:{
 "don't":"С it нужен помощник с [-s].",
 "doesn't":"It → [doesn't], rain здесь глагол.",
 "isn't":"Rain стоит как чистый глагол, isn't с ним не сочетается."}},
{q:"Найди предложение С ОШИБКОЙ.",a:"I not understand.",w:{
 "I not understand.":"Ошибка здесь: нет помощника. Нужно I [don't] understand.",
 "I am not ready.":"Здесь всё верно: ready прилагательное → am not.",
 "You don't listen.":"Здесь всё верно: you + [don't] + чистый глагол."}},
]},

/* ============ 4 ============ */
{ id:'questions', title:'Вопросы: [do] и [does]', desc:'Порядок слов, краткие ответы, who',
theory: `
<p>Чтобы спросить, помощник выходит <b>вперёд</b>, перед подлежащим. Глагол снова в чистом виде.</p>
${ex([
 ['You work.','[Do] you work?'],
 ['She works.','[Does] she work?'],
])}
<div class="rule"><b>Схема:</b> (вопросительное слово) + [do] / [does] + кто + глагол<br>Where [do] you live? What time [does] he get up?</div>
<h2>Краткий ответ</h2>
${ex([
 ['[Do] you like tea?',"Yes, I [do]. / No, I [don't]."],
 ['[Does] he work here?',"Yes, he [does]. / No, he [doesn't]."],
])}
<p>В кратком ответе повторяем помощник, а не глагол: не <s>Yes, I like</s>.</p>
<h2>Где помощник не нужен</h2>
${ex([
 ['am / is / are сами выходят вперёд','Are you tired? Is she at home?'],
 ['can тоже','Can you swim?'],
 ['Who / What спрашивают про того, кто делает','Who <b>lives</b> here? What <b>helps</b> you?'],
])}
<p>Почему после who стоит [-s]: who занимает место подлежащего («кто?» = он), поэтому порядок как в обычном предложении.</p>
${ex([
 ['Who <b>loves</b> Ann?','Кто любит Анну? who = тот, кто любит'],
 ['Who [does] Ann love?','Кого любит Анна? любит Анна'],
])}
<div class="trap"><b>Ловушки.</b> <s>Does she works?</s>: [-s] уже в [does]. <s>Are you like it?</s>: есть глагол like → [Do] you like it? <s>Where you live?</s>: забыт [do].</div>`,
questions: [
{q:"___ you like pizza?",a:'do',ru:'Ты любишь пиццу?',w:{
 do:'Есть глагол like, подлежащее you → [do].',
 does:'[does] для he, she, it.',
 are:'Are нужно без глагола действия: Are you hungry? Здесь есть like.'}},
{q:"___ your brother play football?",a:'does',ru:'Твой брат играет в футбол?',w:{
 do:'Your brother = he, ему нужен помощник с [-s].',
 does:'Your brother = he → [does] + чистый глагол play.',
 is:'Is не сочетается с чистым глаголом play.'}},
{q:"Does she ___ in London?",a:'live',ru:'Она живёт в Лондоне?',w:{
 live:'[-s] уже в [does], глагол чистый.',
 lives:'Двойная [-s]: одна уже в [does].',
 living:'После [does] форма на -ing не ставится.'}},
{q:"Where ___ they work?",a:'do',ru:'Где они работают?',w:{
 do:'They → [do], он стоит после where и перед they.',
 does:'[does] для одного: he, she, it.',
 are:'Are не сочетается с чистым глаголом work.'}},
{q:"___ you tired?",a:'are',ru:'Ты устал?',w:{
 do:'[do] нужен, когда есть глагол действия. Tired прилагательное.',
 are:'Глагола действия нет, с you → are.',
 does:'[does] для he, she, it, и только с глаголом.'}},
{q:"Do you speak English? – Yes, I ___.",a:'do',ru:'Ты говоришь по-английски? – Да.',w:{
 do:'Повторяем помощник из вопроса: Do you...? – Yes, I [do].',
 speak:'По-русски «да, говорю», но в английском в кратком ответе повторяют помощник.',
 am:'Вопрос был с [do], am отвечает на Are you...?'}},
{q:"Does Max know you? – No, he ___.",a:"doesn't",ru:'Макс тебя знает? – Нет.',w:{
 "doesn't":"Помощник из вопроса [does] + not.",
 "don't":"С he нужен [doesn't].",
 "isn't":"Isn't отвечает на вопрос Is he...? А здесь Does."}},
{q:"Who ___ in this house?",hint:'Вопрос «кто живёт?»',a:'lives',ru:'Кто живёт в этом доме?',w:{
 lives:'Who здесь само подлежащее (= he). Порядок обычный, глагол с [-s].',
 live:'Who в роли «кто» работает как he, поэтому нужно [-s].',
 'does live':'Who уже стоит на месте подлежащего, помощник не нужен.'}},
{q:"What time ___ the shop open?",a:'does',ru:'Во сколько открывается магазин?',w:{
 do:'The shop = it, нужен [does].',
 does:'The shop = it → [does] перед подлежащим, глагол open чистый.',
 is:'Is с глаголом open как действием не подходит: спрашивают «во сколько открывается».'}},
{q:"Какой вопрос верный?",a:'How often do you read?',ru:'Как часто ты читаешь?',w:{
 'How often you read?':'Забыт помощник [do] перед you.',
 'How often do you read?':'Вопросительные слова + [do] + you + глагол. Верно.',
 'How often are you read?':'Are с чистым глаголом read не сочетается.'}},
{q:"Переведи: «Что она хочет?»",a:'What does she want?',w:{
 'What she wants?':'Порядок как в русском, но нет помощника [does].',
 'What does she wants?':'Двойная [-s]: в [does] и в wants.',
 'What does she want?':'What + [does] + she + чистый глагол.'}},
{q:"___ Ann at home now?",a:'is',ru:'Анна сейчас дома?',w:{
 is:'At home место, глагола действия нет. Ann = she → is.',
 does:'[does] нужен с глаголом действия. Здесь его нет.',
 do:'[do] не для she, и глагола действия нет.'}},
{q:"___ your children go to school?",a:'do',ru:'Твои дети ходят в школу?',w:{
 do:'Children = they → [do].',
 does:'Children «дети», множественное, хотя без -s. [does] было бы с child.',
 are:'Are с чистым глаголом go не сочетается.'}},
{q:"Найди вопрос С ОШИБКОЙ.",a:'Are you like music?',w:{
 'Are you like music?':'Ошибка здесь: есть глагол like, нужен [Do] you like music?',
 'Can he drive?':'Здесь всё верно: can сам выходит вперёд.',
 'Does it help?':'Здесь всё верно: it → [does] + чистый глагол.'}},
]},

/* ============ 5 ============ */
{ id:'frequency', title:'Привычки: always, usually, never', desc:'Где стоят слова частоты',
theory: `
<p>Говоря о привычках, почти всегда добавляют «как часто».</p>
${ex([
 ['always','всегда'],['usually','обычно'],['often','часто'],['sometimes','иногда'],['rarely','редко'],['never','никогда'],
])}
<h2>Где стоят</h2>
${ex([
 ['<b>Перед</b> обычным глаголом','I <b>always</b> drink tea.'],
 ['<b>После</b> am / is / are','She is <b>always</b> late.'],
 ['<b>Между</b> помощником и глаголом',"I [don't] <b>usually</b> eat meat. [Do] you <b>often</b> read?"],
])}
<div class="rule"><b>Запомнить легко:</b> перед действием, но после am / is / are.</div>
<h2>Фразы из нескольких слов стоят в конце</h2>
${ex([
 ['every day, every week','I run every day.'],
 ['once a week, twice a month','We meet twice a month.'],
 ['on Mondays','He works on Mondays.'],
])}
<p>Sometimes и usually можно поставить и в начало: Sometimes I cook.</p>
<h2>Спросить о частоте</h2>
${ex([['How often [do] you cook?','Как часто ты готовишь?']])}
<div class="trap"><b>Ловушка.</b> [-s] не исчезает после always и never: <i>He never drink<b>s</b></i>. Эти слова не помощники, они [-s] не забирают. И never не дружит с [don't]: <s>I don't never</s>.</div>`,
questions: [
{q:"Какое предложение верное?",a:'She always drinks tea.',ru:'Она всегда пьёт чай.',w:{
 'She drinks always tea.':'Always разорвало глагол и tea. Его место перед глаголом.',
 'She always drinks tea.':'Слово частоты перед обычным глаголом, [-s] на месте.',
 'She always drink tea.':'Место верное, но с she нужно [-s]: always его не забирает.'}},
{q:"Какое предложение верное?",a:'He is never late.',ru:'Он никогда не опаздывает.',w:{
 'He never is late.':'Перед глаголом ставят только с действиями. С is слово частоты обычно стоит после.',
 'He is never late.':'После is → never. Отрицание одно.',
 "He isn't never late.":"Два отрицания: isn't и never. Нужно одно."}},
{q:"My father never ___ meat.",a:'eats',ru:'Папа никогда не ест мясо.',w:{
 eat:'My father = he. Never не помощник и [-s] не забирает.',
 eats:'He → [-s], never её не отменяет.',
 "doesn't eat":"Never уже значит «никогда не». С [doesn't] будет два отрицания."}},
{q:"___ do you go to the gym? – Twice a week.",a:'How often',ru:'Как часто ты ходишь в зал? – Два раза в неделю.',w:{
 'How often':'Ответ twice a week говорит о частоте → How often.',
 'How long':'How long спрашивает о длительности: for two hours.',
 'What time':'What time спрашивает о времени: at six.'}},
{q:"Какое предложение верное?",a:'I run every day.',ru:'Я бегаю каждый день.',w:{
 'I every day run.':'Every day из двух слов, между I и глаголом его не ставят. Место в конце.',
 'I run every day.':'Фраза частоты из нескольких слов стоит в конце.',
 'I am run every day.':'Am перед обычным глаголом лишнее.'}},
{q:"Какое предложение верное?",a:"We don't often eat out.",ru:'Мы нечасто едим вне дома.',w:{
 "We often not eat out.":"Not без помощника не работает, нужен [don't].",
 "We don't often eat out.":"Помощник [don't] + often + глагол. Верно.",
 "We don't eat often out.":'Often разорвало выражение eat out.'}},
{q:"Sometimes she ___ at home.",a:'works',ru:'Иногда она работает дома.',w:{
 work:'С she нужно [-s], sometimes на это не влияет.',
 works:'She → works. Sometimes может стоять в начале.',
 'is work':'Is с обычным глаголом вместе не стоит.'}},
{q:"Какой вопрос верный?",a:'Do you usually get up early?',ru:'Ты обычно встаёшь рано?',w:{
 'Do you usually get up early?':'[do] + you + usually + глагол. Верно.',
 'Do usually you get up early?':'После [do] сразу идёт подлежащее you, потом usually.',
 'Are you usually get up early?':'Есть глагол get up, поэтому [do], а не are.'}},
{q:"I ___ drink coffee at night. I can't sleep after it.",a:'never',ru:'Я никогда не пью кофе ночью. После него не сплю.',w:{
 never:'По смыслу «никогда не»: кофе мешает спать. Отрицание одно.',
 always:'По смыслу наоборот: после кофе не уснуть, значит не пьёт.',
 "don't never":'Два отрицания в одном предложении нельзя.'}},
{q:"The buses here ___ late.",a:'are often',ru:'Автобусы здесь часто опаздывают.',w:{
 'are often':'Late прилагательное, нужен are, а слово частоты после него.',
 'often are':'С are слово частоты обычно стоит после, а не перед.',
 'often':'Без are предложение осталось без глагола: late не глагол.'}},
]},

/* ============ 6 ============ */
{ id:'mix', title:'Всё вместе', desc:'Смешанные предложения и поиск ошибок',
theory: `
<p>Вся тема в одной таблице:</p>
${ex([
 ['<b>I / you / we / they</b>','<b>he / she / it</b>'],
 ['+ I work','+ She works'],
 ["− I [don't] work","− She [doesn't] work"],
 ['? [Do] you work?','? [Does] she work?'],
])}
<h2>Три вопроса себе</h2>
<div class="rule"><ol class="alg">
<li><b>Есть глагол действия?</b> Нет → am / is / are. Да → вопрос 2.</li>
<li><b>Кто делает?</b> he, she, it → [-s] или [does]. Остальные → без окончания или [do].</li>
<li><b>Уже есть [does] или [doesn't]?</b> Да → глагол чистый, второй [-s] нет.</li>
</ol></div>
<h2>Рассказ целиком</h2>
<div class="rule">My name is Anna. I live in a big city and work in a bank. My husband Max works at home. He gets up at nine, but I get up at six. He [doesn't] drink coffee, and I [don't] eat breakfast. We usually have dinner together. [Does] he cook? Yes, he [does], and he is never tired of it!</div>
<p>Прочитай вслух и объясни каждый глагол. Потом тест, а после него «Тренажёр автоматизма».</p>`,
questions: [
{q:"My husband ___ up at seven.",a:'gets',ru:'Мой муж встаёт в семь.',w:{
 get:'My husband = he, нужно [-s].',
 gets:'He → gets.',
 'is get':'Is с обычным глаголом вместе не стоит.'}},
{q:"___ it often snow in your country?",a:'does',ru:'В твоей стране часто идёт снег?',w:{
 do:'С it нужен [does].',
 does:'It + глагол snow → [does].',
 is:'Snow стоит как чистый глагол, is с ним не сочетается.'}},
{q:"The sun ___ in the east.",a:'rises',ru:'Солнце встаёт на востоке.',w:{
 rise:'The sun = it, нужно [-s].',
 rises:'Факт, the sun = it → rises.',
 'does rise':'[does] в утверждении нужен только для особого усиления. Обычный факт: rises.'}},
{q:"My cat doesn't ___ milk.",a:'like',ru:'Моя кошка не любит молоко.',w:{
 like:"После [doesn't] глагол чистый.",
 likes:"[-s] уже внутри [doesn't].",
 liking:"После [doesn't] нет формы на -ing."}},
{q:"Why ___ you angry?",a:'are',ru:'Почему ты злишься?',w:{
 do:'По-русски «злишься» глагол, но angry прилагательное. Нужно are.',
 are:'Angry прилагательное, глагола действия нет → are.',
 does:'[does] не для you и не для прилагательных.'}},
{q:"Tom and his sister ___ to the same school.",a:'go',ru:'Том и его сестра ходят в одну школу.',w:{
 go:'Двое = they → без [-s].',
 goes:'Sister рядом с глаголом сбивает, но подлежащее Tom and his sister = they.'}},
{q:"Who ___ the dog in your family?",hint:'Вопрос «кто кормит?»',a:'feeds',ru:'Кто в вашей семье кормит собаку?',w:{
 feed:'Who = «кто», работает как he, нужно [-s].',
 feeds:'Who само подлежащее → глагол с [-s], помощник не нужен.',
 'does feed':'Когда who само подлежащее, [does] не ставят.'}},
{q:"He must ___ now.",a:'go',ru:'Он должен сейчас идти.',w:{
 go:'После must глагол чистый.',
 goes:'He goes верно без must. После must [-s] исчезает.',
 'to go':'После must частица to не ставится.'}},
{q:"Переведи: «Она не работает по пятницам.»",a:"She doesn't work on Fridays.",w:{
 "She doesn't works on Fridays.":"Двойная [-s]: в [doesn't] и в works.",
 "She doesn't work on Fridays.":"She + [doesn't] + чистый глагол. Верно.",
 "She isn't work on Fridays.":"Есть глагол work, поэтому [doesn't], а не isn't."}},
{q:"Переведи: «Где живёт твой друг?»",a:'Where does your friend live?',w:{
 'Where lives your friend?':'Порядок слов русский. В английском нужен помощник [does].',
 'Where does your friend lives?':'Двойная [-s]: в [does] и в lives.',
 'Where does your friend live?':'Where + [does] + кто + чистый глагол. Верно.'}},
{q:"Переведи: «Я никогда не ем рыбу.»",a:'I never eat fish.',w:{
 'I never eat fish.':'Never перед глаголом, отрицание одно. Верно.',
 "I don't never eat fish.":'Два отрицания, калька с русского «никогда не».',
 'I am never eat fish.':'Am перед обычным глаголом лишнее.'}},
{q:"Do your friends know? – No, they ___.",a:"don't",ru:'Твои друзья знают? – Нет.',w:{
 "don't":"Помощник из вопроса [do] + not.",
 "doesn't":"They → [don't], а [doesn't] для he, she, it.",
 "aren't":"Aren't отвечает на Are they...?, а вопрос был с Do."}},
{q:"My brother ___ two children.",a:'has',ru:'У моего брата двое детей.',w:{
 have:'My brother = he, с ним has.',
 has:'He → has, особая форма have.',
 is:'Is значит «является». «У него есть» = he has.'}},
{q:"The baby ___ a lot at night.",a:'cries',ru:'Малыш много плачет по ночам.',w:{
 cry:'The baby = he / she / it, нужно окончание.',
 crys:'Перед y согласная r, поэтому y меняется: cries.',
 cries:'Согласная + y → -ies.'}},
{q:"Nobody ___ his phone number.",a:'knows',ru:'Никто не знает его номер.',w:{
 know:'Nobody работает как he, нужно [-s].',
 knows:'Nobody = как he → [-s]. Отрицание уже внутри слова.',
 "doesn't know":"Nobody уже отрицание, второе не нужно."}},
{q:"Найди предложение БЕЗ ошибки.",a:'Does your job make you happy?',w:{
 'Does your job make you happy?':'Your job = it → [does] + чистый глагол make. Верно.',
 'Does your job makes you happy?':'Двойная [-s]: в [does] и в makes.',
 'Do your job make you happy?':'Your job = it, нужен [does].'}},
{q:"Найди предложение С ОШИБКОЙ.",a:'She always is happy.',w:{
 'She always is happy.':'Ошибка здесь: с is слово частоты ставят после: She is always happy.',
 'She always smiles.':'Здесь всё верно: always перед обычным глаголом.',
 'She is often busy.':'Здесь всё верно: often после is.'}},
{q:"These glasses ___ to my sister.",a:'belong',ru:'Эти очки принадлежат моей сестре.',w:{
 belong:'These glasses = they → без [-s].',
 belongs:'Очки одна вещь, но glasses всегда множественное: they.',
 'are belong':'Are с обычным глаголом вместе не стоит.'}},
]},

]});
})();
