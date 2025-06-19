// =====================================
// СИСТЕМА ТЕСТИРОВАНИЯ
// =====================================

// Данные тестов
const tests = {
    1: {
        id: 1,
        title: 'Основы имитационного моделирования',
        description: 'Тест на знание базовых концепций и определений',
        difficulty: 'Начальный',
        timeLimit: 600, // 10 минут в секундах
        questions: [
            {
                id: 1,
                question: 'Что такое имитационное моделирование?',
                options: [
                    'Математический метод решения уравнений',
                    'Процесс создания модели реальной системы для изучения её поведения',
                    'Способ программирования на языке Python',
                    'Метод статистического анализа данных'
                ],
                correct: 1
            },
            {
                id: 2,
                question: 'Какой из методов НЕ относится к имитационному моделированию?',
                options: [
                    'Метод Монте-Карло',
                    'Дискретно-событийное моделирование',
                    'Линейное программирование',
                    'Агентное моделирование'
                ],
                correct: 2
            },
            {
                id: 3,
                question: 'Основное преимущество имитационного моделирования:',
                options: [
                    'Быстрота вычислений',
                    'Точность результатов',
                    'Возможность изучения сложных систем без экспериментов на реальных объектах',
                    'Простота реализации'
                ],
                correct: 2
            },
            {
                id: 4,
                question: 'Что изучает дискретно-событийное моделирование?',
                options: [
                    'Непрерывные процессы',
                    'Системы с событиями, происходящими в определённые моменты времени',
                    'Статические системы',
                    'Только финансовые модели'
                ],
                correct: 1
            },
            {
                id: 5,
                question: 'Метод Монте-Карло основан на:',
                options: [
                    'Детерминированных вычислениях',
                    'Использовании случайных чисел',
                    'Аналитических формулах',
                    'Графических методах'
                ],
                correct: 1
            }
        ]
    },
    2: {
        id: 2,
        title: 'Системная динамика',
        description: 'Проверка знаний методов системной динамики',
        difficulty: 'Средний',
        timeLimit: 480, // 8 минут
        questions: [
            {
                id: 1,
                question: 'Основной элемент модели системной динамики:',
                options: [
                    'Агенты',
                    'События',
                    'Накопители и потоки',
                    'Случайные числа'
                ],
                correct: 2
            },
            {
                id: 2,
                question: 'Петля обратной связи в системной динамике может быть:',
                options: [
                    'Только положительной',
                    'Только отрицательной',
                    'Положительной или отрицательной',
                    'Нейтральной'
                ],
                correct: 2
            },
            {
                id: 3,
                question: 'Vensim - это:',
                options: [
                    'Язык программирования',
                    'Инструмент для системной динамики',
                    'База данных',
                    'Операционная система'
                ],
                correct: 1
            },
            {
                id: 4,
                question: 'Системная динамика лучше всего подходит для:',
                options: [
                    'Краткосрочного планирования',
                    'Изучения долгосрочного поведения сложных систем',
                    'Решения линейных уравнений',
                    'Создания веб-сайтов'
                ],
                correct: 1
            }
        ]
    },
    3: {
        id: 3,
        title: 'Агентное моделирование',
        description: 'Тест по принципам и применению агентного моделирования',
        difficulty: 'Продвинутый',
        timeLimit: 480, // 8 минут
        questions: [
            {
                id: 1,
                question: 'Агент в агентном моделировании:',
                options: [
                    'Пассивный объект данных',
                    'Автономная сущность с поведением',
                    'Математическая функция',
                    'База данных'
                ],
                correct: 1
            },
            {
                id: 2,
                question: 'NetLogo используется для:',
                options: [
                    'Веб-разработки',
                    'Агентного моделирования',
                    'Создания баз данных',
                    'Обработки изображений'
                ],
                correct: 1
            },
            {
                id: 3,
                question: 'Эмерджентность означает:',
                options: [
                    'Ошибку в программе',
                    'Возникновение сложного поведения из простых правил',
                    'Быстрое выполнение программы',
                    'Сохранение данных'
                ],
                correct: 1
            },
            {
                id: 4,
                question: 'Агентное моделирование часто применяется для изучения:',
                options: [
                    'Только технических систем',
                    'Социальных и экономических систем',
                    'Только математических функций',
                    'Только физических процессов'
                ],
                correct: 1
            }
        ]
    }
};

// Состояние тестирования
let currentTest = null;
let currentTestId = null;
let userAnswers = {};
let timeLeft = 0;
let timerInterval = null;

// =====================================
// ОСНОВНЫЕ ФУНКЦИИ ТЕСТИРОВАНИЯ
// =====================================

