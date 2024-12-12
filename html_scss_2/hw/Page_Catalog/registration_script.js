window.onload = function() {
    includeHTML();
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Собираем данные из формы
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Проверка данных
        if (!firstName || !lastName || !gender || !email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Простая валидация email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Пожалуйста, введите верный e-mail');
            return;
        }

        // Простая валидация пароля
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Пароль должен содержать на менее 8 символов и включать не менее одной цифры, заглавной буквы и буквы в нижнем регистре');
            return;
        }

        // Отправка данных на сервер
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                gender,
                email,
                password
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Данные успешно обновлены') {
                window.location.href = '/profile';
            } else {
                alert(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка формы');
        });
    });
};

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                    // Обновляем количество товаров в корзине после загрузки шапки
                    updateCartCount();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}
