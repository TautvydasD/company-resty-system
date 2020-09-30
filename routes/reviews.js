var express = require('express');
var router = express.Router();

var reviews = {
    "review1" : { id: 1, user: "user1", data: "2020-05-05", comment: "wow", rating: 8},
    "review2" : { id: 2, user: "user1", data: "2020-04-15", comment: "+37061111111", rating: 10},
    "review3" : { id: 3, user: "user2", data: "2020-09-25", comment: "+37062222222", rating: 5},
    "review4" : { id: 4, user: "user2", data: "2020-08-15", comment: "+37063333333", rating: 2},
    "review5" : { id: 5, user: "user2", data: "2020-03-11", comment: "+37064444444", rating: 8}
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(reviews)
});

router.get('/:id', (req, res) => {
    if(reviews.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Cache-Control", "max-age=3600")
        res.setHeader("Content-Type", "application/json")
        res.send(reviews[req.params.id])
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.get('/:id/:param', (req, res) => {
    if(reviews.hasOwnProperty(req.params.id)) {
        if(reviews[req.params.id].hasOwnProperty(req.params.param)){
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send({ [req.params.param]: reviews[req.params.id][req.params.param]})
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
    // if (!reviews.hasOwnProperty(req.params.name)) {
    res.statusCode = 201
    res.send("")
    // } else {
    //     res.statusCode = 409
    //     res.setHeader("Content-Type", "application/json")
    //     res.send({message: "Item already"})
    // }
});

router.post('/:id', (req, res) => {    
    res.statusCode = 400
    res.send({ message: "Bad Request"})
});

router.put('/:id', (req, res) => {
    if(reviews.hasOwnProperty(req.params.id)) {
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
    if (reviews.hasOwnProperty(req.params.id)) {
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