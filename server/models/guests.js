var mongoose = require('mongoose')

// var guests = {
//     "guest1" : { id: 1},
//     "guest2" : { id: 2},
//     "guest3" : { id: 3},
//     "guest4" : { id: 4},
//     "guest5" : { id: 5}
// };

var guestSchema = new mongoose.Schema({
    ipAddress: {
        type: String
    },
    loginTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Guest', guestSchema)