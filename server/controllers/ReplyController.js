const Reply = require('../models/Reply')
const Thread = require('../models/Thread')

class ReplyController {
  static getAll(req, res, next) {
    Reply.find({author:req.decodedId})
      .populate('thread')
      .then(replies => {
        res.status(200).json(replies)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { content } = req.body
    const author = req.decodedId
    const thread = req.params.threadId
    Reply.create({      
      content,
      author,
      thread
    })
      .then(reply => {
        return Thread
          .findByIdAndUpdate(req.params.threadId, {$addToSet: {replies: reply._id}})
      })
      .then(_ => {
        res.status(201).json({message: 'Success to reply!'})
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const id = req.params.id
    Reply.findByIdAndDelete(id)
      .then(reply => {
        res.status(200).json(reply)
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const id = req.params.id
    Reply.findByIdAndUpdate(id, {$addToSet:{upvote: req.decodedId}})
      .then(_ => {
        return Reply.findByIdAndUpdate(
          {_id:id}, 
          {$pull: {downvote: req.decodedId}}, 
          {new: true}
        )
      })
      .then(reply => {
        res.status(200).json(reply)
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const id = req.params.id
    Reply.findByIdAndUpdate(id, {$addToSet:{downvote: req.decodedId}})
      .then(_ => {
        return Reply.findByIdAndUpdate(
          {_id:id}, 
          {$pull: {upvote: req.decodedId}}, 
          {new: true}
        )
      })
      .then(reply => {
        res.status(200).json(reply)
      })
      .catch(next)
  }

  static edit(req, res, next) {
    const {content} = req.body
    Reply.findByIdAndUpdate(req.params.id, 
    {
      content
    },
    {
      new: true
    })
      .then(reply => {
        res.status(200).json(reply)
      })
      .catch(next)
  }
}

module.exports = ReplyController