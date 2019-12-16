'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestingSchema = new Schema({
  title: String,
  description: String,
  upVotes: Number,
  downVotes: Number,
})

const Question = mongoose.model('Question', QuestingSchema);
module.exports = Question;
