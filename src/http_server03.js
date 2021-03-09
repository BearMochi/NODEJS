const http = require('http');
const fs = require('fs/promises');

const server = http.createServer(async (req, res) => {
    const str = await fs.readFile(__dirname + '/headers.json');
    res.end(str);
});
server.listen(3000);