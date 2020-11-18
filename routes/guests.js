var express = require('express')
var router = express.Router()

var Guest = require('../models/guests')
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
            var guestList = await Guest.find()
            res.send(guestList)
        } catch {
            res.send({ error: "Could not get guests" })
        }
    })
    .post(urlencodedParser, async (req, res) => {
        Guest.create(req.body,
            (err, result) => {
                if (err) {
                    res.statusCode = 404
                    res.send({ message: err.message })
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
        Guest.findOne({ _id: req.params.id }, (err, results) => {
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
        Guest.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true}, (err, doc, results) => {
            if(err) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Guest not found" })
                return
            }
            if(!doc) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Guest not found" })
                return
            }
            res.statusCode = 200
            res.setHeader("Cache-Control", "max-age=3600")
            res.setHeader("Content-Type", "application/json")
            res.send(doc)
        })
    })
    .delete(async (req, res) => {
        Guest.findOneAndRemove({ _id: req.params.id }, (err, results) => {
            if (err) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Cannot remove guest" })
                return
            }
            if (!results) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Guest not found" })
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
            var guestObj = await Guest.findOne({ _id: req.params.id })
            if (guestObj[req.params.param]) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ [req.params.param]: guestObj[req.params.param] })
            } else {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Guest not found" })
            }
        } catch {
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            res.send({ message: "Guest not found" })
        }
    })

// router.get('/', (req, res) => {
//     res.statusCode = 200
//     res.setHeader("Cache-Control", "max-age=3600")
//     res.setHeader("Content-Type", "application/json")
//     res.send(guests)
// });

// router.get('/:id', (req, res) => {
//     if(guests.hasOwnProperty(req.params.id)) {
//         res.statusCode = 200
//         res.setHeader("Cache-Control", "max-age=3600")
//         res.setHeader("Content-Type", "application/json")
//         res.send(guests[req.params.id])
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item not found"})
//     }
// });

// router.get('/:id/:param', (req, res) => {
//     if(guests.hasOwnProperty(req.params.id)) {
//         if(guests[req.params.id].hasOwnProperty(req.params.param)){
//             res.statusCode = 200
//             res.setHeader("Cache-Control", "max-age=3600")
//             res.setHeader("Content-Type", "application/json")
//             res.send({ [req.params.param]: guests[req.params.id][req.params.param]})
//             // res.send({ req.params.param: guests[req.params.id][req.params.param] })
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

// router.put('/:id', (req, res) => {
//     if(guests.hasOwnProperty(req.params.id)) {
//         res.statusCode = 201
//         res.send("")
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item does not exist"})
//     }
// });

// router.put('/', (req, res) => {
//     res.statusCode = 400
//     res.setHeader("Content-Type", "application/json")
//     res.send({message: "Missing item id"})
// });

// router.delete('/:id', (req, res) => {
//     if (guests.hasOwnProperty(req.params.id)) {
//         res.statusCode = 200
//         res.send("")
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "application/json")
//         res.send({message: "Item does not exist"})
//     }
// });

// router.delete('/', (req, res) => {
//     res.statusCode = 400
//     res.setHeader("Content-Type", "application/json")
//     res.send({message: "Missing item id"})
// });

module.exports = router;