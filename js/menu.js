const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("menu-active");
  burger.classList.toggle("active");

  // Блокируем скролл при открытом меню
  document.body.style.overflow = menu.classList.contains("menu-active")
    ? "hidden"
    : "auto";
});

document.querySelectorAll(".menu a").forEach((link) => {
  const linkPath = link
    .getAttribute("href")
    .replace("./", "")
    .replace("../", "");
  const currentPath = window.location.pathname.split("/").pop();

  if (
    currentPath === linkPath ||
    (currentPath === "" && linkPath === "index.html")
  ) {
    link.classList.add("active-link");
  }
});
