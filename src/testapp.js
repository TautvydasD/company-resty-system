const http = require('http')
const url = require('url')
const fs = require('fs')
const { JWT } = require("jose")
const hostname = '127.0.0.1'
//const port = process.env.PORT
const port = 5500

const privateKey = "12345678912345678912345678912345"
const payload = {
  group: 'root',
  name: 'user'
}

const key = JWT.sign(
  payload,
  privateKey,
  {
    algorithm: 'HS256',
    header: {
      typ: 'JWT'
    }
  }
)
const server = http.createServer((req, res) => {
  
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month; 
  res.end(txt)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
