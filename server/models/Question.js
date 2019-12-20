'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  upVotes: Number,
  downVotes: Number,
})

QuestingSchema.pre('save', function(next) {
  const question = this
  this.upVotes = 0
  this.downVotes = 0
  next();
});

const Question = mongoose.model('Question', QuestingSchema);
module.exports = Question;
