"use strict";

// Функция для отображения товаров в корзине
function displayCartItems() {
    const cartItems = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = ''; // Очищаем содержимое корзины
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Ваша корзина пуста.</p>';
    } else {
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__item");
            const img = document.createElement("img");
            img.src = product.url;
            img.alt = product.name;
            const name = document.createElement("h4");
            name.textContent = product.name;
            const price = document.createElement("p");
            price.textContent = `$${product.price.toFixed(2)}`;
            const removeButton = document.createElement("button");
            removeButton.textContent = "x";
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", () => removeFromCart(index));
            cartItem.append(img, name, price, removeButton);
            cartItems.appendChild(cartItem);
        });
    }
    updateCartCount();
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Функция для обновления количества товаров в корзине
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Функция для очистки корзины
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    displayCartItems();
}

// Функция для обработки checkout
function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Ваша корзина пуста. Пожалуйста, добавьте товары в корзину перед оформлением заказа.');
        return;
    }

    // Пример: Отправка данных на сервер
    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Оформление заказа прошло успешно!');
            clearCart(); // Очищаем корзину после успешного checkout
        } else {
            alert('Не удалось оформить заказ: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка при оформлении заказа:', error);
        alert('Во время оформления заказа произошла ошибка. Пожалуйста, попробуйте снова.');
    });
}

// После загрузки DOM вызываем функцию для отображения товаров в корзине
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    const clearCartButton = document.querySelector('.btn-clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    const checkoutButton = document.querySelector('.btn-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
});


