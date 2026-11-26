/* Книги по этапам: от адаптаций A2 до Аристотеля без адаптации.
   kind: graded — адаптация для изучающих (Oxford Bookworms: Stage 1 ≈ A1/A2, 2 ≈ A2, 3 ≈ A2/B1, 4 ≈ B1);
         native — обычная книга для носителей, но простым языком;
         philo  — философская линия.
   get:  shop — epub в магазинах (Google Play Книги, Kobo, ebooks.com) и часто в Onleihe городской библиотеки;
         free — бесплатно и легально (Standard Ebooks / Project Gutenberg), public domain;
         graded — электронные версии адаптаций есть не во всех магазинах, см. раздел «Где брать». */
export const RULES = [
  '<b>Тест одной страницы.</b> Открой книгу на случайной странице. Если незнакомых слов 0–5, это книга для лёгкого чтения (экстенсив). Если 6–12, это книга для разбора (интенсив). Если больше 12, книга пока рано: отложи её без чувства вины и возьми книгу этапом ниже.',
  '<b>Две книги на этапе.</b> На следующий этап переходи, когда две книги текущего этапа прочитаны и последняя шла легко. Переходить раньше нельзя, даже если хочется: от слишком сложных книг бросают чтение совсем.',
  '<b>Одна книга за раз, до конца.</b> Если книга не нравится после 20%, брось её и возьми другую с того же этапа. Скучная книга хуже, чем трудная.',
  '<b>С аудио.</b> Адаптации Oxford Bookworms идут с аудиоверсией. Глава сначала слушается с текстом, потом читается без аудио. Это ещё и тренировка на слух без субтитров.',
  '<b>Ничего не выписывай в экстенсиве.</b> Выписываешь только во время интенсива (10 минут вслух по подсказке «Как читать»): максимум 5 фраз за раз, и они идут ко мне в отчёт.',
];

export const WHERE = [
  ['Обычные книги (native, philo)', 'epub продаётся в Google Play Книги, Kobo и ebooks.com. Бесплатно: сервис <b>Onleihe</b> через твою городскую библиотеку в Германии, нужен только читательский билет. В Onleihe много английских книг, поиск ставь на язык «Englisch».'],
  ['Адаптации (graded)', 'Ищи по полному названию + «Oxford Bookworms». Электронные версии с аудио есть в приложении Oxford Learner\'s Bookshelf и в части магазинов. Формат зависит от магазина: если epub нет, бери любую доступную электронную или бумажную версию, главное уровень.'],
  ['Бесплатная классика (free)', '<b>Standard Ebooks</b> (standardebooks.org): аккуратные бесплатные epub книг, на которые истекли авторские права. Запасной вариант <b>Project Gutenberg</b> (gutenberg.org).'],
];

