const slides = document.querySelectorAll(".slide");
const title = document.getElementById("slide-title");
const text = document.getElementById("slide-text");
let currentSlide = 0;

const slideContent = [
  {
    title: "Добро пожаловать на сайт о вузах Бишкека",
    text: "Тут собрана только лучшая информация для вашего удобства",
  },
  {
    title: "Выберите комфортное обучение",
    text: "В лучших вузах страны",
  },
  {
    title: "Сроки приёма и документы",
    text: "Не пропустите дедлайны! Актуальная информация о приёмной кампании",
  },
  {
    title: "Образование в цифрах",
    text: "Средняя стоимость, проходные баллы и статистика по вузам",
  },
];

export function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("slide-active", i === index);
  });

  title.textContent = slideContent[index].title;
  title.textContent = slideContent[index].title;
  text.textContent = slideContent[index].text;
}

export function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Initialize first slide
showSlide(currentSlide);

// Change slide every 5 seconds
setInterval(nextSlide, 5000);
