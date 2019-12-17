'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  title: String,
  description: String,
  upVotes: Number,
  downVotes: Number,
})

AnswerSchema.pre('save', function(next) {
  this.upVotes = 0
  this.downVotes = 0
  next();
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
