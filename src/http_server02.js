const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.writeFile(
        __dirname + '/headers.json',
        JSON.stringify(req.headers),
        (error) => {
            if (error) {
                res.end('error: ' + error);
            } else {
                res.end('ok: ' + new Date());
            }

        })
});
server.listen(3000);