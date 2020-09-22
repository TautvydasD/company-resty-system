var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.statusCode = 200
    res.send("this is list")
})
router.get('/:id', (req, res) => {
    
    res.statusCode = 200
    //res.setHeader("Content-Type", "application/json")
    res.send("id is: " + req.params.id)
});

router.post('/', (req, res) => {
    res.statusCode = 201
});

router.put('/:id', (req, res) => {
    res.statusCode = 201
});

router.delete('/:id', (req, res) => {
    res.statusCode = 200
});

module.exports = router;