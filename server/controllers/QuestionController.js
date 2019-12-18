const { Question, Answer } = require('../models')
const createError = require('http-errors')

class QuestionController {
  static postQuestion(req, res, next) {
    const { title, description, tags } = req.body
    let allTags
    if (tags)
      allTags =
        typeof tags == 'string' ? tags.split(',').map(t => t.trim()) : tags
    Question.create({ title, description, tags: allTags, author: req.user._id })
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
    let { search } = req.query
    const query = {}

    if (search) {
      const pattern = search
        .split('')
        .map(x => {
          return `(?=.*${x})`
        })
        .join('')
      search = new RegExp(`${pattern}`, 'gi')
      query.$or = [{ title: search }, { tags: search }]
    }

    Question.find(query)
      .populate('author', '-password')
      .then(questions => {
        res.status(200).json({ data: questions })
      })
      .catch(next)
  }

  static getAllUserQuestions(req, res, next) {
    Question.find({ author: req.user._id }, '-author')
      .then(questions => {
        res.status(200).json({ data: questions })
      })
      .catch(next)
  }

  static getOneQuestion(req, res, next) {
    Question.findById(req.params.id)
      .populate('author', '-password')
      .populate({
        path: 'answers',
        select: '-question',
        populate: { path: 'author', select: '-password' }
      })
      .then(question => {
        if (!question) throw createError(404, 'Question not found')
        else res.status(200).json({ data: question })
      })
      .catch(next)
  }

  static editQuestion(req, res, next) {
    const { description, tags } = req.body
    req.question.description = description || req.question.description
    req.question.tags = tags
      ? typeof tags == 'string'
        ? tags.split(',').map(t => t.trim())
        : tags
      : req.question.tags

    req.question
      .save()
      .then(question => {
        res.status(200).json({
          message: 'Question updated',
          data: { ...question._doc, author: undefined }
        })
      })
      .catch(next)
  }

  static upvoteQuestion(req, res, next) {
    let message
    Question.findById(req.params.id)
      .populate('author', '-password')
      .populate({
        path: 'answers',
        select: '-question',
        populate: { path: 'author', select: '-password' }
      })
      .then(question => {
        if (!question) throw createError(404, 'Question not found')
        else {
          if (question.upvotes.includes(req.user._id)) {
            message = 'Your upvote has been removed'
            question.upvotes.pull(req.user._id)
          } else {
            question.upvotes.push(req.user._id)
            message = 'You have upvoted'
          }

          question.downvotes.pull(req.user._id)
          return question.save()
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

  static downvoteQuestion(req, res, next) {
    let message
    Question.findById(req.params.id)
      .populate('author', '-password')
      .populate({
        path: 'answers',
        select: '-question',
        populate: { path: 'author', select: '-password' }
      })
      .then(question => {
        if (!question) throw createError(404, 'Question not found')
        else {
          if (question.downvotes.includes(req.user._id)) {
            message = 'Your downvote has been removed'
            question.downvotes.pull(req.user._id)
          } else {
            question.downvotes.push(req.user._id)
            message = 'You have downvoted'
          }

          question.upvotes.pull(req.user._id)
          return question.save()
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

  static deleteQuestion(req, res, next) {
    req.question
      .remove()
      .then(question => {
        if (!question) throw createError(404, 'Question not found')
        else res.status(200).json({ message: 'Question deleted' })
      })
      .catch(next)
  }
}

module.exports = QuestionController
