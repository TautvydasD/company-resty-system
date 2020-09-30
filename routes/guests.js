var express = require('express');
var router = express.Router();

var guests = {
    "guest1" : { id: 1},
    "guest2" : { id: 2},
    "guest3" : { id: 3},
    "guest4" : { id: 4},
    "guest5" : { id: 5}
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(guests)
});

router.get('/:id', (req, res) => {
    if(guests.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Cache-Control", "max-age=3600")
        res.setHeader("Content-Type", "application/json")
        res.send(guests[req.params.id])
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.get('/:id/:param', (req, res) => {
    if(guests.hasOwnProperty(req.params.id)) {
        if(guests[req.params.id].hasOwnProperty(req.params.param)){
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send({ [req.params.param]: guests[req.params.id][req.params.param]})
            // res.send({ req.params.param: guests[req.params.id][req.params.param] })
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.send({message: "Item parameter not found"})
        }
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

router.post('/:id', (req, res) => {    
    res.statusCode = 400
    res.send({ message: "Bad Request"})
});

router.put('/:id', (req, res) => {
    if(guests.hasOwnProperty(req.params.id)) {
        res.statusCode = 201
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.put('/', (req, res) => {
    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.send({message: "Missing item id"})
});

router.delete('/:id', (req, res) => {
    if (guests.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.delete('/', (req, res) => {
    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.send({message: "Missing item id"})
});

module.exports = router;