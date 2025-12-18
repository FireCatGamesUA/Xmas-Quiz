// ==================================================
// 🔧 НАЛАШТУВАННЯ
// ==================================================
const TEST_MODE = false; // true = тестовий режим (нічого не зберігається), false = повна робота
document.querySelector('.quiz').style.display = 'none';
alertify.set('notifier', 'position', 'bottom-right');
// ==================================================
// 1. Supabase клієнт
// ==================================================
const supabaseClient = supabase.createClient(
  'https://istfauekkrzompcomvli.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdGZhdWVra3J6b21wY29tdmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDQ0ODksImV4cCI6MjA4MTQ4MDQ4OX0.cdndgjjE46j2biG45mdtlSae3TxBLVVnJJL883nJ1Iw'
);

// ==================================================
// 2. Дані квізу
// ==================================================
const QUIZ_DATA = {
  "questions": {
    "1": {
      "question": "Яка страва є традиційною основною частиною різдвяного обіду в більшості британських родин сьогодні?",
      "options": ["Курячий пиріг", "Смажений короп", "Смажена індичка", "Яловичина по-веллінгтонськи"],
      "answer": "2",
      "hint": "Цей птах великого розміру часто асоціюється з Днем подяки в США, але у Британії він — зірка Різдва.",
      "description": {
        "0": "Пироги часто готують у Британії, але для святкового різдвяного застілля обирають більш урочисту цілу птицю.",
        "1": "Ця страва більш характерна для різдвяного столу в країнах Центральної Європи, наприклад, у Польщі чи Чехії.",
        "2": "Індичка стала популярною основною стравою на Різдво у Британії з XVI століття, поступово замінивши гуску або кабанячу голову.",
        "3": "Хоча це класична британська страва, вона не є специфічним символом саме різдвяного обіду для всієї країни."
      }
    },
    "2": {
      "question": "Що традиційно кладуть всередину різдвяного пудингу на щастя?",
      "options": ["Ґудзик", "Срібну монету", "Золоту каблучку", "Квасолю"],
      "answer": "1",
      "hint": "Це металевий предмет, який зазвичай асоціюється з грошима.",
      "description": {
        "0": "Раніше ґудзик також могли класти, але він символізував старе дівоцтво або парубоцтво, а не загальне щастя.",
        "1": "Згідно з традицією, той, хто знайде монету у своєму шматочку пудингу, матиме багатство та удачу в наступному році.",
        "2": "Каблучки частіше ховають у пирогах на День святого Валентина або Хелловін для передбачення шлюбу.",
        "3": "Традиція з квасолею була популярною в епоху Тюдорів для обрання «Короля безладу», але сучасний звичай передбачає інший предмет."
      }
    },
    "3": {
      "question": "Як називається день після Різдва (26 грудня), який є офіційним вихідним у Британії?",
      "options": ["Gifting Day", "St. Stephen's Day", "Family Day", "Boxing Day"],
      "answer": "3",
      "hint": "Назва цього дня пов'язана з коробками, у які раніше клали подарунки для бідних та персоналу.",
      "description": {
        "0": "Незважаючи на те, що назва звучить логічно через обмін подарунками, вона не є історичною назвою цього дня.",
        "1": "Хоча релігійно це день святого Стефана, у Британії світська та офіційна назва свята інша.",
        "2": "Це загальна назва для свят у багатьох країнах, але британський вихідний має специфічну назву, пов'язану з упаковкою.",
        "3": "Назва походить від традиції дарувати «різдвяні коробки» (boxes) з подарунками або грошима слугам та торговцям за їхню працю."
      }
    },
    "4": {
      "question": "Яка британська королева (або король) вперше популяризувала різдвяну ялинку у Великій Британії?",
      "options": ["Королева Вікторія", "Король Генріх VII", "Король Георг III", "Королева Єлизавета I"],
      "answer": "0",
      "hint": "Ця монархиня правила у XIX столітті, а її чоловік, принц Альберт, мав німецьке коріння.",
      "description": {
        "0": "Хоча ялинки привозили й раніше, саме фотографія королеви Вікторії та принца Альберта біля ялинки у 1848 році зробила їх модними.",
        "1": "Він полюбляв розкішні бенкети, але традиція різдвяних ялинок має німецьке походження і з'явилася значно пізніше.",
        "2": "Його дружина Шарлотта встановила першу ялинку, але вона не стала масовим явищем до правління їхньої внучки.",
        "3": "У часи Тюдорів оселі прикрашали вічнозеленими рослинами, але традиція прикрашати ціле дерево ще не існувала у Британії."
      }
    },
    "5": {
      "question": "О котрій годині за Гринвічем зазвичай транслюється різдвяне звернення монарха до нації?",
      "options": ["12:00 (опівдні)", "18:00 (6 p.m.)", "20:00 (8 p.m.)", "15:00 (3 p.m.)"],
      "answer": "3",
      "hint": "Це відбувається в середині дня, якраз після традиційного різдвяного ланчу.",
      "description": {
        "0": "Опівдні більшість людей ще зайняті приготуванням їжі або відвідуванням ранкової церковної служби.",
        "1": "Це вечірній час, коли настрій уже більш розслаблений, але офіційне звернення відбувається раніше.",
        "2": "У цей час зазвичай показують святкові фільми або спеціальні випуски серіалів, а не офіційні промови.",
        "3": "Це традиційний час для звернення, коли більшість британських родин закінчують обід і збираються біля телевізорів."
      }
    },
    "6": {
      "question": "Як називаються маленькі пиріжки з начинкою із сухофруктів та спецій, які є обов'язковими на Різдво?",
      "options": ["Mince pies", "Cornish pasties", "Hot cross buns", "Apple crumbles"],
      "answer": "0",
      "hint": "Назва натякає на подрібнену начинку, хоча м'яса в них уже давно немає.",
      "description": {
        "0": "Раніше вони містили м'ясо (звідси назва mince), але зараз це солодкі пиріжки з «mincemeat» — сумішшю сухофруктів.",
        "1": "Це несолодкі пиріжки з м'ясом та овочами, які є традиційною стравою графства Корнуолл, а не Різдва.",
        "2": "Ці булочки з хрестом традиційно готують і їдять на Великдень, а не на Різдво.",
        "3": "Це популярний британський десерт, але він не є суто різдвяним символом у формі маленьких закритих пиріжків."
      }
    },
    "7": {
      "question": "Що британці традиційно розривають удвох під час різдвяного обіду, щоб почути гучний звук і знайти подарунок?",
      "options": ["Christmas Crackers", "Christmas Stockings", "Christmas Bells", "Christmas Cards"],
      "answer": "0",
      "hint": "Це паперова трубка у формі великої цукерки, яка видає «ляск», коли її тягнуть за краї.",
      "description": {
        "0": "Різдвяні хлопавки містять паперову корону, жарт та маленький сувенір; їх розривають із характерним звуком.",
        "1": "Шкарпетки вішають біля каміна для подарунків від Санти, але вони не видають звуку при відкритті.",
        "2": "Дзвони символізують свято, але вони є декоративним елементом або музичним інструментом, а не інтерактивною забавкою.",
        "3": "Листівки прийнято дарувати та виставляти на полицях, але їх не розривають під час обіду."
      }
    },
    "8": {
      "question": "Звідки, згідно з британською традицією, Санта-Клаус (або Father Christmas) заходить до будинку?",
      "options": ["Через чорний хід", "Через димар", "Через вікно", "Через парадні двері"],
      "answer": "1",
      "hint": "Цей шлях пов'язаний із каміном, біля якого зазвичай вішають шкарпетки.",
      "description": {
        "0": "Більшість різдвяних історій фокусуються на вітальні з каміном, куди веде димар, а не на задньому вході.",
        "1": "Це класична легенда: Санта спускається по димарю, щоб залишити подарунки в шкарпетках біля каміна.",
        "2": "Хоча це логічний шлях для казкового персонажа, димар є набагато популярнішим елементом британського різдвяного фольклору.",
        "3": "Двері — це шлях для звичайних гостей, а Санта використовує більш магічний та незвичний спосіб."
      }
    },
    "9": {
      "question": "Яка рослина, згідно з традицією, дає право поцілувати людину, що стоїть під нею?",
      "options": ["Плющ", "Омела", "Ялина", "Гостролист"],
      "answer": "1",
      "hint": "Це вічнозелена рослина-паразит з білими ягодами.",
      "description": {
        "0": "Плющ часто згадується в різдвяних гімнах разом із гостролистом, але він лише прикраса.",
        "1": "Традиція цілуватися під омелою (mistletoe) сягає корінням давніх часів і є дуже популярною в Британії.",
        "2": "Під ялиною зазвичай шукають подарунки, а не чекають на поцілунок.",
        "3": "Гостролист (holly) використовують для прикрашання домівок та пудингів, але він не має традиції цілування."
      }
    },
    "10": {
      "question": "Яка країна щороку дарує Великій Британії головну різдвяну ялинку для Трафальгарської площі?",
      "options": ["Фінляндія", "Норвегія", "Німеччина", "Канада"],
      "answer": "1",
      "hint": "Ця скандинавська країна була окупована під час Другої світової війни, а її уряд перебував у вигнанні в Лондоні.",
      "description": {
        "0": "Фінляндія відома як батьківщина Санти (Лапландія), але державна традиція подарунка деревом належить її сусідові.",
        "1": "Норвегія дарує ялинку Лондону з 1947 року на знак подяки за допомогу під час Другої світової війни.",
        "2": "Хоча традиція ялинок прийшла з Німеччини, офіційний щорічний дар Лондону надходить від іншої північної країни.",
        "3": "Канада є частиною Співдружності, але історична традиція дарування головної ялинки пов'язана з європейськими подіями."
      }
    }
  }
};

