const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  content: {
    type: String,
    required: [true, 'insert question']
  },
  author: { 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  votes: [{ 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question