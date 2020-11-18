/**
 * Review model
 */

var mongoose = require('mongoose')

// var reviews = {
//   "review1" : { id: 1, user: "user1", data: "2020-05-05", comment: "wow", rating: 8},
//   "review2" : { id: 2, user: "user1", data: "2020-04-15", comment: "+37061111111", rating: 10},
//   "review3" : { id: 3, user: "user2", data: "2020-09-25", comment: "+37062222222", rating: 5},
//   "review4" : { id: 4, user: "user2", data: "2020-08-15", comment: "+37063333333", rating: 2},
//   "review5" : { id: 5, user: "user2", data: "2020-03-11", comment: "+37064444444", rating: 8}
// };

var reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: 'Required field'
  },
  date: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: 'Required field'
  },
  rating: {
    type: Number,
    required: 'Required field'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
})

module.exports = mongoose.model('Review', reviewSchema)