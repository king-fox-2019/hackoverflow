const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'description cannot be empty']
  },
  upVotes: {
    type: Array,
    default: []
  },
  downVotes: {
    type: Array,
    default: []
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    }
  ],
  tags: {
    type: Array
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  versionKey: false
})

const Question = model('Question', questionSchema)

module.exports = Question