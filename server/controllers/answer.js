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
        } else {
          Answer.updateOne({ _id: answer}, { $push: { votes: req.loggedUser.id } })
            .then(n => {
              res.status(200).json({message: 'success upvote'})
            })
        }
      })
      .catch(next)
  }
}

module.exports = AnswerController