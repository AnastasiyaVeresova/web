"use strict";

function displayCartItems() {
    const cartItems = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = ""; // Очищаем содержимое корзины
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Ваша корзина пуста <span> ☹️ </span></p>";
    } else {
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__cart-item");
            const img = document.createElement("img");
            img.src = product.url;
            img.alt = product.name;
            const details = document.createElement("div");
            details.classList.add("cart__item-details");
            const name = document.createElement("h4");
            name.textContent = product.name;
            const priceContainer = document.createElement("p");
            const priceLabel = document.createElement("span");
            priceLabel.textContent = "Price: ";
            const priceValue = document.createElement("span");
            priceValue.textContent = `$${product.price.toFixed(2)}`;
            priceValue.classList.add("price-value");
            priceContainer.append(priceLabel, priceValue);
            const color = document.createElement("p");
            color.textContent = `Color: ${product.color}`;
            const size = document.createElement("p");
            size.textContent = `Size: ${product.size}`;
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = product.quantity || 1;
            quantityInput.min = 1;
            quantityInput.classList.add("quantity-input");
            quantityInput.addEventListener("input", () => {
                product.quantity = parseInt(quantityInput.value);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateTotals();
                updateCartCount();
            });
            const quantityLabel = document.createElement("p");
            quantityLabel.textContent = `Quantity: `;
            quantityLabel.appendChild(quantityInput);
            const removeButton = document.createElement("button");
            removeButton.textContent = "x";
            removeButton.classList.add("remove-item");
            removeButton.addEventListener("click", () => removeFromCart(index));
            details.append(name, priceContainer, color, size, quantityLabel);
            cartItem.append(img, details, removeButton);
            cartItems.appendChild(cartItem);
        });
    }
    updateTotals();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.querySelector(".cart__cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce(
            (total, item) => total + (item.quantity || 1),
            0
        );
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    displayCartItems();
}

function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert(
            "Ваша корзина пуста. Пожалуйста, добавьте товары в корзину перед оформлением заказа."
        );
        return;
    }

    // Отправка данных на сервер
    fetch("/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Оформление заказа прошло успешно!");
                clearCart(); // Очищаем корзину после успешного checkout
            } else {
                alert("Не удалось оформить заказ: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Ошибка при оформлении заказа:", error);
            alert(
                "Во время оформления заказа произошла ошибка. Пожалуйста, попробуйте снова."
            );
        });
}

function updateTotals() {
    let subTotal = 0;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(product => {
        const price = parseFloat(product.price);
        const quantity = product.quantity || 1;
        subTotal += price * quantity;
    });
    const subTotalElement = document.getElementById('sub-total');
    if (subTotalElement) {
        subTotalElement.innerText = `$${subTotal.toFixed(2)}`;
    }
    const grandTotalElement = document.getElementById('grand-total');
    if (grandTotalElement) {
        grandTotalElement.innerText = `$${subTotal.toFixed(2)}`;
        grandTotalElement.classList.add('grand-total-value');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
    const clearCartButton = document.querySelector(".cart__btn-clear-cart-shop");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }

    const checkoutButton = document.querySelector(".proceed-to-checkout");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", handleCheckout);
    }

    const continueShoppingButton = document.querySelector(".cart__btn-continue-shopping");
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener("click", () => {
            window.location.href = 'index.html'; // Перенаправление на страницу магазина
        });
    }

    updateCartCount(); // Обновляем количество товаров в корзине при загрузке страницы
});
