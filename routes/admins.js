var express = require('express');
var router = express.Router();

var Admin = require('../models/admins')
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
            var adminList = await Admin.find()
            res.send(adminList)
        } catch {
            res.send({ error: "Could not get admins" })
        }
    })
    .post(urlencodedParser, async (req, res) => {
        var adminObj = await Admin.findOne({ name: req.body.name })

        if (adminObj) {
            res.statusCode = 409
            res.send({ error: "Admin already exists" })
            return
        }

        Admin.create(req.body,
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
        Admin.findOne({ _id: req.params.id }, (err, results) => {
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
        Admin.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true}, (err, doc, results) => {
            if(err) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Admin not found" })
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
        Admin.findOneAndRemove({ _id: req.params.id }, (err, results) => {
            if (err) {
                res.statusCode = 400
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Cannot remove admin" })
                return
            }
            if (!results) {
                res.statusCode = 404
                res.setHeader("Content-Type", "application/json")
                res.send({ message: "Admin not found" })
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
            var adminObj = await Admin.findOne({ _id: req.params.id })
            if (adminObj[req.params.param]) {
                res.statusCode = 200
                res.setHeader("Cache-Control", "max-age=3600")
                res.setHeader("Content-Type", "application/json")
                res.send({ [req.params.param]: adminObj[req.params.param] })
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
    
module.exports = router;