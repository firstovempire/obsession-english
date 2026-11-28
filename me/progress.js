/* Что веду я (Claude) после каждого твоего отчёта.
   ERRORS: твои типичные ошибки. seen = даты отчётов, где ошибка была; clean = даты, где был шанс ошибиться, но ошибки не было.
     Статус: ошибка была в последнем отчёте → «активна»; 1–2 чистых отчёта подряд → «уходит»; 3 и больше → «побеждена».
     Если в один день было два текста, второй пишется как 'ГГГГ-ММ-ДД.1' (так он сортируется после первого).
   DAILY: цифры каждого отчёта (заполняю я): tr/wu = [верно с первой попытки, всего], typos = опечатки в переводе и разминке,
     tests = средний % тестов дня, letter / speak = слов в письме и в диктовке, min = минут (null = не указано),
     ear / word = промахи видео-интенсива: не узнал на слух / не знал слова.
   SNAPSHOTS: контрольные срезы (раз в месяц + стартовый). err100 = ошибок на 100 слов без опечаток. */
export const ERRORS = [
{id:'be-missing', title:'Пропуск am / is / are', bad:"I from Germany · what your favorite game? · it worth it", good:"I'm from Germany · What's your favorite game? · it's worth it", topic:'to-be', seen:['2026-11-26','2026-11-27'], clean:['2026-11-26.1']},
{id:'do-be', title:'don\'t вместо am not, и наоборот', bad:"I don't sure · I'm not understand it", good:"I'm not sure · I don't understand it", topic:'to-be/or-verb', seen:['2026-11-26.1'], clean:['2026-11-27']},
{id:'ps-s', title:'Окончание -s в Present Simple', bad:'he studies math and watch TV · he lives and work', good:'he studies math and watches TV · he lives and works', topic:'present-simple/s', seen:['2026-11-26.1','2026-11-27'], clean:['2026-11-26.2']},
{id:'article-a', title:'Пропуск a / an перед профессией и предметом', bad:'works for IT company · Workflow is app', good:'works for an IT company · Workflow is an app', topic:'articles-1/a-use', seen:['2026-11-26.1','2026-11-26.2','2026-11-27'], clean:[]},
{id:'prep', title:'Предлоги in / on / at / for', bad:'work on a hospital · works on a factory · on a weekend', good:'work in a hospital · works at a factory · on weekends', topic:'prepositions-1', seen:['2026-11-26.1','2026-11-27'], clean:[]},
{id:'false-friend', title:'Ложные друзья', bad:'fabric (завод) · mode / mood (режим) · fantastic world · serials', good:'factory · sleep schedule · fantasy world · TV series', topic:'', seen:['2026-11-26.1','2026-11-27'], clean:[]},
{id:'no-subject', title:'Нет подлежащего (it, I)', bad:'hard, but is interesting · Then learn English', good:"hard, but it's interesting · Then I learn English", topic:'', seen:['2026-11-26.1','2026-11-27'], clean:[]},
{id:'ing-subject', title:'Действие как подлежащее без -ing', bad:'Learn something makes brain more clever', good:'Learning something makes your brain stronger', topic:'', seen:['2026-11-26.1'], clean:['2026-11-27']},
{id:'verb-verb', title:'Глагол сразу после like / want без to или -ing', bad:'He likes play the guitar', good:'He likes playing the guitar / He likes to play the guitar', topic:'', seen:['2026-11-27'], clean:[]},
{id:'cont-habit', title:'is walking вместо walks для привычки', bad:'every day he is walking · he is usually walking', good:'every night he walks · he usually walks', topic:'present-simple', seen:['2026-11-27'], clean:[]},
{id:'adj-adv', title:'Наречие вместо прилагательного', bad:'loudly places · change faster (= быстро)', good:'loud / noisy places · change quickly', topic:'', seen:['2026-11-27'], clean:[]},
{id:'typos', title:'Опечатки при переводе (больше 2 за модуль)', bad:'quet · tou · engeener · interestig · inderstand · quclky', good:'quiet · you · engineer · interesting · understand · quickly', topic:'', seen:['2026-11-27'], clean:[]},
{id:'caps', title:'Заглавные: имена, города, начало предложения', bad:'germany · aristotle · english · darksoulls', good:'Germany · Aristotle · English · Dark Souls', topic:'', seen:['2026-11-26.1','2026-11-26.2','2026-11-27'], clean:[]},
{id:'to-ing', title:'to + -ing вместо to + глагол', bad:'make an effort to writing', good:'make an effort to write', topic:'', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'country', title:'Страна или национальность', bad:'I live in German', good:'I live in Germany', topic:'to-be/which', seen:['2026-11-26'], clean:['2026-11-26.1','2026-11-27']},
{id:'double-verb', title:'Два глагола подряд', bad:"I'm studying to study English", good:"I'm learning English", topic:'to-be/or-verb', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'native', title:'native вместо native speakers', bad:'speak to native', good:'speak with native speakers', topic:'', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'cap-i', title:'i с маленькой буквы', bad:'i am not german', good:'I am not German', topic:'', seen:['2026-11-26','2026-11-27'], clean:['2026-11-26.1']}
];

export const DAILY = [
{date:'2026-11-26', tr:[4,10], wu:null, typos:1, tests:98, letter:85, speak:90, min:72},
{date:'2026-11-27', tr:[3,12], wu:[2,5], typos:6, tests:99, letter:124, speak:136, min:78, ear:17, word:9}
];

export const SNAPSHOTS = [
{date:'2026-11-26', what:'Стартовый текст о себе (письмо)', words:41, err100:12, typos:3, level:'A1+ / A2−',
 note:'Мысль передаёт, связки because и but уже есть. Главное: пропуск to be, to + -ing.'}
];
