var express = require('express');
var router = express.Router();


router.route('/api')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.send('{ "message" : "Welcome to api" }')
});

router.route('/api/:id')
   .all((req, res, next) => {
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.send('{ "message" : "Made a typo or method is not existant" }')
});

module.exports = router;
