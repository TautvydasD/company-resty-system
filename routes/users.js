var express = require('express');
var router = express.Router();

var users = {
    "user1" : { id: 1, name: "Tautvis",   age: "23", number: "+37069857575", orders: {}},
    "user2" : { id: 2, name: "Arvydas",   age: "20", number: "+37061111111", orders: {}},
    "user3" : { id: 3, name: "Karolis",   age: "21", number: "+37062222222", orders: {}},
    "user4" : { id: 4, name: "Lukas",     age: "22", number: "+37063333333", orders: {}},
    "user5" : { id: 5, name: "Tomas",     age: "25", number: "+37064444444", 
            orders: {   
                "ord4" : { id: 4, data: "2020-03-03",   sum: "111",   products: {}},
                "ord5" : { id: 5, data: "2020-04-01",   sum: "420",   products: {}}
            }
        }
};

router.get('/', (req, res) => {
    res.statusCode = 200
    res.setHeader("Cache-Control", "max-age=3600")
    res.setHeader("Content-Type", "application/json")
    res.send(users)
});

router.get('/:id', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Cache-Control", "max-age=3600")
        res.setHeader("Content-Type", "application/json")
        res.send(users[req.params.id])
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.get('/:id/orders?/:param', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        if(users[req.params.id]['orders'].hasOwnProperty(req.params.param)){
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send({ [req.params.param]: users[req.params.id]['orders'][req.params.param]})
            // res.send({ req.params.param: users[req.params.id][req.params.param] })
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

router.get('/:id/:param', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        if(users[req.params.id].hasOwnProperty(req.params.param)){
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send({ [req.params.param]: users[req.params.id][req.params.param]})
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
    // if (!users.hasOwnProperty(req.params.name)) {
    res.statusCode = 201
    res.send("")
    // } else {
    //     res.statusCode = 409
    //     res.setHeader("Content-Type", "application/json")
    //     res.send({message: "Item already"})
    // }
});

router.post('/:id/orders?/', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        res.statusCode = 201
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.post('/:id/orders?/:param', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        res.statusCode = 400
        res.send({ message: "Bad Request"})
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.post('/:id', (req, res) => {    
    res.statusCode = 400
    res.send({ message: "Bad Request"})
});

router.put('/:id', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        res.statusCode = 201
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.put('/:id/orders?/', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Missing item id"})
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.put('/:id/orders?/:param', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        if(users[req.params.id]['orders'].hasOwnProperty(req.params.param)){
            res.statusCode = 201
            res.send("")
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

router.put('/', (req, res) => {
    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.send({message: "Missing item id"})
});

router.delete('/:id', (req, res) => {
    if (users.hasOwnProperty(req.params.id)) {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.send("")
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item does not exist"})
    }
});

router.delete('/:id/orders?/:param', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        if(users[req.params.id]['orders'].hasOwnProperty(req.params.param)){
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.send("")
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

router.delete('/:id/orders?/', (req, res) => {
    if(users.hasOwnProperty(req.params.id)) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Missing item id"})
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.send({message: "Item not found"})
    }
});

router.delete('/', (req, res) => {
    res.statusCode = 400
    res.setHeader("Content-Type", "application/json")
    res.send({message: "Missing item id"})
});

module.exports = router;