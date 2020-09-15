var express = require('express')
var app = express()

var index = require('./routes/index')
var admins = require('./routes/admins')
var guests = require('./routes/guests')
var orders = require('./routes/orders')
var products = require('./routes/products')
var reviews = require('./routes/reviews')
var users = require('./routes/users')

//app.set('views', './views')

app.use('/', index);
app.use('/api/admins', admins)
app.use('/api/guests', guests)
app.use('/api/orders', orders)
app.use('/api/products', products)
app.use('/api/reviews', reviews)
app.use('/api/users', users)

// app.get('/next', (req, res) => {
//     res.statusCode = 200
//     res.setHeader("Content-Type", "application/json")
//     res.send('{ "varialbes" : 1 }')
// })

app.listen(5500);