const {Schema, model} = require('mongoose')

const replySchema = new Schema ({
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    require: [true, 'Content cannot be empty']
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isAnswer: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
})

const Reply = model('Reply', replySchema)
module.exports = Reply