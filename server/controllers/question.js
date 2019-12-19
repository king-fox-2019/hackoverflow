const Question = require('../models/question'),
  Answer = require('../models/answer')

class QuestionController {
  static all(req, res, next) {
    Question.find()
      .then(questions => {
        res.status(200).json(questions)
      })
  }
  static create(req, res, next) {
    let { content } = req.body
    Question.create({ content, author: req.loggedUser.id })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }
  static upvote(req, res, next) {
    let { question } = req.body
    Question.findOne({ _id: question})
      .then(question => {
        if(question.votes.includes(req.loggedUser.id)) {
          next({status: 401, message: "already voted"})
        } else if(question.downvotes.includes(req.loggedUser.id)){
          Question.updateOne({ _id: question}, { $pull: { downvotes: req.loggedUser.id } })
            .then(n => {
              Question.updateOne({ _id: question}, { $push: { votes: req.loggedUser.id } })
              .then(n => {
                res.status(200).json({message: 'success upvote'})
              })
            })
        } else {
          Question.updateOne({ _id: question}, { $push: { votes: req.loggedUser.id } })
            .then(n => {
              res.status(200).json({message: 'success upvote'})
            })
        }
      })
      .catch(next)
  }
  static downvote(req, res, next) {
    let { question } = req.body
    Question.findOne({ _id: question})
      .then(question => {
        if(question.downvotes.includes(req.loggedUser.id)) {
          next({status: 401, message: "already voted"})
        } else if(question.votes.includes(req.loggedUser.id)){
          Question.updateOne({ _id: question}, { $pull: { votes: req.loggedUser.id } })
            .then(n => {
              Question.updateOne({ _id: question}, { $push: { downvotes: req.loggedUser.id } })
              .then(n => {
                res.status(200).json({message: 'success downvote'})
              })
            })
        } else {
          Question.updateOne({ _id: question}, { $push: { downvotes: req.loggedUser.id } })
            .then(n => {
              res.status(200).json({message: 'success downvote'})
            })
        }
      })
      .catch(next)
  }
  static delete(req, res, next) {
    Question.deleteOne({ _id: req.params.id })
      .then(n => {
        Answer.deleteMany({ question: req.params.id })
          .then(n => {
            res.status(200).json(n)
          })
      })
      .catch(next)
  }
}

module.exports = QuestionController