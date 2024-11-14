import "../CSS/styles.css";
import slider from "./slider.js";

const apiKey = "AIzaSyCiCCkF8kjfeoK0l8F1MHbXlCS6fkniCdc";
const categoryButtons = document.querySelectorAll(".category-buttons button");
const resultsDiv = document.getElementById("results");
const loadMoreButton = document.getElementById("loadMoreButton");

let currentCategory = "";
let startIndex = 0;
const maxResults = 6;

window.onload = () => {
  const firstCategoryButton = document.querySelector(
    ".category-buttons button"
  );
  if (firstCategoryButton) {
    currentCategory = firstCategoryButton.getAttribute("data-category");
    searchBooks(currentCategory, startIndex);
    loadMoreButton.style.display = "block";
  }
  
  initializeCart();
};

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentCategory = button.getAttribute("data-category");
    startIndex = 0;
    clearResults();
    searchBooks(currentCategory, startIndex);
    loadMoreButton.style.display = "block";
  });
});

loadMoreButton.addEventListener("click", () => {
  startIndex += maxResults;
  searchBooks(currentCategory, startIndex);
});

function searchBooks(category, startIndex) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
    category
  )}&maxResults=${maxResults}&startIndex=${startIndex}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.items);
      if (!data.items || data.items.length < maxResults) {
        loadMoreButton.style.display = "none";
      } else {
        loadMoreButton.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
    });
}

function displayResults(books) {
  if (!books) {
    resultsDiv.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const title = book.volumeInfo.title || "No title";
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown author";
    const price = book.saleInfo.listPrice
      ? book.saleInfo.listPrice.amount
      : "No Price";
    const thumbnail = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "https://via.placeholder.com/128x192.png?text=No+Image";
    const buyLink = book.saleInfo.buyLink || "#";

    bookDiv.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <div class="book_info" id="cart-items">
        <p><strong></strong> ${authors}</p>
        <h3>${title}</h3>
        <div class="rating">
          <input type="radio" class="star" id="star5-${book.id}" name="rating-${book.id}" value="5" />
          <label for="star5-${book.id}" title="5 stars"></label>
          <input type="radio" class="star" id="star4-${book.id}" name="rating-${book.id}" value="4" />
          <label for="star4-${book.id}" title="4 stars"></label>
          <input type="radio" class="star" id="star3-${book.id}" name="rating-${book.id}" value="3" />
          <label for="star3-${book.id}" title="3 stars"></label>
          <input type="radio" class="star" id="star2-${book.id}" name="rating-${book.id}" value="2" />
          <label for="star2-${book.id}" title="2 stars"></label>
          <input type="radio" class="star" id="star1-${book.id}" name="rating-${book.id}" value="1" />
          <label for="star1-${book.id}" title="1 star"></label>
          
          <h3 id="total-price">${price}</h3>
        </div>
        <button class="buy-button" data-id="${book.id}" data-title="${title}" data-author="${authors}" data-price="${price}" data-thumbnail="${thumbnail}">BUY NOW</button>
      </div>
    `;

    resultsDiv.appendChild(bookDiv);
  });

  const buyButtons = document.querySelectorAll(".buy-button");
  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const title = button.getAttribute("data-title");
      const author = button.getAttribute("data-author");
      const price = parseFloat(button.getAttribute("data-price"));
      const thumbnail = button.getAttribute("data-thumbnail");
      addToCart(id, title, author, price, thumbnail);
    });
  });
}

function clearResults() {
  resultsDiv.innerHTML = "";
}

slider();
resultsDiv.appendChild(loadMoreButton);

function initializeCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartIcon();
}

function updateCartIcon() {
  document.querySelector(".cart-count").innerText = cart.length;
}

function updateCartModal() {
  let cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let totalAmount = 0;

  cart.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}">
      <div class="book_info">
        <p><strong></strong> ${item.author}</p>
        <h3>${item.title}</h3>
        <p>Price: ${item.price} ₽</p>
        <button onclick="removeFromCart('${item.id}')">Удалить</button>
      </div>
    `;
    cartItems.appendChild(li);
    totalAmount += item.price * item.quantity;
  });

  document.getElementById("total-amount").innerText = totalAmount + " ₽";
}

function addToCart(id, title, author, price, thumbnail) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, title, author, price, thumbnail, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
  updateCartModal();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
  updateCartModal();
}

function updateQuantity(id, quantity) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartModal();
  }
}

document.querySelector(".cart-icon").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "block";
  updateCartModal();
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

document
  .getElementById("continue-shopping-btn")
  .addEventListener("click", () => {
    document.getElementById("cart-modal").style.display = "none";
  });

document.getElementById("checkout-btn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

initializeCart();
updateQuantity();
removeFromCart();
