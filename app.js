var express = require('express')
var routes = require('./routes')
var app = express()

var mongodb = require('mongodb')
var mongoose = require('mongoose')
var mongoClient = mongodb.MongoClient

var url = "mongodb://localhost:27017/test"
var jwt = require('jsonwebtoken')
const tokenSecret = 'abcdefghjklmnopasdfddfsdasdafsmd'

var User = require('./models/users')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const verifyToken = async function (req,res,next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, tokenSecret, async (err, authData) => {
            
            if (err) {
                res.statusCode = 403
                res.send({ error: 'Unauthorized'})
            } else {
                let currentTime = Math.floor(Date.now() / 1000)
                var isExpired = (authData.exp - currentTime) < 0 ? true : false
                
                if (isExpired) {
                    res.statusCode = 401
                    res.send({ error: 'Token Expired'})
                    return
                }
                
                var userObj = await User.findOne({ name: authData.username})

                if (userObj.status === 'admin') {
                    next()
                } else {
                    res.statusCode = 403
                    res.send({ error: 'Unauthorized'})
                }
            }
        })
    } else {
        res.statusCode = 403
        res.send({ error: 'Unauthorized'})
    }
}

// app.set('views', './views')
app.use(express.json())
app.use('/', routes.index)
app.use('/api', routes.api)
app.use('/api/admins?', verifyToken, routes.admins)
app.use('/api/guests?', verifyToken, routes.guests)
app.use('/api/orders?', verifyToken, routes.orders)
app.use('/api/products?', verifyToken, routes.products)
app.use('/api/reviews?', verifyToken, routes.reviews)
app.use('/api/users?', verifyToken, routes.users)
app.use((req, res, next) => {
    return res.status(404).json({ message: 'Not found'})
})

console.log('Server is online!')
app.listen(8080);