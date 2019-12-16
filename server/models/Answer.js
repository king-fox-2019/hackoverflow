'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  title: String,
  description: String,
  upVotes: Number,
  downVotes: Number,
})

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
