require('dotenv').config();
const express = require('express');
const fs = require('fs/promises');
// const multer = require('multer');

const upload = require(__dirname + '/modules/upload-module');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('Home', { name: 'Daniel' })
    // res.send(`<h2>Hello</h2>`);
});

app.get('/sales', (req, res) => {
    const sales = require(__dirname + '/../data/sales.json');
    res.render('sales', { sales })
    // res.send(`<h2>Hello</h2>`);
});

app.get('/try-qs', (req, res) => {
    res.json(req.query);
});

// const urlencodedParser = express.urlencoded({ extended: false });
// app.post('/try-post', urlencodedParser, (req, res) => {
//     res.json(req.body);
// });

app.post('/try-post', (req, res) => {
    req.body.clientMethod = 'post';
    req.body.comeFrom = '/try-post';
    res.json(req.body);
    // res.end(JSON.stringify(req.body));
});

app.put('/try-post', (req, res) => {
    req.body.clientMethod = 'put';
    req.body.comeFrom = '/try-post';
    res.json(req.body);
});

app.delete('/try-post', (req, res) => {
    req.body.clientMethod = 'delete';
    req.body.comeFrom = '/try-post';
    res.json(req.body);
});

app.get('/try-post-form', (req, res) => {
    res.render('try-post-form');
});

app.post('/try-post-form', (req, res) => {
    // res.json(req.body);
    res.render('try-post-form', req.body);
});

app.post('/try-upload', upload.single('avatar'), (req, res) => {
    req.file.formBody = req.body;
    res.json(req.file);
})

app.use(async (req, res) => {
    try {
        data = await fs.readFile(__dirname + '/../public/404.html');
        // console.log(data);
        res.status(404).send(data.toString());
    } catch (ex) {
        // console.log(ex);
        res.status(404).send('<h1>找不到頁面</h1>');
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started:', new Date());
})