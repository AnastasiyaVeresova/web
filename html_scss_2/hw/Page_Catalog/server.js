const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Настройка сессий
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Сохраняем данные в файл JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        let json = [];
        if (!err && data) {
            json = JSON.parse(data);
        }
        json.push(formData);
        fs.writeFile('data.json', JSON.stringify(json, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Error saving data');
            } else {
                // Сохраняем данные пользователя в сессию
                req.session.user = formData;
                res.status(200).send('Data saved successfully');
            }
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Проверка данных
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            req.session.user = user;
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'profile.html'));
    } else {
        res.redirect('/login.html');
    }
});

app.get('/cart', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'cart.html'));
    } else {
        res.redirect('/login.html');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login.html');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
