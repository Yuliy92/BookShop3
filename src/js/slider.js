const slider = document.querySelector(".slider__line");
const sliderDots = document.querySelectorAll(".slider__dot");
const sliderImages = document.querySelectorAll(".slider__img");

let sliderCount = 0;
let sliderWidth = slider.offsetWidth;

function rollSlider() {
  slider.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}
function thisSlide(index) {
  sliderDots.forEach((item) => item.classList.remove("active-dot"));
  sliderDots[index].classList.add("active-dot");
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    sliderCount = index;
    thisSlide(sliderCount);
    rollSlider();
  });
});

function nextSlide() {
  sliderCount++;
  if (sliderCount >= sliderImages.length) sliderCount = 0;

  thisSlide(sliderCount);
  rollSlider();

}

setInterval(() => {
  nextSlide();
}, 4000);

setTimeout(() => {
  setInterval();
}, 0);
setTimeout();
nextSlide();
