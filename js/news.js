document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("news-grid");
  const modal = document.getElementById("news-modal");
  const modalBody = document.getElementById("news-modal-body");
  const closeBtn = document.querySelector(".close-button");

  function renderNews() {
    container.innerHTML = "";
    newsList.forEach((news) => {
      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
          <h3>${news.title}</h3>
          <p class="news-date">${news.date}</p>
          <p>${news.preview}</p>
          <button class="details-button" data-id="${news.id}">Подробнее</button>
        `;
      container.appendChild(card);
    });

    document.querySelectorAll(".details-button").forEach((button) => {
      button.addEventListener("click", () => {
        const newsId = button.dataset.id;
        const news = newsList.find((n) => n.id === newsId);
        modalBody.innerHTML = `
            <h2>${news.title}</h2>
            <p class="news-date">${news.date}</p>
            <p>${news.content}</p>
          `;
        modal.style.display = "block";
      });
    });
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  renderNews();
});
