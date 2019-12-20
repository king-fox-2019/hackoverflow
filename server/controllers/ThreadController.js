const Thread = require('../models/Thread')

class ThreadController {
  static getAll(req, res, next) {
    Thread.find()
      .populate('author')
      .populate('replies')
      .sort({updatedAt: 'desc'})
      .then(threads => {
        res.status(200).json(threads)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    Thread.findById(req.params.id)
      .populate('author')
      .populate('replies')
      .then(thread => {
        res.status(200).json(thread)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const {title, content, tags} = req.body
    const author = req.decodedId
    let arrTags = []
    if (tags) {
      arrTags = tags.split(',')
                .map(item => item.trim())
                .filter(item => item !== '');
    }
    Thread.create({
      title,
      content,
      author,
      tags: arrTags
    })
      .then(thread => {
        res.status(201).json(thread)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const id = req.params.id
    Thread.findByIdAndDelete(id)
      .then(thread => {
        res.status(200).json(thread)
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    const id = req.params.id
    Thread.findByIdAndUpdate(id, {$addToSet:{upvote: req.decodedId}})
      .then(_ => {
        return Thread.findByIdAndUpdate(
          {_id:id}, 
          {$pull: {downvote: req.decodedId}}, 
          {new: true}
        )
      })
      .then(thread => {
        res.status(200).json(thread)
      })
      .catch(next)
  }

  static downvote(req, res, next) {
    const id = req.params.id
    Thread.findByIdAndUpdate(id, {$addToSet:{downvote: req.decodedId}})
      .then(_ => {
        return Thread.findByIdAndUpdate(
          {_id:id}, 
          {$pull: {upvote: req.decodedId}}, 
          {new: true}
        )
      })
      .then(thread => {
        res.status(200).json(thread)
      })
      .catch(next)
  }

  static edit(req, res, next) {
    const {title, content} = req.body
    Thread.findByIdAndUpdate(req.params.id, 
    {
      title,
      content
    },
    {
      new: true
    })
      .then(thread => {
        res.status(200).json(thread)
      })
      .catch(next)
  }
}

module.exports = ThreadController