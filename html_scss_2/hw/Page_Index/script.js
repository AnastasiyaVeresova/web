"use strict";
// Функция для добавления продуктов
function addProductsToList(products) {
	const productList = document.querySelector(".cards__wrapper");
	products.forEach((product) => {
		// Создаем элементы для каждого продукта
		const sectionItem = document.createElement("div");
		sectionItem.classList.add("cards__item");
		const divImg = document.createElement("div");
		divImg.classList.add("item-img");
		// Устанавливаем фоновое изображение
		divImg.style.backgroundImage = `url(${product.url})`;
		divImg.style.backgroundSize = "cover"; // чтобы изображение занимало весь div
		divImg.style.backgroundPosition = "center"; // центрируем изображение

		const buttonCard = document.createElement("div");
		buttonCard.classList.add("item-img__hover");
		const button = document.createElement("button");
		button.className = "item-img__hover-btn";
		// const cartImage = document.createElement("img");
		// cartImage.src = "img/btn-cart.svg";
		// cartImage.alt = "Корзина";
		// cartImage.className = "cart-icon"; 
		// button.appendChild(cartImage);
		button.appendChild(document.createTextNode(" Add to Cart")); 
		
		const divCardText = document.createElement("div");
		divCardText.classList.add("item-description");
		const name = document.createElement("h4");
		name.classList.add("item-title");
		name.textContent = product.name;
		const text = document.createElement("p");
		text.classList.add("item-text");
		text.textContent = product.text;
		const price = document.createElement("p");
		price.classList.add("item-price");
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
