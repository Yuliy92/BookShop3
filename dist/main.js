/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CSS/styles.css":
/*!****************************!*\
  !*** ./src/CSS/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/CSS/styles.css?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CSS_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CSS/styles.css */ \"./src/CSS/styles.css\");\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider.js */ \"./src/js/slider.js\");\n\r\n\r\n\r\nconst apiKey = \"AIzaSyCiCCkF8kjfeoK0l8F1MHbXlCS6fkniCdc\";\r\nconst categoryButtons = document.querySelectorAll(\".category-buttons button\");\r\nconst resultsDiv = document.getElementById(\"results\");\r\nconst loadMoreButton = document.getElementById(\"loadMoreButton\");\r\n\r\nlet currentCategory = \"\";\r\nlet startIndex = 0;\r\nconst maxResults = 6;\r\n\r\nwindow.onload = () => {\r\n  const firstCategoryButton = document.querySelector(\r\n    \".category-buttons button\"\r\n  );\r\n  if (firstCategoryButton) {\r\n    currentCategory = firstCategoryButton.getAttribute(\"data-category\");\r\n    searchBooks(currentCategory, startIndex);\r\n    loadMoreButton.style.display = \"block\";\r\n  }\r\n};\r\n\r\ncategoryButtons.forEach((button) => {\r\n  button.addEventListener(\"click\", () => {\r\n    currentCategory = button.getAttribute(\"data-category\");\r\n    startIndex = 0;\r\n    clearResults();\r\n    searchBooks(currentCategory, startIndex);\r\n    loadMoreButton.style.display = \"block\";\r\n  });\r\n});\r\n\r\nloadMoreButton.addEventListener(\"click\", () => {\r\n  startIndex += maxResults;\r\n  searchBooks(currentCategory, startIndex);\r\n});\r\n\r\nfunction searchBooks(category, startIndex) {\r\n  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(\r\n    category\r\n  )}&maxResults=${maxResults}&startIndex=${startIndex}&key=${apiKey}`;\r\n\r\n  fetch(url)\r\n    .then((response) => response.json())\r\n    .then((data) => {\r\n      displayResults(data.items);\r\n      if (!data.items || data.items.length < maxResults) {\r\n        loadMoreButton.style.display = \"none\";\r\n      }\r\n    })\r\n    .catch((error) => {\r\n      console.error(\"Ошибка при выполнении запроса:\", error);\r\n    });\r\n}\r\n\r\nfunction displayResults(books) {\r\n  if (!books) {\r\n    resultsDiv.innerHTML = \"<p>No books found.</p>\";\r\n    return;\r\n  }\r\n\r\n  books.forEach((book) => {\r\n    const bookDiv = document.createElement(\"div\");\r\n    bookDiv.classList.add(\"book\");\r\n\r\n    const title = book.volumeInfo.title || \"No title\";\r\n    const authors = book.volumeInfo.authors\r\n      ? book.volumeInfo.authors.join(\", \")\r\n      : \"Unknown author\";\r\n    const price = book.volumeInfo.price\r\n      ? book.volumeInfo.authors.join(\", \")\r\n      : \"No Price\";\r\n    const thumbnail = book.volumeInfo.imageLinks\r\n      ? book.volumeInfo.imageLinks.thumbnail\r\n      : \"https://via.placeholder.com/128x192.png?text=No+Image\";\r\n    const buyLink = book.saleInfo.buyLink || \"#\";\r\n\r\n    bookDiv.innerHTML = `\r\n                    <img src=\"${thumbnail}\" alt=\"${title}\">\r\n                    <div class=\"book_info\" id=\"cart-items\">\r\n                    <p><strong></strong> ${authors}</p>\r\n                    <h3>${title}</h3>\r\n                    \r\n                    \r\n                    <div class=\"rating\">\r\n                        <input type=\"radio\" class=\"star\" id=\"star5-${book.id}\" name=\"rating-${book.id}\" value=\"5\" />\r\n                        <label for=\"star5-${book.id}\" title=\"5 stars\"></label>\r\n                        <input type=\"radio\" class=\"star\" id=\"star4-${book.id}\" name=\"rating-${book.id}\" value=\"4\" />\r\n                        <label for=\"star4-${book.id}\" title=\"4 stars\"></label>\r\n                        <input type=\"radio\" class=\"star\" id=\"star3-${book.id}\" name=\"rating-${book.id}\" value=\"3\" />\r\n                        <label for=\"star3-${book.id}\" title=\"3 stars\"></label>\r\n                        <input type=\"radio\" class=\"star\" id=\"star2-${book.id}\" name=\"rating-${book.id}\" value=\"2\" />\r\n                        <label for=\"star2-${book.id}\" title=\"2 stars\"></label>\r\n                        <input type=\"radio\" class=\"star\" id=\"star1-${book.id}\" name=\"rating-${book.id}\" value=\"1\" />\r\n                        <label for=\"star1-${book.id}\" title=\"1 star\"></label>\r\n                        <p><strong>Description:</strong> ${book.description}</p>\r\n                        <h3 id=\"total-price\">${price}</h3>\r\n                        \r\n                        </div>\r\n                        <a href=\"${buyLink}\" target=\"_blank\" class=\"buy-button\">BUY NOW</a>\r\n                    </div>\r\n                   \r\n                `;\r\n\r\n    resultsDiv.appendChild(bookDiv);\r\n  });\r\n}\r\n\r\nfunction clearResults() {\r\n  resultsDiv.innerHTML = \"\";\r\n}\r\n\r\n(0,_slider_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n//# sourceURL=webpack://bookshop/./src/js/index.js?");

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n  const slider = document.querySelector(\".slider__line\");\r\n  const sliderDots = document.querySelectorAll(\".slider__dot\");\r\n  const sliderImages = document.querySelectorAll(\".slider__img\");\r\n\r\n  let sliderCount = 0;\r\n  let sliderWidth = slider.offsetWidth;\r\n\r\n  function rollSlider() {\r\n    slider.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;\r\n  }\r\n  function thisSlide(index) {\r\n    sliderDots.forEach((item) => item.classList.remove(\"active-dot\"));\r\n    sliderDots[index].classList.add(\"active-dot\");\r\n  }\r\n\r\n  sliderDots.forEach((dot, index) => {\r\n    dot.addEventListener(\"click\", () => {\r\n      sliderCount = index;\r\n      thisSlide(sliderCount);\r\n      rollSlider();\r\n    });\r\n  });\r\n\r\n  function nextSlide() {\r\n    sliderCount++;\r\n    if (sliderCount >= sliderImages.length) sliderCount = 0;\r\n\r\n    thisSlide(sliderCount);\r\n    rollSlider();\r\n  }\r\n\r\n  setInterval(() => {\r\n    nextSlide();\r\n  }, 4000);\r\n\r\n  setTimeout(() => {\r\n    setInterval();\r\n  }, 0);\r\n  setTimeout();\r\n  nextSlide();\r\n\r\n  const cart = [];\r\n\r\n  function addToCart(product) {\r\n    const existingItem = cart.find((item) => item.id === product.id);\r\n    if (existingItem) {\r\n      existingItem.quantity += 1;\r\n    } else {\r\n      cart.push({ ...product, quantity: 1 });\r\n    }\r\n    updateCart();\r\n  }\r\n  function updateCart() {\r\n    const cartItems = document.getElementById(\"cart-items\");\r\n    const totalPrice = document.getElementById(\"total-price\");\r\n\r\n    cartItems.innerHTML = \"\";\r\n\r\n    let total = 0;\r\n    cart.forEach((item) => {\r\n      const li = document.createElement(\"li\");\r\n      li.textContent = `${item.name} - ${item.price} руб. x ${item.quantity}`;\r\n      cartItems.appendChild(li);\r\n      total += item.price * item.quantity;\r\n    });\r\n\r\n    totalPrice.textContent = total;\r\n  }\r\n\r\n  document.addEventListener(\"click\", (event) => {\r\n    if (event.target.classList.contains(\"add-to-cart\")) {\r\n      const productElement = event.target.closest(\".product\");\r\n      const product = {\r\n        id: parseInt(productElement.dataset.id),\r\n        name: productElement.dataset.name,\r\n        price: parseFloat(productElement.dataset.price),\r\n      };\r\n      addToCart(product);\r\n    }\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://bookshop/./src/js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;