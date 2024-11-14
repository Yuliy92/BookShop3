export default function() {
  //TODO экспорт всего файла
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

  //TODO с 35 по 42 переделываем, а то это что-то ужасное
  setInterval(() => {
    nextSlide();
  }, 4000);

  setTimeout(() => {
    setInterval();
  }, 0);
  setTimeout();
  nextSlide();

  const cart = [];

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price} руб. x ${item.quantity}`;
      cartItems.appendChild(li);
      total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const productElement = event.target.closest(".product");
      const product = {
        id: parseInt(productElement.dataset.id),
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price),
      };
      addToCart(product);
    }
  });
}
