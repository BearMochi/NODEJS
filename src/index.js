require('dotenv').config();
const express = require('express');
const fs = require('fs/promises');
const session = require('express-session');

//const multer = require('multer');

// const upload = multer({ dest: 'tmp_uploads/' })
const upload = require(__dirname + '/modules/upload-module');


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'Taiwangooodgood',
    cookie: {
        maxAge: 1200000,
    }
}));

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

app.post('/try-uploads', upload.array('photo', 10), (req, res) => {
    // req.files.formBody = req.body;
    res.json(req.files);
})

app.get('/my-params1/:action?/:id?', (req, res) => {
    res.json(req.params);
});

app.get(/\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
    const ori_url = req.url;
    let u = req.url.slice(3);
    u = u.split('?')[0];
    u = u.split('-').join('');

    res.json({ ori_url, u });
})

app.use('/aaa', require(__dirname + '/routes/admin2'));

app.get('/try-session', (req, res) => {
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;
    res.json(req.session);
});

const admins = {
    'superadmin': {
        'pw': '56789',
        'nickname': '小華'
    },
    'david': {
        'pw': '12345',
        'nickname': '小明'
    },
};

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    req.body.myTest = 'from server';
    res.json(req.body);
});
app.get('/logout', (req, res) => {

});

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