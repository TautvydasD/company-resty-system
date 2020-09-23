var express = require('express');
var router = express.Router();

var orders = {
    "ord1" : { id: 1, date: "2020-10-10",   sum: "520",   products: ""},
    "ord2" : { id: 2, data: "2019-09-09",   sum: "22.5",  products: ""},
    "ord3" : { id: 3, data: "2020-01-01",   sum: "30",    products: ""},
    "ord4" : { id: 4, data: "2020-03-03",   sum: "111",   products: ""},
    "ord5" : { id: 5, data: "2020-04-01",   sum: "420",   products: ""}
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(orders)
})
router.get('/:id', (req, res) => {
    if(orders.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Cache-Control", "max-age=3600")
        res.setHeader("Content-Type", "application/json")
        res.send(orders[req.params.id])
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.post('/', (req, res) => {
    res.statusCode = 201
    res.send("")
});

router.put('/:id', (req, res) => {
    if(orders.hasOwnProperty(req.params.id)) {
        res.statusCode = 201
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.delete('/:id', (req, res) => {
    if (orders.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

module.exports = router;