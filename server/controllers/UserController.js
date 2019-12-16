const { User } = require('../models')
const { sign } = require('jsonwebtoken')
const { compareSync } = require('bcryptjs')
const createError = require('http-errors')

class UserController {
  static signUp(req, res, next) {
    const { email, password } = req.body
    User.create({ email, password }).then(user => {
      const { _id, email } = user
      const access_token = sign({ _id, email })

      res.status(201).json({
        message: 'Sign up success',
        data: {
          user,
          access_token
        }
      })
    })
  }

  static signIn(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        try {
          if (user && compareSync(password, user.password)) {
            const { _id, email } = user
            const access_token = sign({ _id, email })

            res.status(200).json({
              message: 'Sign in success',
              data: {
                access_token
              }
            })
          } else throw createError(422, 'Wrong email or password')
        } catch (err) {
          throw err
        }
      })
      .catch(next)
  }
}
module.exports = UserController