// Начать тест
function startTest(testId) {
    currentTestId = testId;
    currentTest = tests[testId];
    
    if (!currentTest) {
        showNotification('Тест не найден', 'danger');
        return;
    }
    
    // Сброс состояния
    userAnswers = {};
    timeLeft = currentTest.timeLimit;
    
    // Переключение интерфейса
    document.getElementById('testSelection').style.display = 'none';
    document.getElementById('testTaking').style.display = 'block';
    document.getElementById('testResults').style.display = 'none';
    
    // Настройка заголовка
    document.getElementById('testTitle').textContent = currentTest.title;
    
    // Загрузка вопросов
    loadQuestions();
    
    // Запуск таймера
    startTimer();
    
    // Сохранение состояния
    saveTestState();
    
    showNotification(`Тест "${currentTest.title}" начат. Удачи!`, 'success');
}

// Загрузка вопросов
function loadQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    currentTest.questions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index);
        container.appendChild(questionElement);
    });
    
    // Обновление кнопки отправки
    updateSubmitButton();
}

// Создание элемента вопроса
function createQuestionElement(question, index) {
    const div = document.createElement('div');
    div.className = 'card question-card mb-4';
    
    div.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${index + 1}. ${question.question}</h5>
            <div class="mt-3">
                ${question.options.map((option, optionIndex) => `
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" 
                               name="question_${question.id}" 
                               id="q${question.id}_${optionIndex}" 
                               value="${optionIndex}"
                               onchange="handleAnswerChange(${question.id}, ${optionIndex})">
                        <label class="form-check-label" for="q${question.id}_${optionIndex}">
                            ${option}
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return div;
}

// Обработка изменения ответа
function handleAnswerChange(questionId, answerIndex) {
    userAnswers[questionId] = answerIndex;
    updateSubmitButton();
    saveTestState();
}

// Обновление кнопки отправки
function updateSubmitButton() {
    const submitButton = document.getElementById('submitTest');
    const answeredQuestions = Object.keys(userAnswers).length;
    const totalQuestions = currentTest.questions.length;
    
    submitButton.disabled = answeredQuestions < totalQuestions;
    submitButton.textContent = `Завершить тест (${answeredQuestions}/${totalQuestions})`;
}

// =====================================
// ТАЙМЕР
// =====================================

// Запуск таймера
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest(true); // Автоматическая отправка
        }
    }, 1000);
}

// Обновление отображения таймера
function updateTimerDisplay() {
    const timeElement = document.getElementById('timeLeft');
    const timerElement = document.getElementById('testTimer');
    
    if (timeElement) {
        timeElement.textContent = formatTime(timeLeft);
        
        // Изменение цвета при малом времени
        if (timeLeft < 60) {
            timerElement.className = 'badge bg-danger fs-6';
        } else if (timeLeft < 300) {
            timerElement.className = 'badge bg-warning fs-6';
        } else {
            timerElement.className = 'badge bg-secondary fs-6';
        }
    }
}

// Остановка таймера
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// =====================================
// ОТПРАВКА И РЕЗУЛЬТАТЫ
// =====================================

// Отправка теста
function submitTest(autoSubmit = false) {
    if (!currentTest) return;
    
    stopTimer();
    
    // Вычисление результатов
    const results = calculateResults();
    
    // Переключение интерфейса
    document.getElementById('testTaking').style.display = 'none';
    document.getElementById('testResults').style.display = 'block';
    
    // Отображение результатов
    displayResults(results);
    
    // Сохранение результатов
    saveTestResults(results);
    
    if (autoSubmit) {
        showNotification('Время истекло! Тест отправлен автоматически.', 'warning');
    } else {
        showNotification('Тест завершен!', 'success');
    }
}

// Вычисление результатов
function calculateResults() {
    let correctAnswers = 0;
    const totalQuestions = currentTest.questions.length;
    const questionResults = {};
    
    currentTest.questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) {
            correctAnswers++;
        }
        
        questionResults[question.id] = {
            question: question.question,
            options: question.options,
            correctAnswer: question.correct,
            userAnswer: userAnswer,
            isCorrect: isCorrect
        };
    });
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    return {
        testId: currentTestId,
        testTitle: currentTest.title,
        correctAnswers,
        totalQuestions,
        percentage,
        questionResults,
        completedAt: new Date().toISOString()
    };
}

// Отображение результатов
function displayResults(results) {
    // Основные результаты
    document.getElementById('scoreDisplay').textContent = 
        `${results.correctAnswers}/${results.totalQuestions}`;
    
    document.getElementById('scorePercentage').textContent = 
        `(${results.percentage}%)`;
    
    // Иконка и бейдж
    const scoreIcon = document.getElementById('scoreIcon');
    const scoreBadge = document.getElementById('scoreBadge');
    
    if (results.percentage >= 80) {
        scoreIcon.innerHTML = '<i data-lucide="award" class="text-warning" style="width: 48px; height: 48px;"></i>';
        scoreBadge.innerHTML = '<span class="badge bg-success fs-6">Отлично!</span>';
    } else if (results.percentage >= 60) {
        scoreIcon.innerHTML = '<i data-lucide="check-circle" class="text-success" style="width: 48px; height: 48px;"></i>';
        scoreBadge.innerHTML = '<span class="badge bg-warning fs-6">Хорошо</span>';
    } else {
        scoreIcon.innerHTML = '<i data-lucide="x-circle" class="text-danger" style="width: 48px; height: 48px;"></i>';
        scoreBadge.innerHTML = '<span class="badge bg-danger fs-6">Требуется повторение материала</span>';
    }
    
    // Детальные результаты
    displayDetailedResults(results);
    
    // Обновление иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Отображение детальных результатов
function displayDetailedResults(results) {
    const container = document.getElementById('detailedResults');
    container.innerHTML = '';
    
    Object.values(results.questionResults).forEach((result, index) => {
        const div = document.createElement('div');
        div.className = `card mb-3 ${result.isCorrect ? 'correct-answer' : 'incorrect-answer'}`;
        
        const userAnswerText = result.userAnswer !== undefined ? 
            result.options[result.userAnswer] : 'Не отвечено';
        
        div.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-start">
                    <div class="me-3">
                        ${result.isCorrect ? 
                            '<i data-lucide="check-circle" class="text-success"></i>' : 
                            '<i data-lucide="x-circle" class="text-danger"></i>'
                        }
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="card-title">${index + 1}. ${result.question}</h6>
                        <p class="mb-1"><strong>Правильный ответ:</strong> 
                           <span class="text-success">${result.options[result.correctAnswer]}</span></p>
                        ${!result.isCorrect && result.userAnswer !== undefined ? 
                            `<p class="mb-0"><strong>Ваш ответ:</strong> 
                             <span class="text-danger">${userAnswerText}</span></p>` : ''
                        }
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(div);
    });
    
    // Обновление иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// =====================================
// НАВИГАЦИЯ
// =====================================

// Отмена теста
function cancelTest() {
    if (confirm('Вы уверены, что хотите отменить тест? Весь прогресс будет потерян.')) {
        stopTimer();
        backToTests();
        clearTestState();
        showNotification('Тест отменен', 'info');
    }
}

// Возврат к списку тестов
function backToTests() {
    document.getElementById('testSelection').style.display = 'block';
    document.getElementById('testTaking').style.display = 'none';
    document.getElementById('testResults').style.display = 'none';
    
    currentTest = null;
    currentTestId = null;
    userAnswers = {};
    stopTimer();
}

// Повторное прохождение теста
function retakeTest() {
    if (currentTestId) {
        startTest(currentTestId);
    }
}

// =====================================
// СОХРАНЕНИЕ СОСТОЯНИЯ
// =====================================

// Сохранение состояния теста
function saveTestState() {
    if (!currentTestId) return;
    
    const state = {
        testId: currentTestId,
        userAnswers,
        timeLeft,
        startedAt: Date.now()
    };
    
    saveToStorage('currentTest', state);
}

// Загрузка состояния теста
function loadTestState() {
    const state = loadFromStorage('currentTest');
    
    if (state && state.testId && tests[state.testId]) {
        // Проверка, не истекло ли время
        const elapsed = (Date.now() - state.startedAt) / 1000;
        const remainingTime = state.timeLeft - elapsed;
        
        if (remainingTime > 0) {
            // Восстановление состояния
            currentTestId = state.testId;
            currentTest = tests[state.testId];
            userAnswers = state.userAnswers;
            timeLeft = Math.floor(remainingTime);
            
            // Показ уведомления о восстановлении
            if (confirm('У вас есть незавершенный тест. Продолжить?')) {
                startTest(currentTestId);
                
                // Восстановление ответов
                Object.entries(userAnswers).forEach(([questionId, answerIndex]) => {
                    const radio = document.querySelector(`input[name="question_${questionId}"][value="${answerIndex}"]`);
                    if (radio) {
                        radio.checked = true;
                    }
                });
                
                updateSubmitButton();
                return true;
            }
        }
        
        clearTestState();
    }
    
    return false;
}

// Очистка состояния теста
function clearTestState() {
    removeFromStorage('currentTest');
}

// Сохранение результатов теста
function saveTestResults(results) {
    const allResults = loadFromStorage('testResults') || [];
    allResults.push(results);
    
    // Ограничение количества сохраненных результатов
    if (allResults.length > 50) {
        allResults.splice(0, allResults.length - 50);
    }
    
    saveToStorage('testResults', allResults);
}

// Получение истории результатов
function getTestHistory() {
    return loadFromStorage('testResults') || [];
}

// =====================================
// ИНИЦИАЛИЗАЦИЯ
// =====================================

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверка на восстановление состояния только на странице тестов
    if (window.location.pathname.includes('tests.html')) {
        // Небольшая задержка для полной загрузки страницы
        setTimeout(() => {
            loadTestState();
        }, 100);
    }
});

// Обработка закрытия страницы
window.addEventListener('beforeunload', function(e) {
    if (currentTest && timeLeft > 0) {
        e.preventDefault();
        e.returnValue = 'У вас есть незавершенный тест. Данные могут быть потеряны.';
    }
});

console.log('SimuLearn: Система тестирования загружена успешно');
