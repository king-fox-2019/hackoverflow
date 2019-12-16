const { User } = require('../models')
const { sign } = require('jsonwebtoken')
const { compareSync } = require('bcryptjs')
const createError = require('http-errors')

class UserController {
  static signUp(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
      .then(user => {
        const { _id, email } = user
        const access_token = sign({ _id, email }, process.env.JWT_SECRET)

        res.status(201).json({
          message: 'Sign up success',
          data: {
            user: { ...user._doc, password },
            access_token
          }
        })
      })
      .catch(next)
  }

  static signIn(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        try {
          if (user && compareSync(password, user.password)) {
            const { _id, email } = user
            const access_token = sign({ _id, email }, process.env.JWT_SECRET)

            res.status(200).json({
              message: 'Sign in success',
              data: {
                access_token
              }
            })
          } else throw {}
        } catch (err) {
          throw createError(422, 'Wrong email or password')
        }
      })
      .catch(next)
  }

  static checkSession(req, res, next) {
    res.status(200).json({
      message: 'User authenticated',
      data: req.user
    })
  }
}
module.exports = UserController
