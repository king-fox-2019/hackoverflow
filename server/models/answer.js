const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  votes: [
    {
      voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      value: {
        type: Number,
      },
    },
  ],
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
