const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    phone: {
        type: String
    },
    status: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema)