const { Schema, model } = require('mongoose')

const questionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Question title required']
    },
    description: {
      type: String,
      required: [true, 'Question description required']
    },
    tags: [
      {
        type: String
      }
    ],
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { versionKey: false }
)

module.exports = model('Question', questionSchema)
