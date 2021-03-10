require('dotenv').config();
const express = require('express');
const fs = require('fs/promises');

const app = express();

app.use(express.static(__dirname + '/../public/404.html'));

app.get('/', (req, res) => {
    res.send(`<h2>Hello</h2>`);
});

app.use(async (req, res) => {
    try {
        data = await fs.readFile(__dirname + '/../public/404.html');
        console.log(data);
        res.status(404).send(data.toString());
    } catch (ex) {
        console.log(ex);
        res.status(404).send('<h1>找不到頁面</h1>');
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started:', new Date());
})