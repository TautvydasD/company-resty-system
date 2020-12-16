var express = require('express');
var router = express.Router();

var Order = require('../models/orders')
var Product = require('../models/products')
var Review = require('../models/reviews')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })

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

router.route('/')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        try {
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            var orderList = await Order.find().populate('products')
            res.send(orderList)
        } catch {
            res.send({ error: "Could not get orders" })
        }
    })
    .post(urlencodedParser, async (req, res) => {

        Order.create(req.body,
            (err, result) => {
                if (err) {
                    res.statusCode = 404
                    res.send({ message: err.message})
                } else {
                    res.statusCode = 201
                    res.send(result)
                }
            }
        )
    })
    .put((req, res) => {
        res.statusCode = 405
        res.setHeader("Content-Type", "application/json")
        res.send({ message: "Method not allowed, Missing item id" })
    })
    .delete((req, res) => {
        res.statusCode = 405
        res.setHeader("Content-Type", "application/json")
        res.send({ message: "Method not allowed, Missing item id" })
    })


router.route('/:id')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        Order.findOne({ _id: req.params.id })
        .populate('products')
        .exec((err, results) => {
            if (!results) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Item not found" })
                return
            }
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send(results)
        })
    })
    .post((req, res) => {
        res.statusCode = 400
        res.send({ message: "Bad Request" })
    })
    .put(urlencodedParser, async (req, res) => {
        Order.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true}, (err, doc, results) => {
            if(err) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Order not found" })
                return
            }
            if(!doc) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Item not found" })
                return
            }
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send(doc)
        })
    })
    .delete(async (req, res) => {
        Order.findOneAndRemove({ _id: req.params.id }, (err, results) => {
            if (err) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Cannot remove order" })
                return
            }
            if (!results) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Order not found" })
                return
            }

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.send("")
        })
    })

router.route('/:id/products')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        try {
            var orderObj = await Order.findOne({ _id: req.params.id }).populate('products')
            if (orderObj['products']) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ ['products']: orderObj.products })
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Item parameter not found" })
            }
        } catch {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.send({ message: "Item not found" })
        }
    })
    .post(urlencodedParser, async (req, res) => {
        try {
            var orderObj = await Order.findOne({ _id: req.params.id }).populate('products')
            if (orderObj['products']) {
                req.body.order = req.params.id
                var productObj = new Product(req.body)
                productObj.save((err) => {
                    orderObj.products.push(productObj)
                    orderObj.save((err) => {
                        if (err) {
                            res.statusCode = 400
                            res.send( {msg: 'error has occured'})
                            return
                        }
                    })
                    res.statusCode = 200
                    res.setHeader("Cache-Control", "max-age=3600")
                    res.setHeader("Content-Type", "application/json")
                    res.send({ ['products']: orderObj.products })
                })
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Item parameter not found" })
            }
        } catch {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.send({ message: "Item not found" })
        }
    })
    .put((req, res) => {
        res.statusCode = 405
        res.setHeader("Content-Type", "application/json")
        res.send({ message: "Method not allowed, Missing item id" })
    })
    .delete((req, res) => {
        res.statusCode = 405
        res.setHeader("Content-Type", "application/json")
        res.send({ message: "Method not allowed, Missing item id" })
    })

router.route('/:id/:param')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        try {
            var orderObj = await Order.findOne({ _id: req.params.id }).populate('products')
            if (orderObj[req.params.param]) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ [req.params.param]: orderObj[req.params.param] })
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Item parameter not found" })
            }
        } catch {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.send({ message: "Item not found" })
        }
    })

// router.get('/:id/products?/:param', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         if(orders[req.params.id]['products'].hasOwnProperty(req.params.param)){
//             res.statusCode = 200
//             res.setHeader("Cache-Control", "max-age=3600")
//             res.setHeader("Content-Type", "application/json")
//             res.send({ [req.params.param]: orders[req.params.id]['products'][req.params.param]})
//         } else {
//             res.statusCode = 404
//             res.setHeader("Content-Type", "application/json")
//             res.send({message: "Item parameter not found"})
//         }
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });


// router.post('/:id/products?/:param', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.send({ message: "Bad Request"})
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });


// router.put('/:id/products?/:param', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         if(orders[req.params.id]['products'].hasOwnProperty(req.params.param)){
//             res.statusCode = 201
//             res.send("")
//         } else {
//             res.statusCode = 404
//             res.setHeader("Content-Type", "application/json")
//             res.send({message: "Item parameter not found"})
//         }
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

// router.delete('/:id/products?/:param', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         if(orders[req.params.id]['products'].hasOwnProperty(req.params.param)){
//             res.statusCode = 200
//             res.setHeader("Content-Type", "application/json")
//             res.send("")
//         } else {
//             res.statusCode = 404
//             res.setHeader("Content-Type", "application/json")
//             res.send({message: "Item parameter not found"})
//         }
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });


module.exports = router;