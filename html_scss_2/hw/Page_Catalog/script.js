// "use strict";

// // Функция для добавления продуктов
// function addProductsToList(products) {
//     const productList = document.querySelector(".product-box");
//     products.forEach((product) => {
//         // Создаем элементы для каждого продукта
//         const sectionItem = document.createElement("div");
//         sectionItem.classList.add("product");
//         const divImg = document.createElement("div");
//         divImg.classList.add("product__img");
//         // Устанавливаем фоновое изображение
//         divImg.style.backgroundImage = `url(${product.url})`;
//         divImg.style.backgroundSize = "cover"; // чтобы изображение занимало весь div
//         divImg.style.backgroundPosition = "center"; // центрируем изображение

//         const buttonCard = document.createElement("div");
//         buttonCard.classList.add("product__img__hover");
//         const button = document.createElement("button");
//         button.className = "product__img__hover-btn";
//         button.appendChild(document.createTextNode("Add to Cart"));
//         button.addEventListener("click", () => addToCart(product));

//         const divCardText = document.createElement("div");
//         divCardText.classList.add("product__content");
//         const name = document.createElement("h4");
//         name.classList.add("product__name");
//         name.textContent = product.name;
//         const text = document.createElement("p");
//         text.classList.add("product__text");
//         text.textContent = product.text;
//         const price = document.createElement("p");
//         price.classList.add("product__price");
//         price.textContent = `$${product.price.toFixed(2)}`;
//         buttonCard.appendChild(button);

//         divImg.append(buttonCard);
//         sectionItem.append(divImg, divCardText);
//         divCardText.append(name, text, price);
//         productList.append(sectionItem);
//     });
// }

// // Функция для добавления товара в корзину
// function addToCart(product) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount();
//     // alert('Product added to cart!');
// }

// // Функция для обновления количества товаров в корзине
// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartCountElement = document.querySelector('.cart-count');
//     cartCountElement.textContent = cart.length;
// }

// // Функция для очистки корзины
// function clearCart() {
//     localStorage.removeItem('cart');
//     updateCartCount();
//     displayCartItems();
// }

// // После загрузки DOM вызываем функцию для добавления продуктов и обновления количества товаров в корзине
// document.addEventListener("DOMContentLoaded", () => {
//     const data = JSON.parse(dataProducts);
//     addProductsToList(data);
//     updateCartCount();

//     const checkoutButton = document.querySelector('.btn-checkout');
//     const clearCartButton = document.querySelector('.btn-clear-cart');

//     if (checkoutButton) {
//         checkoutButton.addEventListener('click', () => {
//             // alert('Checkout button clicked');
//             // Добавьте ваш код для обработки checkout
//         });
//     }

//     if (clearCartButton) {
//         clearCartButton.addEventListener('click', () => {
//             // alert('Clear Cart button clicked');
//             // Добавьте ваш код для очистки корзины
//             clearCart();
//         });
//     }
// });

// function clearCart() {
//     localStorage.removeItem('cart');
//     updateCartCount();
//     displayCartItems();
// }

// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartCountElement = document.querySelector('.cart-count');
//     cartCountElement.textContent = cart.length;
// }

// function displayCartItems() {
//     const cartItems = document.getElementById("cart-items");
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cartItems.innerHTML = ''; // Очищаем содержимое корзины
//     if (cart.length === 0) {
//         cartItems.innerHTML = '<p>Your cart is empty.</p>';
//     } else {
//         cart.forEach((product, index) => {
//             const cartItem = document.createElement("div");
//             cartItem.classList.add("cart__item");
//             const img = document.createElement("img");
//             img.src = product.url;
//             img.alt = product.name;
//             const name = document.createElement("h4");
//             name.textContent = product.name;
//             const price = document.createElement("p");
//             price.textContent = `$${product.price.toFixed(2)}`;
//             const removeButton = document.createElement("button");
//             removeButton.textContent = "x";
//             removeButton.classList.add("remove-button");
//             removeButton.addEventListener("click", () => removeFromCart(index));
//             cartItem.append(img, name, price, removeButton);
//             cartItems.appendChild(cartItem);
//         });
//     }
//     updateCartCount();
// }

