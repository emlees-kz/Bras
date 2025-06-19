document.addEventListener("DOMContentLoaded", () => {
  const ctxCost = document.getElementById("costChart").getContext("2d");
  const ctxDirections = document
    .getElementById("directionsChart")
    .getContext("2d");
  const ctxPie = document.getElementById("typePieChart").getContext("2d");

  const costChart = new Chart(ctxCost, {
    type: "bar",
    data: {
      labels: [
        "КНУ им. Ж. Баласагына",
        "КГТУ им. И. Раззакова",
        "КГМА им. И. Ахунбаева",
        "КЭУ им. М. Рыскулбекова",
        "КРСУ им. Б. Ельцина",
        "АУЦА",
        "КНАУ им. К. Скрябина",
        "КГУСТА",
      ],
      datasets: [
        {
          label: "Стоимость обучения (сом)",
          data: [28000, 26000, 42000, 24000, 35000, 1500, 22000, 27000],
          backgroundColor: "rgba(200, 16, 46, 0.6)",
          borderColor: "#C8102E",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeOutBounce",
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  const directionsChart = new Chart(ctxDirections, {
    type: "bar",
    data: {
      labels: [
        "КНУ им. Ж. Баласагына",
        "КГТУ им. И. Раззакова",
        "КГМА им. И. Ахунбаева",
        "КЭУ им. М. Рыскулбекова",
        "КРСУ им. Б. Ельцина",
        "АУЦА",
        "КНАУ им. К. Скрябина",
        "КГУСТА",
      ],
      datasets: [
        {
          label: "Кол-во направлений",
          data: [3, 3, 3, 3, 3, 3, 3, 3],
          backgroundColor: "rgba(244, 197, 66, 0.6)",
          borderColor: "#F4C542",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
      scales: {
        y: { beginAtZero: true, stepSize: 1 },
      },
    },
  });

  let pieType = "pie";
  let pieChart = new Chart(ctxPie, {
    type: pieType,
    data: {
      labels: [
        "technical",
        "medical",
        "economic",
        "humanitarian",
        "agricultural",
      ],
      datasets: [
        {
          label: "Типы направлений",
          data: [3, 1, 1, 2, 1],
          backgroundColor: [
            "#C8102E",
            "#F4C542",
            "#00A896",
            "#0066CC",
            "#D95D39",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeOutExpo",
      },
    },
  });

  // Переключатель типа графика
  document.getElementById("togglePie").addEventListener("click", () => {
    pieType = pieType === "pie" ? "doughnut" : "pie";
    pieChart.destroy();
    pieChart = new Chart(ctxPie, {
      type: pieType,
      data: {
        labels: [
          "technical",
          "medical",
          "economic",
          "humanitarian",
          "agricultural",
        ],
        datasets: [
          {
            label: "Типы направлений",
            data: [3, 1, 1, 2, 1],
            backgroundColor: [
              "#C8102E",
              "#F4C542",
              "#00A896",
              "#0066CC",
              "#D95D39",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  });

  // Скачивание PNG
  document.querySelectorAll(".download-chart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const canvas = document.getElementById(targetId);
      const link = document.createElement("a");
      link.download = `${targetId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
});
