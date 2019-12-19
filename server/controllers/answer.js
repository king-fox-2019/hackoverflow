const Answer = require('../models/answer'),
  Question = require('../models/question')

class AnswerController {
  static all(req, res, next) {
    let question = req.params.id
    Answer.find({question})
      .then(answers => {
        res.status(200).json(answers)
      })
  }
  static create(req, res, next) {
    let { content, question } = req.body
    let answerContainer = null
    Answer.create({ content, question , author: req.loggedUser.id})
      .then(answer => {
        answerContainer = answer
        return Question.updateOne({ _id: question}, { $push: { answers: answer._id } })
      })
      .then(n => {
        res.status(201).json(answerContainer)
      })
      .catch(next)
  }
  static upvote(req, res, next) {
    let { answer } = req.body
    Answer.findOne({ _id: answer})
      .then(answer => {
        if(answer.votes.includes(req.loggedUser.id)) {
          next({status: 401, message: "already voted"})
        } else if (answer.downvotes.includes(req.loggedUser.id)){
          Answer.updateOne({ _id: answer}, { $pull: { downvotes: req.loggedUser.id } })
            .then(n => {
              Answer.updateOne({ _id: answer}, { $push: { votes: req.loggedUser.id } })
              .then(n => {
                res.status(200).json({message: 'success upvote'})
              })
            })
        } else {
          Answer.updateOne({ _id: answer}, { $push: { votes: req.loggedUser.id } })
            .then(n => {
              res.status(200).json({message: 'success upvote'})
            })
        }
      })
      .catch(next)
  }
  static downvote(req, res, next) {
    let { answer } = req.body
    Answer.findOne({ _id: answer})
      .then(answer => {
        if(answer.downvotes.includes(req.loggedUser.id)) {
          next({status: 401, message: "already voted"})
        } else if (answer.votes.includes(req.loggedUser.id)){
          Answer.updateOne({ _id: answer}, { $pull: { votes: req.loggedUser.id } })
            .then(n => {
              Answer.updateOne({ _id: answer}, { $push: { downvotes: req.loggedUser.id } })
              .then(n => {
                res.status(200).json({message: 'success downvote'})
              })
            })
        } else {
          Answer.updateOne({ _id: answer}, { $push: { downvotes: req.loggedUser.id } })
            .then(n => {
              res.status(200).json({message: 'success downvote'})
            })
        }
      })
      .catch(next)
  }
}

module.exports = AnswerController