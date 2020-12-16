var mongoose = require('mongoose')

// var products = {
//     "product1" : { id: 1, price: "20.5",    amount: 22,  reviews: {}},
//     "product2" : { id: 2, price: "10",      amount: 10,  reviews: {}},
//     "product3" : { id: 3, price: "2",       amount: 1,   reviews: {
//         "review4" : { id: 4, user: "user2", data: "2020-08-15", comment: "+37063333333", rating: 2},
//         "review5" : { id: 5, user: "user2", data: "2020-03-11", comment: "+37064444444", rating: 8}
//     }},
//     "product4" : { id: 4, price: "3",       amount: 2,   reviews: {}},
//     "product5" : { id: 5, price: "100",     amount: 20,  reviews: {}},
// };

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: String,
        required: [true, 'Product price is required']
    },
    picture: {
        type: String,
    },
    amount: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
})

module.exports = mongoose.model('Product', productSchema)