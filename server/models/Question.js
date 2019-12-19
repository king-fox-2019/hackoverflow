const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  upvotes: [{
    type: mongoose.ObjectId,
    ref: 'User',
    default: 0
  }],
  downvotes: [{
    type: mongoose.ObjectId,
    ref: 'User',
    default: 0
  }],
  UserId: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema)

module.exports = Question