// ==================================================
// 3. Глобальні змінні
// ==================================================
let currentQuestionId = 1;
let userId = '';
let userAttempts = {};
let userAnswers = {};
let userHintsShown = {}; // нова змінна: чи була показана підказка для питання
let startTime = null;

// ==================================================
// 4. Налаштування alertify
// ==================================================
alertify.defaults.transition = 'slide';

// ==================================================
// 5. Допоміжні функції
// ==================================================

// 💾 Зберегти прогрес (тільки якщо TEST_MODE = false)
async function saveProgress() {
  if (TEST_MODE || !userId || userId === 'guest') return;

  const timeSec = getElapsedTime();
  const { error } = await supabaseClient
    .from('users')
    .update({
      attempts: userAttempts,
      answers: userAnswers,
      hints_shown: userHintsShown,
      time: timeSec
    })
    .eq('id', userId);

  if (error) console.warn('Не вдалося зберегти:', error);
}

// ⏱ Час
function getElapsedTime() {
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime) / 1000);
}

// 🎯 Показати питання (оновлена — без автоматичного показу підказки)
function showQuestion(qId) {
  currentQuestionId = qId;
  const q = QUIZ_DATA.questions[qId];
  if (!q) return;

  document.querySelector('.question_text').textContent = `${qId}. ${q.question}`;

  const optionsBlock = document.getElementById('options_block');
  optionsBlock.innerHTML = '';

  // Перевіряємо, чи вже була спроба
  const hasAttempted = (userAttempts[qId] || 0) > 0;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.index = idx;
    btn.textContent = opt;

    if (hasAttempted) {
      btn.disabled = true;

      const isCorrect = idx == q.answer;
      const isSelected = userAnswers[qId] === idx;

      if (isSelected) {
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
      }
      if (isCorrect && (!isSelected || userAnswers[qId] != q.answer)) {
        btn.classList.add('correct');
      }

      // Пояснення (тільки після відповіді)
      const shouldShow = isSelected || (isCorrect && userAnswers[qId] != q.answer);
      if (shouldShow) {
        const descEl = document.createElement('div');
        descEl.className = 'option-description';
        descEl.textContent = q.description[idx];
        btn.after(descEl);
      }
    }

    optionsBlock.appendChild(btn);
  });

  updateNavigationButtons();

  // Додаємо обробники ТІЛЬКИ якщо ще не відповідали
  if (!hasAttempted) {
    optionsBlock.querySelectorAll('.option-btn').forEach(btn => {
      btn.onclick = () => handleAnswer(btn, q, qId);
    });
  }

  // 🆕 Підказка: НЕ показуємо автоматично при поверненні
  document.querySelector('.hint_text').textContent = q.hint;
  const hintBlock = document.querySelector('.hint_block');
  hintBlock.style.display = 'none'; // завжди приховано спочатку
  document.querySelector('.header_hint').classList.remove('expanded');

  // 🆕 Якщо підказка вже була показана — відновлюємо стан
  if (userHintsShown[qId]) {
    hintBlock.style.display = 'block';
    document.querySelector('.header_hint').classList.add('expanded');
  }
}

