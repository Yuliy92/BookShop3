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
    const price = book.volumeInfo.price
      ? book.volumeInfo.authors.join(", ")
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
                        <p><strong>Description:</strong> ${book.description}</p>
                        <h3 id="total-price">${price}</h3>
                        
                        </div>
                        <a href="${buyLink}" target="_blank" class="buy-button">BUY NOW</a>
                    </div>
                   
                `;

    resultsDiv.appendChild(bookDiv);
  });
}

function clearResults() {
  resultsDiv.innerHTML = "";
}

import ".src/css/style.scss";