export default [
{ id:'s1', level:'A2−', when:'декабрь 2026 – январь 2027', title:'Старт', goal:'Привыкнуть читать каждый день по 15 минут. Короткие книги примерно на 40–60 страниц.', books:[
  {id:'elephant-man', title:'The Elephant Man', author:'Tim Vicary', series:'Oxford Bookworms, Stage 1', kind:'graded', get:'graded', why:'Реальная история Джозефа Меррика. Короткие предложения, Present Simple и Past Simple. Первый вопрос о достоинстве человека.'},
  {id:'phantom-opera', title:'The Phantom of the Opera', author:'Gaston Leroux, retold by Jennifer Bassett', series:'Oxford Bookworms, Stage 1', kind:'graded', get:'graded', why:'Сюжет держит внимание, лексика очень простая.'},
  {id:'love-money', title:'Love or Money?', author:'Rowena Akinyemi', series:'Oxford Bookworms, Stage 1', kind:'graded', get:'graded', why:'Детектив: хочется узнать, кто убил. Так проще читать каждый день.'},
]},
{ id:'s2', level:'A2', when:'февраль – март 2027', title:'Разгон', goal:'Первая настоящая книга для носителей. Читать уже 20 минут без остановок.', books:[
  {id:'holmes-short', title:'Sherlock Holmes Short Stories', author:'Arthur Conan Doyle', series:'Oxford Bookworms, Stage 2', kind:'graded', get:'graded', why:'Короткие рассказы: каждый можно закончить за 2–3 дня. Логика и рассуждения.'},
  {id:'alice-graded', title:'Alice\'s Adventures in Wonderland', author:'Lewis Carroll, retold by Jennifer Bassett', series:'Oxford Bookworms, Stage 2', kind:'graded', get:'graded', why:'Игры с логикой и смыслом слов. Кэрролл был логиком, тут уже немного философии.'},
  {id:'wimpy-kid', title:'Diary of a Wimpy Kid', author:'Jeff Kinney', series:'книга 1 из серии', kind:'native', get:'shop', why:'Первая книга без адаптации. Разговорный американский английский, картинки помогают понять. Если зайдёт, у серии больше 15 книг.'},
]},
{ id:'s3', level:'A2+', when:'апрель – июнь 2027', title:'Мост к оригиналам', goal:'Книги примерно на 100 страниц. Адаптация и оригинал по очереди.', books:[
  {id:'frankenstein-graded', title:'Frankenstein', author:'Mary Shelley, retold by Patrick Nobes', series:'Oxford Bookworms, Stage 3', kind:'graded', get:'graded', why:'Что делает существо человеком и кто отвечает за то, что создал. Отличная тема для писем Mr. X.'},
  {id:'call-wild-graded', title:'The Call of the Wild', author:'Jack London', series:'Oxford Bookworms, Stage 3', kind:'graded', get:'graded', why:'Природа против цивилизации. Через полгода прочтёшь его же в оригинале (этап 5).'},
  {id:'little-prince', title:'The Little Prince', author:'Antoine de Saint-Exupéry, translated by Richard Howard', series:'перевод с французского', kind:'philo', get:'shop', why:'Простой язык и глубокие мысли. Первая философская книга без адаптации. Её можно перечитывать на каждом уровне.'},
  {id:'matilda', title:'Matilda', author:'Roald Dahl', series:'', kind:'native', get:'shop', why:'Живой британский английский и юмор. Даль пишет коротко и ясно.'},
]},
{ id:'s4', level:'B1', when:'июль – сентябрь 2027', title:'Первые настоящие книги', goal:'Обычные книги на 150–250 страниц. Адаптации уже только как подстраховка.', books:[
  {id:'hound-graded', title:'The Hound of the Baskervilles', author:'Arthur Conan Doyle', series:'Oxford Bookworms, Stage 4', kind:'graded', get:'graded', why:'Подстраховка: если оригиналы этого этапа пока идут тяжело, начни отсюда.'},
  {id:'morrie', title:'Tuesdays with Morrie', author:'Mitch Albom', series:'', kind:'philo', get:'shop', why:'Разговоры с умирающим профессором о том, как жить. Простой язык, короткие главы, жизнь с философским уклоном.'},
  {id:'alchemist', title:'The Alchemist', author:'Paulo Coelho, translated by Alan R. Clarke', series:'перевод с португальского', kind:'philo', get:'shop', why:'Очень простой английский. Притча о цели и пути.'},
  {id:'holes', title:'Holes', author:'Louis Sachar', series:'', kind:'native', get:'shop', why:'Сюжет закручен, как пазл. Язык ясный, читается быстро.'},
  {id:'mice-men', title:'Of Mice and Men', author:'John Steinbeck', series:'', kind:'native', get:'shop', why:'Около 100 страниц, почти одни диалоги. Настоящая американская речь 1930-х о дружбе и одиночестве.'},
]},
{ id:'s5', level:'B1+ → B2', when:'октябрь 2027 – февраль 2028', title:'Литература и идеи', goal:'Цель «B1+/B2 к ноябрю 2027». Читаешь классику без адаптации и пишешь Mr. X о прочитанном.', books:[
  {id:'animal-farm', title:'Animal Farm', author:'George Orwell', series:'', kind:'philo', get:'shop', why:'Короткая книга о власти и обществе, ты хотел понять, «как работают общества». Язык простой и точный.'},
  {id:'old-man-sea', title:'The Old Man and the Sea', author:'Ernest Hemingway', series:'', kind:'native', get:'shop', why:'Короткие простые предложения и много смысла. Про стойкость, тот же Сизиф, только в море.'},
  {id:'call-wild', title:'The Call of the Wild', author:'Jack London', series:'оригинал', kind:'native', get:'free', why:'Тот же сюжет, что на этапе 3, но без адаптации. Хорошо видно, как вырос твой уровень.'},
  {id:'algernon', title:'Flowers for Algernon', author:'Daniel Keyes', series:'', kind:'philo', get:'shop', why:'Язык героя растёт вместе с его умом: от ошибок к сложной прозе. Можно ли быть умным и счастливым одновременно?'},
  {id:'sophie', title:'Sophie\'s World', author:'Jostein Gaarder, translated by Paulette Møller', series:'перевод с норвежского', kind:'philo', get:'shop', why:'История философии в виде романа, от досократиков до XX века, есть глава об Аристотеле. Длинная книга, читай по главе.'},
]},
{ id:'s6', level:'B2', when:'2028', title:'Философия без адаптации', goal:'Читать философию в хороших современных переводах и спорить с ней письменно.', books:[
  {id:'stranger', title:'The Stranger', author:'Albert Camus, translated by Matthew Ward', series:'перевод с французского', kind:'philo', get:'shop', why:'Простые предложения, абсурд и свобода. Тот самый Камю, которого любит Mr. X.'},
  {id:'meditations', title:'Meditations: A New Translation', author:'Marcus Aurelius, translated by Gregory Hays', series:'Modern Library', kind:'philo', get:'shop', why:'Короткие записи на каждый день. Перевод Хейса современный и ясный (бесплатный перевод Джорджа Лонга слишком старый по языку).'},
  {id:'frankl', title:'Man\'s Search for Meaning', author:'Viktor E. Frankl', series:'', kind:'philo', get:'shop', why:'Смысл жизни в лагере и после. Ясная проза, сильная книга.'},
  {id:'siddhartha', title:'Siddhartha', author:'Hermann Hesse, translated by Hilda Rosner', series:'перевод с немецкого', kind:'philo', get:'shop', why:'Короткая притча. Немецкий оригинал рядом: можно сверять фразы.'},
  {id:'barnes', title:'Aristotle: A Very Short Introduction', author:'Jonathan Barnes', series:'Oxford Very Short Introductions', kind:'philo', get:'shop', why:'Подготовка к главной цели: карта идей Аристотеля и его терминов на английском.'},
  {id:'botton', title:'The Consolations of Philosophy', author:'Alain de Botton', series:'', kind:'philo', get:'shop', why:'Сократ, Эпикур, Сенека, Монтень, Шопенгауэр и Ницше о жизненных проблемах. Лёгкий язык эссе.'},
]},
{ id:'s7', level:'C1', when:'2029 и дальше', title:'Аристотель', goal:'Та самая мечта. Читаешь сам, с комментарием, и споришь с ним с Mr. X.', books:[
  {id:'nic-ethics', title:'Nicomachean Ethics', author:'Aristotle, translated by Roger Crisp', series:'Cambridge Texts in the History of Philosophy', kind:'philo', get:'shop', why:'Главная книга: добродетель, привычка, счастье. Отсюда цитата Mr. X про смелость. Бесплатный старый перевод W. D. Ross есть на Project Gutenberg, но язык там тяжелее.'},
  {id:'socrates', title:'The Last Days of Socrates', author:'Plato, translated by Hugh Tredennick and Harold Tarrant', series:'Penguin Classics', kind:'philo', get:'shop', why:'«Апология», «Федон» и другие диалоги о суде и смерти Сократа. Учитель учителя Аристотеля.'},
  {id:'sisyphus', title:'The Myth of Sisyphus', author:'Albert Camus, translated by Justin O\'Brien', series:'', kind:'philo', get:'shop', why:'Полная версия того, о чём писал Mr. X: «One must imagine Sisyphus happy».'},
  {id:'seneca', title:'Letters from a Stoic', author:'Seneca, translated by Robin Campbell', series:'Penguin Classics', kind:'philo', get:'shop', why:'Письма другу о жизни. Это и есть твоя переписка с Mr. X, только две тысячи лет назад.'},
]},
];
