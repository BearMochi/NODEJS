const http = require('http');
const fs = require('fs/promises');

const server = http.createServer(async (req, res) => {
    const path = __dirname + '/headers02.json';
    const data = { ...req.headers, url: req.url };
    await fs.writeFile(path, JSON.stringify(data));
    const str = await fs.readFile(path);
    res.end(str);
});
server.listen(3000);