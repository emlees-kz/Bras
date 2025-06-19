document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("programs-grid");
  const filter = document.getElementById("program-filter");
  const modal = document.getElementById("program-modal");
  const modalBody = document.getElementById("program-modal-body");
  const closeBtn = document.querySelector(".close-button");

  function renderPrograms(level = "all") {
    grid.innerHTML = "";
    const filtered =
      level === "all" ? programs : programs.filter((p) => p.level === level);

    filtered.forEach((p) => {
      const card = document.createElement("div");
      card.className = "university-card";
      card.innerHTML = `
          <h3>${p.emoji} ${p.name}</h3>
          <p><strong>Уровень:</strong> ${p.level}</p>
          <p><strong>Университет:</strong> ${p.university}</p>
          <button class="details-button" data-id="${p.id}">Подробнее</button>
        `;
      grid.appendChild(card);
    });

    // Кнопки Подробнее
    document.querySelectorAll(".details-button").forEach((button) => {
      button.addEventListener("click", () => {
        const progId = button.dataset.id;
        const prog = programs.find((p) => p.id === progId);
        modalBody.innerHTML = `
            <h2>${prog.name} 🎓</h2>
            <table class="program-table">
              <tr><td class="label">Уровень:</td><td>${prog.level}</td></tr>
              <tr><td class="label">Университет:</td><td>${prog.university}</td></tr>
              <tr><td class="label">Длительность:</td><td>${prog.duration}</td></tr>
              <tr><td class="label">Описание:</td><td>${prog.description}</td></tr>
            </table>
          `;
        modal.style.display = "block";
      });
    });
  }

  filter.addEventListener("change", () => {
    renderPrograms(filter.value);
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  renderPrograms();
});
