var express = require('express')
var routes = require('./routes')
var app = express()

//app.set('views', './views')

app.use('/', routes.index);
app.use('/api/admins?', routes.admins)
app.use('/api/guests?', routes.guests)
app.use('/api/orders?', routes.orders)
app.use('/api/products?', routes.products)
app.use('/api/reviews?', routes.reviews)
app.use('/api/users?', routes.users)
app.use('/', routes.api)

// router.route('/')
//     .all((req, res, next) => {
//         res.statusCode = 200
//         res.setHeader("Content-Type", "application/json")
//         res.send('{ "message" : "Welcome to api" }')
// });

app.route('/api/:id')
   .all((req, res, next) => {
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.send('{ "message" : "Made a typo or method is not existant" }')
});


console.log('Server is online!')
app.listen(8080);