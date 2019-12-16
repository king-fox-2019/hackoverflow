const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
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
})

module.exports = model('Question', questionSchema)
