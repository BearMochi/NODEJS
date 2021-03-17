const express = require('express');
const moment = require('moment-timezone');
const router = express.Router();
const db = require(__dirname + '/../modules/tedious_connect');
const { TYPES } = require("tedious");
const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

router.get('/', async (req, res) => {
    // const sql = "SELECT COUNT(1) num FROM address_book";
    const sql = "SELECT * FROM address_book";
    const results = await db.myExecSql(sql)
    results.rows.forEach(el => {
        el.birthday = moment(el.birthday).format('YYYY-MM-DD');
    })
    res.render('address-book/list', { rows: results.rows });
});

router.get('/add', (req, res) => {
    res.render('address-book/add');
});
router.post('/add', async (req, res) => {
    const output = {
        success: false,
        body: req.body
    };
    // TODO: 檢查欄位的格式
    if (!email_pattern.test(req.body.email)) {
        output.error = 'Email 格式不符';
        return res.json(output);
    }

    const sql = `INSERT INTO address_book 
    (name, email, mobile, birthday, address, created_at) 
VALUES (@name, @email, @mobile, @birthday, @address, GETDATE())`;
    const result = await db.myExecSql(sql, [
        [TYPES.NVarChar, req.body.name],
        [TYPES.NVarChar, req.body.email],
        [TYPES.NVarChar, req.body.mobile],
        [TYPES.Date, req.body.birthday],
        [TYPES.NVarChar, req.body.address],
    ]);
    if (result.rowCount === 1) {
        output.success = true;
    }
    output.result = result;
    res.json(output);
});

module.exports = router;





