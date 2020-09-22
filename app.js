var express = require('express')
var routes = require('./routes')
var app = express()

//app.set('views', './views')

app.use('/', routes.index);
app.use('/api/admins', routes.admins)
app.use('/api/guests', routes.guests)
app.use('/api/orders', routes.orders)
app.use('/api/products', routes.products)
app.use('/api/reviews', routes.reviews)
app.use('/api/users', routes.users)
// app.
// app.get('/next', (req, res) => {
//     res.statusCode = 200
//     res.setHeader("Content-Type", "application/json")
//     res.send('{ "varialbes" : 1 }')
// })
console.log('Server is online!')
app.listen(5500);