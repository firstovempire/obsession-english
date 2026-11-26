/* Что веду я (Claude) после каждого твоего отчёта.
   ERRORS: твои типичные ошибки. seen = даты отчётов, где ошибка была; clean = даты, где был шанс ошибиться, но ошибки не было.
     Статус: ошибка была в последнем отчёте → «активна»; 1–2 чистых отчёта подряд → «уходит»; 3 и больше → «побеждена».
   SNAPSHOTS: контрольные срезы (раз в месяц + стартовый). err100 = ошибок на 100 слов без опечаток. */
ERRORS.push(
{id:'be-missing', title:'Пропуск am / is / are', bad:'my English in beginner stage', good:'My English is at a beginner level', topic:'to-be', seen:['2026-11-26'], clean:[]},
{id:'to-ing', title:'to + -ing вместо to + глагол', bad:'make an effort to writing', good:'make an effort to write', topic:'', seen:['2026-11-26'], clean:[]},
{id:'country', title:'Страна или национальность', bad:'I live in German', good:'I live in Germany', topic:'to-be/which', seen:['2026-11-26'], clean:[]},
{id:'double-verb', title:'Два глагола подряд', bad:"I'm studying to study English", good:"I'm learning English", topic:'to-be/or-verb', seen:['2026-11-26'], clean:[]},
{id:'native', title:'native вместо native speakers', bad:'speak to native', good:'speak with native speakers', topic:'', seen:['2026-11-26'], clean:[]},
{id:'cap-i', title:'i с маленькой буквы', bad:'i want', good:'I want', topic:'', seen:['2026-11-26'], clean:[]}
);

SNAPSHOTS.push(
{date:'2026-11-26', what:'Стартовый текст о себе (письмо)', words:41, err100:12, typos:3, level:'A1+ / A2−',
 note:'Мысль передаёт, связки because и but уже есть. Главное: пропуск to be, to + -ing.'}
);
