document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".catalog-grid");
  const filter = document.getElementById("direction");
  const modal = document.getElementById("university-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-button");

  grid.innerHTML = "";

  universities.forEach((univ) => {
    const card = document.createElement("div");
    card.className = "university-card";
    card.dataset.direction = univ.direction;
    card.innerHTML = `
      <img src="../imgs/${univ.image}" alt="${univ.name}" />
      <h3>${univ.name}</h3>
      <p>${univ.short}</p>
      <button class="details-button" data-id="${univ.id}">Подробнее</button>
    `;
    grid.appendChild(card);
  });

  filter.addEventListener("change", () => {
    const selected = filter.value;
    const cards = document.querySelectorAll(".university-card");
    cards.forEach((card) => {
      const dir = card.dataset.direction;
      card.style.display =
        selected === "all" || dir === selected ? "block" : "none";
    });
  });

  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const univ = universities.find((u) => u.id === id);
      modalBody.innerHTML = `
        <div class="modal-university">
          <img src="../imgs/${univ.image}" alt="${
        univ.name
      }" class="modal-university-img" />
          <h2>${univ.name}</h2>
          <table class="modal-university-table">
            <tr><td class="label">📍 Адрес:</td><td>${
              univ.details.адрес
            }</td></tr>
            <tr><td class="label">🏢 Корпуса:</td><td>${
              univ.details.корпуса
            }</td></tr>
            <tr><td class="label">🎓 Направления:</td><td>${univ.details.направления.join(
              ", "
            )}</td></tr>
            <tr><td class="label">💰 Контракт:</td><td>${
              univ.details.контракт
            }</td></tr>
            <tr><td class="label">📞 Контакты:</td><td>${
              univ.details.контакты
            }</td></tr>
            <tr><td class="label">🌐 Сайт:</td><td><a class="modal-university--link" href="${
              univ.details.сайт
            }" target="_blank">Перейти на сайт вуза</a></td></tr>
          </table>
        </div>
      `;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
