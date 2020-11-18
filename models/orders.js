var mongoose = require('mongoose')

// var orders = {
//     "ord1" : { id: 1, date: "2020-10-10",   sum: "520",   products: {}},
//     "ord2" : { id: 2, data: "2019-09-09",   sum: "22.5",  products: {
//         "product1" : { id: 1, price: "20.5",    amount: 22,  reviews: {}},
//         "product2" : { id: 2, price: "10",      amount: 10,  reviews: {}}
//     }},
//     "ord3" : { id: 3, data: "2020-01-01",   sum: "30",    products: {}},
//     "ord4" : { id: 4, data: "2020-03-03",   sum: "111",   products: {}},
//     "ord5" : { id: 5, data: "2020-04-01",   sum: "420",   products: {}}
// };

var orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sum: {
        type: Number,
        default: 0
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]

})

module.exports = mongoose.model('Order', orderSchema)