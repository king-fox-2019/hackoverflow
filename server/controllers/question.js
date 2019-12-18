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
}

module.exports = QuestionController