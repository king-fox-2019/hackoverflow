const Question = require('../models/question')

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
        } else {
          Question.updateOne({ _id: question}, { $push: { votes: req.loggedUser.id } })
            .then(n => {
              res.status(200).json({message: 'success upvote'})
            })
        }
      })
      .catch(next)
  }
}

module.exports = QuestionController