"use strict";

const itemsPerPage = 9;
let currentPage = 1;

function addProductsToList(products) {
	const productList = document.querySelector(".product-box");
	products.forEach((product) => {
		const sectionItem = document.createElement("div");
		sectionItem.classList.add("product");
		const divImg = document.createElement("div");
		divImg.classList.add("product__img");
		divImg.style.backgroundImage = `url(${product.url})`;
		divImg.style.backgroundSize = "cover";
		divImg.style.backgroundPosition = "center";

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
	setTimeout(() => {
		productList.style.opacity = 1;
		const products = productList.querySelectorAll(".product");
		products.forEach((product, index) => {
			setTimeout(() => {
				product.classList.add("show");
			}, index * 100);
		});
	}, 100);
}

function renderProducts(page) {
	const productBox = document.querySelector(".product-box");
	productBox.innerHTML = "";
	productBox.style.opacity = 0;

	const start = (page - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	const paginatedProducts = data.slice(start, end);

	addProductsToList(paginatedProducts);
}

function renderPagination() {
	const pagination = document.getElementById("pagination-container");
	pagination.innerHTML = "";

	const pageCount = Math.ceil(data.length / itemsPerPage);

	// Добавляем кнопку "Назад"
	const prevButton = document.createElement("button");
	prevButton.textContent = "<";
	prevButton.addEventListener("click", () => {
		if (currentPage > 1) {
			currentPage--;
			renderProducts(currentPage);
			renderPagination();
		}
	});
	if (currentPage === 1) {
		prevButton.classList.add("disabled");
	}
	pagination.appendChild(prevButton);

	// Добавляем номера страниц
	for (let i = 1; i <= pageCount; i++) {
		const button = document.createElement("button");
		button.textContent = i;
		if (i === currentPage) {
			button.classList.add("active");
		}
		button.addEventListener("click", () => {
			currentPage = i;
			renderProducts(currentPage);
			renderPagination();
		});
		pagination.appendChild(button);
	}

	// Добавляем кнопку "Вперед"
	const nextButton = document.createElement("button");
	nextButton.textContent = ">";
	nextButton.addEventListener("click", () => {
		if (currentPage < pageCount) {
			currentPage++;
			renderProducts(currentPage);
			renderPagination();
		}
	});
	if (currentPage === pageCount) {
		nextButton.classList.add("disabled");
	}
	pagination.appendChild(nextButton);
}

function addToCart(product) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const existingProduct = cart.find((item) => item.name === product.name);
	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		product.quantity = 1;
		cart.push(product);
	}
	localStorage.setItem("cart", JSON.stringify(cart));
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

document.addEventListener("DOMContentLoaded", () => {
	const data = JSON.parse(dataProducts);
	addProductsToList(data);
	renderProducts(currentPage);
	renderPagination();
	updateCartCount();

	const dropdownToggles = document.querySelectorAll(".dropdown .btn");
	dropdownToggles.forEach((toggle) => {
		toggle.addEventListener("click", (event) => {
			event.preventDefault();
			const dropdownMenu = toggle.nextElementSibling;
			dropdownMenu.classList.toggle("show");
		});
	});

	document.addEventListener("click", (event) => {
		if (!event.target.matches(".dropdown .btn")) {
			const dropdownMenus = document.querySelectorAll(".dropdown-menu");
			dropdownMenus.forEach((menu) => {
				menu.classList.remove("show");
			});
		}
	});

	const checkoutButton = document.querySelector(".btn-checkout");
	if (checkoutButton) {
		checkoutButton.addEventListener("click", () => {});
	}

	const buttons = document.querySelectorAll(".pagination button");
	buttons.forEach((button) => {
		button.addEventListener("click", function () {
			buttons.forEach((btn) => btn.classList.remove("active"));
			this.classList.add("active");
		});
	});
});
