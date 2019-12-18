const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
  content: {
    type: String,
    required: [true, 'insert answer']
  },
  author: { 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  question: { 
    type: Schema.Types.ObjectId,
    ref: 'Question' 
  },
  votes: [{ 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }]
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer