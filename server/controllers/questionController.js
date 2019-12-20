const { Question, Answer } = require('../models')

class QuestionController {
  static create(req, res, next) {
    const { title, description } = req.body
    const author = req.decoded._id
    Question.create({
      title,
      description,
      author
    })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Question.find({})
      .populate('author')
      .populate('upvotes')
      .populate('downvotes')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Question.findById(req.params.questionId)
      .populate('author')
      .populate('upvotes')
      .populate('downvotes')
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static findMine(req, res, next) {
    Question.find({ author: req.params.userId})
      .populate('author')
      .populate('upvotes')
      .populate('downvotes')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const update = {}
    const { title, description } = req.body
    if (title) update.title = title
    if (description) update.description = description
    Question.findByIdAndUpdate(req.params.questionId, update, { new: true })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    Question.findByIdAndDelete(req.params.questionId)
      .then(() => {
        return Answer.deleteMany({ questionId: req.params.questionId })
      })
      .then((questions) => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static vote(req, res, next) {
    let vote = req.body.vote
    let userId = req.decoded._id
    let questionId = req.params.questionId
    Question.findByIdAndUpdate(questionId, {
      $pull: {
        upvotes: userId,
        downvotes: userId
      }
    }, { new: true })
      .then(question => {
        if (vote === 'up') {
          return Question.findByIdAndUpdate(questionId, {
            $push: {
              upvotes: userId
            }
          }, { new: true }).populate('upvotes', 'downvotes')
        } else {
          return Question.findByIdAndUpdate(questionId, {
            $push: {
              downvotes: userId
            }
          }, { new: true }).populate('upvotes', 'downvotes')
        }      
      })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(next)
  }

}

module.exports = QuestionController