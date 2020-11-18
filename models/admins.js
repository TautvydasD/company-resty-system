var mongoose = require('mongoose')

// var admins = {
//     "admin1" : { id: 1, name: "Tautvis",   age: "23", number: "+37069857575"},
//     "admin2" : { id: 2, name: "Arvydas",   age: "20", number: "+37061111111"},
//     "admin3" : { id: 3, name: "Karolis",   age: "21", number: "+37062222222"},
//     "admin4" : { id: 4, name: "Lukas",     age: "22", number: "+37063333333"},
//     "admin5" : { id: 5, name: "Tomas",     age: "25", number: "+37064444444"}
// };

var adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    }
})

module.exports = mongoose.model('Admin', adminSchema)