// 📌 Перемикання підказки (оновлено — зберігає стан)
function toggleHint() {
  const hintBlock = document.querySelector('.hint_block');
  const headerHint = document.querySelector('.header_hint');
  
  const isVisible = hintBlock.style.display === 'block';
  hintBlock.style.display = isVisible ? 'none' : 'block';
  headerHint.classList.toggle('expanded', !isVisible);

  // 🆕 Зберігаємо стан: чи була показана підказка
  if (!isVisible) {
    userHintsShown[currentQuestionId] = true;
    saveProgress(); // зберігаємо відразу
  }
}

// ✅ Обробка відповіді
async function handleAnswer(btn, q, qId) {
  if ((userAttempts[qId] || 0) > 0) return;

  const selectedIndex = parseInt(btn.dataset.index);
  const correctIndex = parseInt(q.answer);
  const options = document.querySelectorAll('.option-btn');

  options.forEach(b => b.disabled = true);

  userAnswers[qId] = selectedIndex;
  userAttempts[qId] = (userAttempts[qId] || 0) + 1;

  if (selectedIndex === correctIndex) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    options[correctIndex].classList.add('correct');
  }

  // Пояснення
  const indicesToShow = new Set([selectedIndex]);
  if (selectedIndex !== correctIndex) indicesToShow.add(correctIndex);

  indicesToShow.forEach(idx => {
    const descEl = document.createElement('div');
    descEl.className = 'option-description';
    descEl.textContent = q.description[idx];
    const targetBtn = options[idx];
    if (!targetBtn.nextSibling?.classList?.contains('option-description')) {
      targetBtn.after(descEl);
    }
  });

  // Створюємо запис у Supabase (тільки якщо не TEST_MODE)
  if (!TEST_MODE && (!userId || userId === 'guest')) {
    const input = document.getElementById('user_name');
    const name = input?.value.trim() || 'guest_' + Date.now().toString(36).slice(2, 9);
    userId = name;

    const attempts = {}, answers = {}, hints = {};
    for (let i = 1; i <= 10; i++) { attempts[i] = 0; answers[i] = null; hints[i] = false; }
    attempts[qId] = 1;
    answers[qId] = selectedIndex;
    hints[qId] = userHintsShown[qId] || false;

    const { error } = await supabaseClient
      .from('users')
      .insert([{ id: userId, time: 0, score: 0, attempts, answers, hints_shown: hints }])
      .select();

    if (error) {
      console.error('Помилка:', error);
      alertify.error('Не вдалося зберегти дані.');
      return;
    }

    startTime = new Date();
  }

  // +1 бал за правильну з першої спроби
  if (!TEST_MODE && selectedIndex === correctIndex && userAttempts[qId] === 1) {
    supabaseClient.from('users').select('score').eq('id', userId).single()
      .then(({ data }) => {
        const newScore = (data?.score || 0) + 1;
        supabaseClient.from('users').update({ score: newScore }).eq('id', userId);
      });
  }

  saveProgress();

  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) nextBtn.disabled = false;
}

