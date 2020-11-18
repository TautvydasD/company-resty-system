var express = require('express');
var router = express.Router();

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

// router.get('/', (req, res) => {
//     res.statusCode = 200
//     res.setHeader("Cache-Control", "max-age=3600")
//     res.setHeader("Content-Type", "application/json")
//     res.send(orders)
// });

// router.get('/:id', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 200
//         res.setHeader("Cache-Control", "max-age=3600")
//         res.setHeader("Content-Type", "application/json")
//         res.send(orders[req.params.id])
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

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

// router.get('/:id/:param', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         if(orders[req.params.id].hasOwnProperty(req.params.param)){
//             res.statusCode = 200
//             res.setHeader("Cache-Control", "max-age=3600")
//             res.setHeader("Content-Type", "application/json")
//             res.send({ [req.params.param]: orders[req.params.id][req.params.param]})
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

// router.post('/', (req, res) => {
//     res.statusCode = 201
//     res.send("")
// });

// router.post('/:id', (req, res) => {    
//     res.statusCode = 400
//     res.send({ message: "Bad Request"})
// });

// router.post('/:id/products?/', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 201
//         res.send("")
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

// router.put('/:id', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 201
//         res.send("")
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item does not exist"})
//     }
// });

// router.put('/:id/products?/', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Missing item id"})
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

// router.put('/', (req, res) => {
//     res.statusCode = 400
//     res.setHeader("Content-Type", "application/json")
//     res.send({message: "Missing item id"})
// });

// router.delete('/:id', (req, res) => {
//     if (orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 200
//         res.send("")
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item does not exist"})
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

// router.delete('/:id/products?/', (req, res) => {
//     if(orders.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Missing item id"})
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });


// router.delete('/', (req, res) => {
//     res.statusCode = 400
//     res.setHeader("Content-Type", "application/json")
//     res.send({message: "Missing item id"})
// });

module.exports = router;