// =====================================
// ОСНОВНЫЕ ФУНКЦИИ
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Lucide иконок
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Инициализация страницы
    initializePage();
    
    // Добавление обработчиков событий
    setupEventListeners();
});

// Инициализация страницы
function initializePage() {
    // Подсветка активного пункта навигации
    highlightActiveNavigation();
    
    // Анимации при загрузке
    animateOnLoad();
    
    // Инициализация компонентов Bootstrap
    initializeBootstrapComponents();
}

// Подсветка активной навигации
function highlightActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Анимации при загрузке
function animateOnLoad() {
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Инициализация компонентов Bootstrap
function initializeBootstrapComponents() {
    // Инициализация tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Инициализация popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Плавная прокрутка для якорных ссылок
    setupSmoothScrolling();
    
    // Обработка кликов по карточкам
    setupCardClickHandlers();
    
    // Обработка форм
    setupFormHandlers();
}

// Плавная прокрутка
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Обработчики для карточек
function setupCardClickHandlers() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Обработчики для форм
function setupFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// Валидация форм
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Это поле обязательно для заполнения');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

// Показать ошибку поля
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Очистить ошибку поля
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

// =====================================
// ФУНКЦИИ ДЛЯ МЕТОДОВ
// =====================================

// Изучение метода
function learnMethod(methodName) {
    showNotification(`Открываем материалы по теме: ${methodName}`, 'info');
    
    // Здесь можно добавить логику для открытия соответствующего раздела
    setTimeout(() => {
        window.location.href = 'theory.html';
    }, 1000);
}

// Практика метода
function practiceMethod(methodName) {
    showNotification(`Загружаем практические задания: ${methodName}`, 'info');
    
    // Здесь можно добавить логику для открытия практических заданий
    setTimeout(() => {
        window.location.href = 'practice.html';
    }, 1000);
}

// =====================================
// УТИЛИТЫ
// =====================================

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Показать загрузку
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.7';
}

// Скрыть загрузку
function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = '';
    element.style.opacity = '';
}

// Форматирование времени
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Генерация случайного ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Сохранение в localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
    }
}

// Загрузка из localStorage
function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        return null;
    }
}

// Удаление из localStorage
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Ошибка удаления из localStorage:', error);
    }
}

// =====================================
// ОБРАБОТКА ОШИБОК
// =====================================

// Глобальный обработчик ошибок
window.addEventListener('error', function(event) {
    console.error('Глобальная ошибка:', event.error);
    showNotification('Произошла ошибка. Пожалуйста, обновите страницу.', 'danger');
});

// Обработчик необработанных промисов
window.addEventListener('unhandledrejection', function(event) {
    console.error('Необработанное отклонение промиса:', event.reason);
    showNotification('Произошла ошибка загрузки. Проверьте подключение к интернету.', 'warning');
});

// =====================================
// ЭКСПОРТ ФУНКЦИЙ (для модульности)
// =====================================

// Если используется модульная система
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        showLoading,
        hideLoading,
        formatTime,
        saveToStorage,
        loadFromStorage,
        removeFromStorage,
        learnMethod,
        practiceMethod
    };
}

// Добавление функций в глобальную область видимости
window.SimuLearn = {
    showNotification,
    showLoading,
    hideLoading,
    formatTime,
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    learnMethod,
    practiceMethod
};

console.log('SimuLearn: Основной скрипт загружен успешно');
