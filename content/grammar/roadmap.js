/* Дорожная карта грамматики A1 → B2. Порядок = порядок изучения.
   Тема с готовым файлом content/grammar/<level>/<id>.js показывается как доступная, остальные серым «скоро».
   Новая тема: создать файл с тем же id и уровнем, запустить node tools/build.js. */
export const GROUPS = [
  'Основа предложения: глагол',
  'Времена',
  'Существительное и слова перед ним',
  'Местоимения',
  'Модальные глаголы',
  'Предлоги и связки',
  'Сложные предложения',
];

export default [
  // A1
  {id:'to-be',            level:'A1', group:'Основа предложения: глагол', title:'To be: am / is / are'},
  {id:'present-simple',   level:'A1', group:'Основа предложения: глагол', title:'Present Simple'},
  {id:'articles-1',       level:'A1', group:'Существительное и слова перед ним', title:'Articles I: a / an / the'},
  {id:'demonstratives',   level:'A1', group:'Существительное и слова перед ним', title:'This / that / these / those'},
  {id:'plurals',          level:'A1', group:'Существительное и слова перед ним', title:'Множественное число: -s, -es, people, children'},
  {id:'pronouns',         level:'A1', group:'Местоимения', title:'I / me / my / mine'},
  {id:'there-is',         level:'A1', group:'Основа предложения: глагол', title:'There is / there are'},
  {id:'can',              level:'A1', group:'Модальные глаголы', title:'Can / can\'t'},
  {id:'prepositions-1',   level:'A1', group:'Предлоги и связки', title:'Предлоги места и времени: in / on / at'},
  // A2
  {id:'present-continuous', level:'A2', group:'Времена', title:'Present Continuous'},
  {id:'simple-vs-continuous', level:'A2', group:'Времена', title:'Present Simple или Continuous'},
  {id:'past-simple',      level:'A2', group:'Времена', title:'Past Simple'},
  {id:'future',           level:'A2', group:'Времена', title:'Will / going to'},
  {id:'questions',        level:'A2', group:'Основа предложения: глагол', title:'Вопросы всех типов'},
  {id:'countable',        level:'A2', group:'Существительное и слова перед ним', title:'some / any / much / many / a lot of'},
  {id:'comparatives',     level:'A2', group:'Существительное и слова перед ним', title:'Сравнение: bigger, the biggest, more interesting'},
  {id:'must-have-to',     level:'A2', group:'Модальные глаголы', title:'Must / have to / should'},
  {id:'articles-2',       level:'A2', group:'Существительное и слова перед ним', title:'Articles II: тонкие случаи'},
  {id:'linking-1',        level:'A2', group:'Предлоги и связки', title:'and / but / because / so / when'},
  // B1
  {id:'present-perfect',  level:'B1', group:'Времена', title:'Present Perfect'},
  {id:'perfect-vs-past',  level:'B1', group:'Времена', title:'Present Perfect или Past Simple'},
  {id:'past-continuous',  level:'B1', group:'Времена', title:'Past Continuous'},
  {id:'used-to',          level:'B1', group:'Времена', title:'Used to / would'},
  {id:'conditionals-1',   level:'B1', group:'Сложные предложения', title:'Условия: 0, 1, 2'},
  {id:'gerund-infinitive', level:'B1', group:'Основа предложения: глагол', title:'-ing или to: enjoy doing, want to do'},
  {id:'relative',         level:'B1', group:'Сложные предложения', title:'who / which / that / where'},
  {id:'modals-2',         level:'B1', group:'Модальные глаголы', title:'might / could / must (предположение)'},
  {id:'passive-1',        level:'B1', group:'Основа предложения: глагол', title:'Пассив: is made, was built'},
  // B2
  {id:'passive-2',        level:'B2', group:'Основа предложения: глагол', title:'Пассив во всех временах'},
  {id:'reported',         level:'B2', group:'Сложные предложения', title:'Косвенная речь'},
  {id:'conditionals-2',   level:'B2', group:'Сложные предложения', title:'Условие 3 и смешанные'},
  {id:'wish',             level:'B2', group:'Сложные предложения', title:'I wish / if only'},
  {id:'perfect-continuous', level:'B2', group:'Времена', title:'Perfect Continuous'},
  {id:'linking-2',        level:'B2', group:'Предлоги и связки', title:'however / although / therefore / despite'},
  {id:'phrasal',          level:'B2', group:'Основа предложения: глагол', title:'Фразовые глаголы: система'},
  {id:'articles-3',       level:'B2', group:'Существительное и слова перед ним', title:'Articles III: абстрактное и общее'},
];
