var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var User = require('../models/users')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
// router.use(jwt({secret: ''}))
const tokenSecret = 'abcdefghjklmnopasdfddfsdasdafsmd'

router.post('/login', urlencodedParser, async (req, res) => {
    const { username, password } = req.body

    loggedUser = await User.findOne({ name: username, password: password})

    if (loggedUser) {
        const accessToken = jwt.sign({
            username: loggedUser.name,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, tokenSecret)
        res.send({ jwt: accessToken})
    } else {
        res.statusCode = 401
        res.setHeader("Content-Type", "application/json")
        res.send({ error: 'Incorrect Credentials' })
    }
})


module.exports = router