const { User, Question } = require('../models')
const { verify } = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
  authenticate(req, res, next) {
    try {
      const payload = verify(req.headers.access_token, process.env.JWT_SECRET)
      User.findOne({ email: payload.email })
        .select('-password')
        .then(user => {
          if (user) {
            req.user = user
            next()
          } else throw createError(401, 'User banned')
        })
        .catch(next)
    } catch (error) {
      next(createError(401, 'Valid access_token required'))
    }
  },

  authorizeQuestion(req, res, next) {
    Question.findById(req.params.id)
      .populate('User', '-password')
      .then(question => {
        if (!question) throw createError(404, 'Question not found')
        else if (question.author == req.user.id) {
          req.question = question
          next()
        } else
          throw createError(
            403,
            "You don't have authorization to this question"
          )
      })
      .catch(next)
  }
}
