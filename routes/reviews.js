var express = require('express');
var router = express.Router();

var reviews = {
    "review1" : { id: 1, user: "user1", data: "2020-05-05", comment: "wow", product: "", rating: ""},
    "review2" : { id: 2, user: "user1", data: "2020-04-15", comment: "+37061111111", product: "", rating: ""},
    "review3" : { id: 3, user: "user2", data: "2020-09-25", comment: "+37062222222", product: "", rating: ""},
    "review4" : { id: 4, user: "user2", data: "2020-08-15", comment: "+37063333333", product: "", rating: ""},
    "review5" : { id: 5, user: "user2", data: "2020-03-11", comment: "+37064444444", product: "", rating: ""}
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(reviews)
})
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

module.exports = router;