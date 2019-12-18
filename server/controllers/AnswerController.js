const { Answer, Question } = require('../models')
const createError = require('http-errors')

class Answerontroller {
  static postAnswer(req, res, next) {
    Question.findById(req.params.id)
      .then(question => {
        if (!question) throw createError(404, 'Question not found')
        else
          return Answer.create({
            author: req.user._id,
            question: req.params.id,
            content: req.body.content
          })
      })
      .then(answer => {
        return answer
          .populate('author', '-password')
          .populate({
            path: 'question',
            populate: { path: 'author', select: '-password' }
          })
          .execPopulate()
      })
      .then(answer => {
        res.status(201).json({ message: 'Answer posted', data: answer })
      })
      .catch(next)
  }

  static getAllQuestionAnswers(req, res, next) {
    Answer.find({ question: req.params.id }, '-question')
      .populate('author', '-password')
      .then(answers => {
        res.status(200).json({ data: answers })
      })
      .catch(next)
  }

  static getAllUserAnswers(req, res, next) {
    Answer.find({ author: req.user._id }, '-author')
      .populate({
        path: 'question',
        populate: { path: 'author', select: '-password' }
      })
      .then(answers => {
        res.status(200).json({ data: answers })
      })
      .catch(next)
  }

  static getOneAnswer(req, res, next) {
    Answer.findById(req.params.id)
      .populate('author', '-password')
      .populate({
        path: 'question',
        populate: { path: 'author', select: '-password' }
      })
      .then(answer => {
        if (!answer) throw createError(404, 'Answer not found')
        else res.status(200).json({ data: answer })
      })
      .catch(next)
  }

  static editAnswer(req, res, next) {
    req.answer.content = req.body.content || req.answer.content
    req.answer
      .save()
      .then(answer => {
        return answer
          .populate({
            path: 'question',
            populate: { path: 'author', select: '-password' }
          })
          .execPopulate()
      })
      .then(answer => {
        res.status(200).json({
          message: 'Answer updated',
          data: { ...answer._doc, author: undefined }
        })
      })
      .catch(next)
  }

  static upvoteAnswer(req, res, next) {
    let message
    Answer.findById(req.params.id)
      .populate('author', '-password')
      .populate({
        path: 'question',
        populate: { path: 'author', select: '-password' }
      })
      .then(answer => {
        if (!answer) throw createError(404, 'Answer not found')
        else {
          if (answer.upvotes.includes(req.user._id)) {
            message = 'Your upvote has been removed'
            answer.upvotes.pull(req.user._id)
          } else {
            answer.upvotes.push(req.user._id)
            message = 'You have upvoted'
          }

          answer.downvotes.pull(req.user._id)
          return answer.save()
        }
      })
      .then(question => {
        res.status(200).json({
          message,
          data: question
        })
      })
      .catch(next)
  }

  static downvoteAnswer(req, res, next) {
    let message
    Answer.findById(req.params.id)
      .populate('author', '-password')
      .populate({
        path: 'question',
        populate: { path: 'author', select: '-password' }
      })
      .then(answer => {
        if (!answer) throw createError(404, 'Answer not found')
        else {
          if (answer.downvotes.includes(req.user._id)) {
            message = 'Your downvote has been removed'
            answer.downvotes.pull(req.user._id)
          } else {
            answer.downvotes.push(req.user._id)
            message = 'You have downvoted'
          }

          answer.upvotes.pull(req.user._id)
          return answer.save()
        }
      })
      .then(question => {
        res.status(200).json({
          message,
          data: question
        })
      })
      .catch(next)
  }

  static deleteAnswer(req, res, next) {
    req.answer
      .remove()
      .then(answer => {
        if (!answer) throw createError(404, 'Answer not found')
        else res.status(200).json({ message: 'Answer deleted' })
      })
      .catch(next)
  }
}

module.exports = Answerontroller
