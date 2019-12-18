const { Schema, model, models } = require('mongoose')

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

answerSchema.post('save', function(doc) {
  return models.Question.findByIdAndUpdate(doc.question, {
    $push: { answers: doc._id }
  })
})

answerSchema.post('remove', function(doc) {
  return models.Question.findByIdAndUpdate(doc.question, {
    $pull: { answers: doc._id }
  })
})

module.exports = model('Answer', answerSchema)
