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
		// const cartImage = document.createElement("img");
		// cartImage.src = "img/btn-cart.svg";
		// cartImage.alt = "Корзина";
		// cartImage.className = "cart-icon"; 
		// button.appendChild(cartImage);
		button.appendChild(document.createTextNode(" Add to Cart")); 
		
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
// После загрузки DOM вызываем функцию для добавления продуктов
document.addEventListener("DOMContentLoaded", () => {
	addProductsToList(data);
});
