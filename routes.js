var index = require('./routes/index')
var api = require('./routes/api')
var admins = require('./routes/admins')
var guests = require('./routes/guests')
var orders = require('./routes/orders')
var products = require('./routes/products')
var reviews = require('./routes/reviews')
var users = require('./routes/users')

module.exports = { 
    index,
    admins, 
    guests,
    orders,
    products,
    reviews,
    users,
    api
}