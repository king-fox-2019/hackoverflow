const { User } = require('../models')
const { verify } = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
  authenticate(req, res, next) {
    try {
      const payload = verify(req.headers.access_token, process.env.JWT_SECRET)
      User.findOne({ email: payload.email })
        .then(user => {
          if (user) next()
          else throw createError(401, 'User banned')
        })
        .catch(next)
    } catch (error) {
      next(createError(401, 'Valid access_token required'))
    }
  }
}
