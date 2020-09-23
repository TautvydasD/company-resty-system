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
})
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

router.post('/', (req, res) => {
    res.statusCode = 201
    res.send("")
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

module.exports = router;