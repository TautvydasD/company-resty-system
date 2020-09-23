var express = require('express');
var router = express.Router();

var admins = {
    "admin1" : { id: 1, name: "Tautvis",   age: "23", number: "+37069857575"},
    "admin2" : { id: 2, name: "Arvydas",   age: "20", number: "+37061111111"},
    "admin3" : { id: 3, name: "Karolis",   age: "21", number: "+37062222222"},
    "admin4" : { id: 4, name: "Lukas",     age: "22", number: "+37063333333"},
    "admin5" : { id: 5, name: "Tomas",     age: "25", number: "+37064444444"}
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(admins)
})
router.get('/:id', (req, res) => {
    if(admins.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Cache-Control", "max-age=3600")
        res.setHeader("Content-Type", "application/json")
        res.send(admins[req.params.id])
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.post('/', (req, res) => {    
    // if (!admins.hasOwnProperty(req.params.name)) {
    res.statusCode = 201
    res.send("")
    // } else {
    //     res.statusCode = 409
    //     res.setHeader("Content-Type", "application/json")
    //     res.send({message: "Item already"})
    // }
});

router.put('/:id', (req, res) => {
    if(admins.hasOwnProperty(req.params.id)) {
        res.statusCode = 201
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.delete('/:id', (req, res) => {
    if (admins.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

module.exports = router;