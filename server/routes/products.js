var express = require('express');
var router = express.Router();

var Product = require('../models/products')
var Review = require('../models/reviews')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })

router.route('/')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        try {
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            var productList = await Product.find().populate('reviews')
            res.json(productList)
        } catch {
            res.send({ error: "Could not get products" })
        }
    })
    .post(urlencodedParser, async (req, res) => {
        var productObj = await Product.findOne({ name: req.body.name })

        if (productObj) {
            res.statusCode = 409
            res.send({ error: "Product already exists" })
            return
        }

        Product.create(req.body,
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
        Product.findOne({ _id: req.params.id })
        .populate('reviews')
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
        Product.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true}, (err, doc, results) => {
            if(err) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Product not found" })
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
        Product.findOneAndRemove({ _id: req.params.id }, (err, results) => {
            if (err) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Cannot remove product" })
                return
            }
            if (!results) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Product not found" })
                return
            }

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.send("")
        })
    })

router.route('/:id/reviews')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        try {
            var productObj = await Product.findOne({ _id: req.params.id }).populate('reviews')
            if (productObj['reviews']) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ [req.params.param]: productObj[req.params.param] })
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
            var productObj = await Product.findOne({ _id: req.params.id }).populate('reviews')
            if (productObj['reviews']) {
                req.body.product = req.params.id
                var reviewObj = new Review(req.body)
                reviewObj.save((err) => {
                    productObj.reviews.push(reviewObj)
                    productObj.save((err) => {
                        if (err) {
                            res.statusCode = 400
                            res.send( {msg: 'error has occured'})
                            return
                        }
                    })
                    res.statusCode = 200
                    res.setHeader("Cache-Control", "max-age=3600")
                    res.setHeader("Content-Type", "application/json")
                    res.send({ ['reviews']: productObj.reviews })
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
            var productObj = await Product.findOne({ _id: req.params.id }).populate('reviews')
            if (productObj[req.params.param]) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ [req.params.param]: productObj[req.params.param] })
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

// TODO THIS
router.route('/:id/reviews/:param')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {

    })
    .post((req, res) => {
        res.statusCode = 400
        res.send({ message: "Bad Request" })
    })
    .put(async (req, res) => {

    })
    .delete(async (req, res) => {
        
    })

// router.get('/:id/reviews?/:param', (req, res) => {
//     if(products.hasOwnProperty(req.params.id)) {
//         if(products[req.params.id]['reviews'].hasOwnProperty(req.params.param)){
//             res.statusCode = 200
//             res.setHeader("Cache-Control", "max-age=3600")
//             res.setHeader("Content-Type", "application/json")
//             res.send({ [req.params.param]: products[req.params.id]['reviews'][req.params.param]})
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


// router.post('/:id/reviews?/:param', (req, res) => {
//     if(products.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.send({ message: "Bad Request"})
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

// router.put('/:id/reviews?/:param', (req, res) => {
//     if(products.hasOwnProperty(req.params.id)) {
//         if(products[req.params.id]['reviews'].hasOwnProperty(req.params.param)){
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

// router.delete('/:id/reviews?/:param', (req, res) => {
//     if(products.hasOwnProperty(req.params.id)) {
//         if(products[req.params.id]['reviews'].hasOwnProperty(req.params.param)){
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