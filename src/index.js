require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`<h2>Hello</h2>`);
});

app.get('/123', (req, res) => {
    res.send(`<h2>123</h2>`);
});

app.use((req, res) => {
    res.status(404).send('<h1>找不到頁面404</h1>');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started:', new Date());
})