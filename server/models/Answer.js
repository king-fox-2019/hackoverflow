const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
  title,
  description,
  upvote,
  downvote
})

module.exports = model('Answer', answerSchema)
