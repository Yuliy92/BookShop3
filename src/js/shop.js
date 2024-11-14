export default function() {
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
}