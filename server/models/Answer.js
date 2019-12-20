const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  description: {
    type: String,
    required: true
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
  },
  QuestionId: {
    type: mongoose.ObjectId,
    ref: 'Question',
    required: true
  }
}, {
  timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer