
const cart = [];


function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} руб. x ${item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productElement = event.target.closest('.product');
        const product = {
            id: parseInt(productElement.dataset.id),
            name: productElement.dataset.name,
            price: parseFloat(productElement.dataset.price)
        };
        addToCart(product);
    }
});