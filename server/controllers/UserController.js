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

  static editWatchedTags(req, res, next) {
    const { watchedTags } = req.body
    req.user.watchedTags = watchedTags
      ? typeof watchedTags == 'string'
        ? watchedTags
            .split(',')
            .reduce((r, t) => {
              t = t.trim()
              t && r.push(t)
              return r
            }, [])
            .filter((v, i, r) => r.indexOf(v) == i)
        : watchedTags.filter((v, i, r) => r.indexOf(v) == i)
      : req.user.watchedTags

    req.user
      .save()
      .then(user => {
        res.status(200).json({
          message: 'Watched tags updated',
          data: user
        })
      })
      .catch(next)
  }
}
module.exports = UserController
