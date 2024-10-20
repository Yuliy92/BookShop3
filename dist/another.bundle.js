/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

eval("const slider = document.querySelector(\".slider__line\");\r\nconst sliderDots = document.querySelectorAll(\".slider__dot\");\r\nconst sliderImages = document.querySelectorAll(\".slider__img\");\r\n\r\nlet sliderCount = 0;\r\nlet sliderWidth = slider.offsetWidth;\r\n\r\nfunction rollSlider() {\r\n  slider.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;\r\n}\r\nfunction thisSlide(index) {\r\n  sliderDots.forEach((item) => item.classList.remove(\"active-dot\"));\r\n  sliderDots[index].classList.add(\"active-dot\");\r\n}\r\n\r\nsliderDots.forEach((dot, index) => {\r\n  dot.addEventListener(\"click\", () => {\r\n    sliderCount = index;\r\n    thisSlide(sliderCount);\r\n    rollSlider();\r\n  });\r\n});\r\n\r\nfunction nextSlide() {\r\n  sliderCount++;\r\n  if (sliderCount >= sliderImages.length) sliderCount = 0;\r\n\r\n  thisSlide(sliderCount);\r\n  rollSlider();\r\n}\r\n\r\nsetInterval(() => {\r\n  nextSlide();\r\n}, 4000);\r\n\r\nsetTimeout(() => {\r\n  setInterval();\r\n}, 0);\r\nsetTimeout();\r\nnextSlide();\r\n\r\nconst cart = [];\r\n\r\nfunction addToCart(product) {\r\n  const existingItem = cart.find((item) => item.id === product.id);\r\n  if (existingItem) {\r\n    existingItem.quantity += 1;\r\n  } else {\r\n    cart.push({ ...product, quantity: 1 });\r\n  }\r\n  updateCart();\r\n}\r\nfunction updateCart() {\r\n  const cartItems = document.getElementById(\"cart-items\");\r\n  const totalPrice = document.getElementById(\"total-price\");\r\n\r\n  cartItems.innerHTML = \"\";\r\n\r\n  let total = 0;\r\n  cart.forEach((item) => {\r\n    const li = document.createElement(\"li\");\r\n    li.textContent = `${item.name} - ${item.price} руб. x ${item.quantity}`;\r\n    cartItems.appendChild(li);\r\n    total += item.price * item.quantity;\r\n  });\r\n\r\n  totalPrice.textContent = total;\r\n}\r\n\r\ndocument.addEventListener(\"click\", (event) => {\r\n  if (event.target.classList.contains(\"add-to-cart\")) {\r\n    const productElement = event.target.closest(\".product\");\r\n    const product = {\r\n      id: parseInt(productElement.dataset.id),\r\n      name: productElement.dataset.name,\r\n      price: parseFloat(productElement.dataset.price),\r\n    };\r\n    addToCart(product);\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://bookshop/./src/js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/slider.js"]();
/******/ 	
/******/ })()
;