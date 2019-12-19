const { Schema, model, models } = require('mongoose')

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
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
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

questionSchema.post('remove', function(doc) {
  return models.Answer.deleteMany({ question: doc.id })
})

module.exports = model('Question', questionSchema)