// function removeFromCart(index) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart.splice(index, 1);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     displayCartItems();
// }
// document.addEventListener("DOMContentLoaded", () => {
//     const checkoutButton = document.querySelector('.btn-checkout');
//     const clearCartButton = document.querySelector('.btn-clear-cart');

//     if (checkoutButton) {
//         checkoutButton.addEventListener('click', () => {
//             alert('Checkout button clicked');
//             // Добавьте ваш код для обработки checkout
//         });
//     }

//     if (clearCartButton) {
//         clearCartButton.addEventListener('click', () => {
//             alert('Clear Cart button clicked');
//             // Добавьте ваш код для очистки корзины
//             clearCart();
//         });
//     }
// });

// function clearCart() {
//     localStorage.removeItem('cart');
//     updateCartCount();
//     displayCartItems();
// }

// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartCountElement = document.querySelector('.cart-count');
//     cartCountElement.textContent = cart.length;
// }

// function displayCartItems() {
//     const cartItems = document.getElementById("cart-items");
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cartItems.innerHTML = ''; // Очищаем содержимое корзины
//     if (cart.length === 0) {
//         cartItems.innerHTML = '<p>Your cart is empty.</p>';
//     } else {
//         cart.forEach((product, index) => {
//             const cartItem = document.createElement("div");
//             cartItem.classList.add("cart__item");
//             const img = document.createElement("img");
//             img.src = product.url;
//             img.alt = product.name;
//             const name = document.createElement("h4");
//             name.textContent = product.name;
//             const price = document.createElement("p");
//             price.textContent = `$${product.price.toFixed(2)}`;
//             const removeButton = document.createElement("button");
//             removeButton.textContent = "x";
//             removeButton.classList.add("remove-button");
//             removeButton.addEventListener("click", () => removeFromCart(index));
//             cartItem.append(img, name, price, removeButton);
//             cartItems.appendChild(cartItem);
//         });
//     }
//     updateCartCount();
// }

// function removeFromCart(index) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart.splice(index, 1);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     displayCartItems();
// }
"use strict";

// Функция для добавления продуктов
function addProductsToList(products) {
    const productList = document.querySelector(".product-box");
    products.forEach((product) => {
        // Создаем элементы для каждого продукта
        const sectionItem = document.createElement("div");
        sectionItem.classList.add("product");
        const divImg = document.createElement("div");
        divImg.classList.add("product__img");
        // Устанавливаем фоновое изображение
        divImg.style.backgroundImage = `url(${product.url})`;
        divImg.style.backgroundSize = "cover"; // чтобы изображение занимало весь div
        divImg.style.backgroundPosition = "center"; // центрируем изображение

        const buttonCard = document.createElement("div");
        buttonCard.classList.add("product__img__hover");
        const button = document.createElement("button");
        button.className = "product__img__hover-btn";
        button.appendChild(document.createTextNode("Add to Cart"));
        button.addEventListener("click", () => addToCart(product));

        const divCardText = document.createElement("div");
        divCardText.classList.add("product__content");
        const name = document.createElement("h4");
        name.classList.add("product__name");
        name.textContent = product.name;
        const text = document.createElement("p");
        text.classList.add("product__text");
        text.textContent = product.text;
        const price = document.createElement("p");
        price.classList.add("product__price");
        price.textContent = `$${product.price.toFixed(2)}`;
        buttonCard.appendChild(button);

        divImg.append(buttonCard);
        sectionItem.append(divImg, divCardText);
        divCardText.append(name, text, price);
        productList.append(sectionItem);
    });
}

// Функция для добавления товара в корзину
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Функция для обновления количества товаров в корзине
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// После загрузки DOM вызываем функцию для добавления продуктов и обновления количества товаров в корзине
document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(dataProducts);
    addProductsToList(data);
    updateCartCount();

    const dropdownToggles = document.querySelectorAll('.dropdown .btn');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.matches('.dropdown .btn')) {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    const checkoutButton = document.querySelector('.btn-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
        });
    }
});
