const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  upvote: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  downvote: [
    {
      type: Schema.Types.ObjectId
    }
  ]
})

module.exports = model('Answer', answerSchema)
