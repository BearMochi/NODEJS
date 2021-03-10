require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`<h2>Hello</h2>`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started:', new Date());
})