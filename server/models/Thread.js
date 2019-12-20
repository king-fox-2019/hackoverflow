const {Schema, model} = require('mongoose')

const threadSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'Content cannot be empty']
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: {
    type: Array,
    validate: [ arrayLimit, '{PATH}, exceeds the limit of 5' ]
  }
}, {
  timestamps: true
})

function arrayLimit(value) {
  return value.length <= 5
}

const Thread = model('Thread', threadSchema)
module.exports = Thread