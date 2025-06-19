import { showSlide, nextSlide } from "./slider.js";

window.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
});
