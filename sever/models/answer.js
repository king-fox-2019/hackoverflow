const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
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
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  versionKey: false,
  timestamps: true
})

const Answer = model('Answer', answerSchema)

module.exports = Answer