// 🔙 Навігація
function updateNavigationButtons() {
// У функції updateNavigationButtons():
    let navBlock = document.querySelector('.navigation');
    if (!navBlock) {
        navBlock = document.createElement('div');
        navBlock.className = 'navigation';
        // 🔥 Додаємо всередину .scroll-container, а не в .quiz
        document.querySelector('.quiz .scroll-container')?.appendChild(navBlock);
    }

  navBlock.innerHTML = '';

  // Кнопка "Назад" — тільки якщо attempts[попереднє] > 0
  if (currentQuestionId > 1 && (userAttempts[currentQuestionId - 1] || 0) > 0) {
    const backBtn = document.createElement('button');
    backBtn.className = 'nav-btn back-btn';
    backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Назад';
    backBtn.onclick = () => {
      currentQuestionId--;
      showQuestion(currentQuestionId);
    };
    navBlock.appendChild(backBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'nav-btn next-btn';
  nextBtn.disabled = (userAttempts[currentQuestionId] || 0) === 0;
  nextBtn.innerHTML = currentQuestionId < 10 ? 'Далі <i class="fa-solid fa-arrow-right"></i>' : 'Завершити квіз';
  
  nextBtn.onclick = () => {
    if (currentQuestionId < 10) {
      currentQuestionId++;
      showQuestion(currentQuestionId);
    } else {
      finishQuiz();
    }
  };

  navBlock.appendChild(nextBtn);
}

// 🏁 Завершити
// 🏆 Фінальна функція — мінімалістична версія
async function finishQuiz() {
  let score = 0;
  for (let i = 1; i <= 10; i++) {
    if (userAnswers[i] !== undefined && 
        userAnswers[i] == QUIZ_DATA.questions[i].answer && 
        userAttempts[i] === 1) {
      score++;
    }
  }

  const timeSec = getElapsedTime();

  if (!TEST_MODE && userId) {
    await supabaseClient
      .from('users')
      .update({ score: score, time: timeSec })
      .eq('id', userId);
  }

  document.querySelector('.quiz').style.display = 'none';
  document.querySelector('.results').style.display = 'flex';

  document.getElementById('user-score').textContent = score;
  document.getElementById('user-time').textContent = timeSec;

  // 🔥 Змінюємо ТІЛЬКИ border кружечка
  const circle = document.querySelector('.score-circle');
  
  if (score >= 8) circle.style.setProperty('--border-color', '#198754'); // зелений
  else if (score >= 6) circle.style.setProperty('--border-color', '#ffc107'); // жовтий
  else if (score >= 4) circle.style.setProperty('--border-color', '#fd7e14'); // помаранчевий
  else circle.style.setProperty('--border-color', '#dc3545'); // червоний

  await loadLeaderboard();

  document.getElementById('restart_btn').onclick = () => location.reload();
}

// 📊 Топ учасників (тільки ім’я)
async function loadLeaderboard() {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select('id, score, time')
      .order('score', { ascending: false })
      .order('time', { ascending: true })
      .limit(10);

    if (error) throw error;

    const list = document.getElementById('leaders_list');
    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = '<div class="leader-item"><span class="name">Немає даних</span></div>';
      return;
    }

    // Додаємо елементи динамічно
    data.forEach((user, index) => {
      const item = document.createElement('div');
      item.className = 'leader-item';
      if (user.id === userId) item.classList.add('current');

      item.innerHTML = `
        <div class="rank-badge">${index + 1}</div>
        <span class="name">${user.id}</span>
      `;
      list.appendChild(item);
    });

  } catch (err) {
    console.error('Помилка топу:', err);
    document.getElementById('leaders_list').innerHTML = 
      '<div class="leader-item"><span class="name">Помилка завантаження</span></div>';
  }
}

