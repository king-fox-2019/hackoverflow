const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title,
  description,
  upvotes,
  downvotes
})

module.exports = model('Question', questionSchema)
