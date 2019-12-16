const { Question } = require('../models')

class QuestionController {
  static postQuestion(req, res, next) {
    const { title, description } = req.body
    Question.create({ title, description, author: req.user._id })
      .then(question => {
        return question.populate('author', '-password').execPopulate()
      })
      .then(question => {
        res.status(201).json({
          message: 'Question posted',
          data: question
        })
      })
      .catch(next)
  }

  static getAllQuestions(req, res, next) {
    Question.find()
      .populate('author', '-password')
      .then(questions => {
        res.status(200).json({ data: questions })
      })
      .catch(next)
  }

  static getAllUserQuestions(req, res, next) {
    Question.find({ author: req.user._id })
      .populate('author', '-password')
      .then(questions => {
        res.status(200).json({ data: questions })
      })
      .catch(next)
  }

  static getOneQuestion(req, res, next) {
    Question.findById(req.params.id)
      .populate('author', '-password')
      .then(question => {
        res.status(200).json({ data: question })
      })
      .catch(next)
  }
}

module.exports = QuestionController