// ==================================================
// 6. Ініціалізація
// ==================================================
function initializeQuiz() {
  // Скидання при ?fresh=1
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('fresh') === '1') {
    if (TEST_MODE) console.log('🧪 Тестовий режим: сесію скинуто');
  }

  setupLoginForm();

  // 🆕 Підключення обробника підказки
  const headerHint = document.querySelector('.header_hint');
  if (headerHint) {
    headerHint.addEventListener('click', toggleHint);
  }
}

function setupLoginForm() {
  document.getElementById('start_quiz')?.addEventListener('click', async (e) => {
    e.preventDefault();

    const input = document.getElementById('user_name');
    const name = input?.value.trim();
    
    if (!name) {
      alertify.warning('Будь ласка, введіть ім’я');
      input?.focus();
      return;
    }

    // 🔥 Нова перевірка: максимум 10 символів (з підтримкою Unicode)
    const nameLength = Array.from(name).length; // правильно рахує 🇺🇦, 👍, і т.д.
    if (nameLength > 10) {
      alertify.error('Ім’я має містити не більше 10 символів.');
      input.select();
      return;
    }

    // 🔥 Обов'язкова перевірка на існування
    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('id')
        .eq('id', name)
        .single();

      if (!error && data) {
        alertify.error(`Користувач «${name}» вже існує. Спробуйте інше ім’я.`);
        input.select();
        return;
      }
    } catch (err) {
      if (err.code !== 'PGRST116') { // 404 — нормально
        console.warn('Помилка перевірки імені:', err);
      }
    }

    // ✅ Все добре — продовжуємо
    userId = TEST_MODE ? name : '';
    userAttempts = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};
    userAnswers = {};
    userHintsShown = {};
    startTime = new Date();

    // Анімація переходу
    const login = document.querySelector('.login');
    const quiz = document.querySelector('.quiz');
    if (login) login.style.opacity = '0';
    setTimeout(() => {
      if (login) login.style.display = 'none';
      if (quiz) {
        quiz.style.display = 'flex';
        quiz.style.opacity = '0';
        setTimeout(() => {
          quiz.style.opacity = '1';
          showQuestion(1);
        }, 50);
      }
    }, 300);
  });
}

// ==================================================
// 7. Запуск
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
  initializeQuiz();
  if (TEST_MODE) {
    console.log('🧪 TEST MODE ACTIVE — нічого не зберігається в Supabase');
  }
});