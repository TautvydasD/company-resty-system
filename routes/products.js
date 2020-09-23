var express = require('express');
var router = express.Router();

var products = {
    "product1" : { id: 1, price: "20.5",    amount: 22,  reviews: ""},
    "product2" : { id: 2, price: "10",      amount: 10,  reviews: ""},
    "product3" : { id: 3, price: "2",       amount: 1,   reviews: ""},
    "product4" : { id: 4, price: "3",       amount: 2,   reviews: ""},
    "product5" : { id: 5, price: "100",     amount: 20,  reviews: ""},
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(products)
})
router.get('/:id', (req, res) => {
    if(products.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Cache-Control", "max-age=3600")
        res.setHeader("Content-Type", "application/json")
        res.send(products[req.params.id])
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.post('/', (req, res) => {    
    // if (!products.hasOwnProperty(req.params.name)) {
    res.statusCode = 201
    res.send("")
    // } else {
    //     res.statusCode = 409
    //     res.setHeader("Content-Type", "application/json")
    //     res.send({message: "Item already"})
    // }
});

router.put('/:id', (req, res) => {
    if(products.hasOwnProperty(req.params.id)) {
        res.statusCode = 201
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.delete('/:id', (req, res) => {
    if (products.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

module.exports = router;