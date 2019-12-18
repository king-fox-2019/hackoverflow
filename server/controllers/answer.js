const Answer = require('../models/answer')

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
    Answer.create({ content, question , author: req.loggedUser.id})
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(next)
  }
}

module.exports = AnswerController