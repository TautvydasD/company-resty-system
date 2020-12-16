const http = require('http')
const url = require('url')
const fs = require('fs')
const hostname = '127.0.0.1'
const port = 5500

const server = http.createServer((req, res) => {
    fs.readFile('./views/index.html', (err, data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        return res.end();
    })
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})