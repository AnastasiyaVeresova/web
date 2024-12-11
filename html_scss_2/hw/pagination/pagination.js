"use strict";

const dataProducts = `[
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/2.png"
    },
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/2.png"
    },
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/2.png"
    },
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/2.png"
    },
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/2.png"
    },
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/2.png"
    },
    {
        "name": "ELLERY X M'O CAPSULE",
        "price": 52.00,
        "text": "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        "url": "img/main/catalog/3.png"
    }
]`;

// Преобразование строки JSON в объект JavaScript
const data = JSON.parse(dataProducts);

const itemsPerPage = 9;
let currentPage = 1;

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

function renderProducts(page) {
    const productBox = document.querySelector('.product-box');
    productBox.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = data.slice(start, end);

    addProductsToList(paginatedProducts);
}

function renderPagination() {
    const pagination = document.getElementById('pagination-container');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(data.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderProducts(currentPage);
        });
        pagination.appendChild(button);
    }
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
    renderProducts(currentPage);
    renderPagination();
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
