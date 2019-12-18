const { Schema, model } = require('mongoose')

const answerSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Answer content required']
    },
    upvote: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    downvote: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { versionKey: false }
)

module.exports = model('Answer', answerSchema)
