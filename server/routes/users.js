var express = require('express')
var router = express.Router()
var User = require('../models/users')
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
            var usersList = await User.find()
            res.send(usersList)
        } catch {
            res.send({ error: "Could not get users" })
        }
    })
    .post(urlencodedParser, async (req, res) => {
        var userObj = await User.findOne({ name: req.body.name })

        if (userObj) {
            res.statusCode = 409
            res.send({ error: "User already exists" })
            return
        }

        User.create(req.body,
            (err, result) => {
                if (err) {
                    res.statusCode = 404
                    res.send({ error: err.message})
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
        User.findOne({ _id: req.params.id }, (err, results) => {
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
        User.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true}, (err, doc, results) => {
            if(err) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "User not found" })
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
        User.findOneAndRemove({ _id: req.params.id }, (err, results) => {
            if (err) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Cannot remove user" })
                return
            }
            if (!results) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "User not found" })
                return
            }

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.send("")
        })
    })

router.route('/:id/:param')
    .all((req, res, next) => {
        next()
    })
    .get(async (req, res) => {
        try {
            var userObj = await User.findOne({ _id: req.params.id })
            if (userObj[req.params.param]) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ [req.params.param]: userObj[req.params.param] })
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

// TODO: Implement
router.route('/:id/orders?')
    .all((req,res,next) => {
        next()
    })

// TODO: Implement
router.route('/:id/orders?/:param')
    .all((req,res,next) => {
        next()
    })

// router.get('/:id/orders?/:param', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         if(users[req.params.id]['orders'].hasOwnProperty(req.params.param)){
//             res.statusCode = 200
//             res.setHeader("Cache-Control", "max-age=3600")
//             res.setHeader("Content-Type", "application/json")
//             res.send({ [req.params.param]: users[req.params.id]['orders'][req.params.param]})
//             // res.send({ req.params.param: users[req.params.id][req.params.param] })
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



// router.post('/:id/orders?/', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         res.statusCode = 201
//         res.send("")
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

// router.post('/:id/orders?/:param', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.send({ message: "Bad Request"})
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

// router.put('/:id/orders?/', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Missing item id"})
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

// router.put('/:id/orders?/:param', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         if(users[req.params.id]['orders'].hasOwnProperty(req.params.param)){
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

// router.delete('/:id/orders?/:param', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         if(users[req.params.id]['orders'].hasOwnProperty(req.params.param)){
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

// router.delete('/:id/orders?/', (req, res) => {
//     if(users.hasOwnProperty(req.params.id)) {
//         res.statusCode = 400
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Missing item id"})
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

module.exports = router;