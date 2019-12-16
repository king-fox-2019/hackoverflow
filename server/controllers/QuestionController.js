const { Question } = require('../models')
const createError = require('http-errors')

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
        if (question) res.status(200).json({ data: question })
        else throw createError(404, 'Question not found')
      })
      .catch(next)
  }

  static editQuestion(req, res, next) {
    req.question.description = req.body.description || req.question.description
    req.question
      .save()
      .then(question => {
        res.status(200).json({
          message: 'Question updated',
          data: question
        })
      })
      .catch(next)
  }

  static upvoteQuestion(req, res, next) {
    Question.findById(req.params.id)
      .populate('User', '-password')
      .then(question => {
        question.upvotes.pull(req.user._id)
        question.downvotes.pull(req.user._id)
        question.upvotes.push(req.user._id)
        return question
          .save()
          .then(question => {
            res.status(200).json({
              message: 'You have upvoted',
              data: question
            })
          })
          .catch(next)
      })
  }

  static downvoteQuestion(req, res, next) {
    Question.findById(req.params.id)
      .populate('User', '-password')
      .then(question => {
        question.upvotes.pull(req.user._id)
        question.downvotes.pull(req.user._id)
        question.downvotes.push(req.user._id)
        return question
          .save()
          .then(question => {
            res.status(200).json({
              message: 'You have downvoted',
              data: question
            })
          })
          .catch(next)
      })
  }

  static deleteQuestion(req, res, next) {
    Question.findByIdAndDelete(req.params.id)
      .then(question => {
        res.status(200).json({ message: 'Question deleted' })
      })
      .catch(next)
  }
}

module.exports = QuestionController
