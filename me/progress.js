/* Что веду я (Claude) после каждого твоего отчёта.
   ERRORS: твои типичные ошибки. seen = даты отчётов, где ошибка была; clean = даты, где был шанс ошибиться, но ошибки не было.
     Статус: ошибка была в последнем отчёте → «активна»; 1–2 чистых отчёта подряд → «уходит»; 3 и больше → «побеждена».
     Если в один день было два текста, второй пишется как 'ГГГГ-ММ-ДД.1' (так он сортируется после первого).
   SNAPSHOTS: контрольные срезы (раз в месяц + стартовый). err100 = ошибок на 100 слов без опечаток. */
export const ERRORS = [
{id:'be-missing', title:'Пропуск am / is / are', bad:'my English in beginner stage', good:'My English is at a beginner level', topic:'to-be', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'do-be', title:'don\'t вместо am not, и наоборот', bad:"I don't sure · I'm not understand it", good:"I'm not sure · I don't understand it", topic:'to-be/or-verb', seen:['2026-11-26.1'], clean:[]},
{id:'ps-s', title:'Окончание -s в Present Simple', bad:'he lives and work · I makes · societies works', good:'he lives and works · I make · societies work', topic:'present-simple/s', seen:['2026-11-26.1'], clean:['2026-11-26.2']},
{id:'article-a', title:'Пропуск a / an перед профессией и предметом', bad:'I work in IT company · I am creator', good:'I work in an IT company · I am a creator', topic:'articles-1/a-use', seen:['2026-11-26.1','2026-11-26.2'], clean:[]},
{id:'no-subject', title:'Нет подлежащего (it)', bad:'hard, but is interesting', good:"hard, but it's interesting / hard but interesting", topic:'', seen:['2026-11-26.1'], clean:[]},
{id:'ing-subject', title:'Действие как подлежащее без -ing', bad:'Learn something makes brain more clever', good:'Learning something makes your brain stronger', topic:'', seen:['2026-11-26.1'], clean:[]},
{id:'caps', title:'Заглавные: имена, города, начало предложения', bad:'berlin · tomas ligotty · but we should', good:'Berlin · Thomas Ligotti · But we should', topic:'', seen:['2026-11-26.1','2026-11-26.2'], clean:[]},
{id:'to-ing', title:'to + -ing вместо to + глагол', bad:'make an effort to writing', good:'make an effort to write', topic:'', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'country', title:'Страна или национальность', bad:'I live in German', good:'I live in Germany', topic:'to-be/which', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'double-verb', title:'Два глагола подряд', bad:"I'm studying to study English", good:"I'm learning English", topic:'to-be/or-verb', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'native', title:'native вместо native speakers', bad:'speak to native', good:'speak with native speakers', topic:'', seen:['2026-11-26'], clean:['2026-11-26.1']},
{id:'cap-i', title:'i с маленькой буквы', bad:'i want', good:'I want', topic:'', seen:['2026-11-26'], clean:['2026-11-26.1']}
];

export const SNAPSHOTS = [
{date:'2026-11-26', what:'Стартовый текст о себе (письмо)', words:41, err100:12, typos:3, level:'A1+ / A2−',
 note:'Мысль передаёт, связки because и but уже есть. Главное: пропуск to be, to + -ing.'}
];
