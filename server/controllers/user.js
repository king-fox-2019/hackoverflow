const User = require('../models/User')
const Question = require('../models/Question')
const generateToken = require('../helpers/generateToken')
const verifyHash = require('../helpers/verifyHash')

class ControllerUser {
  static register(req, res, next) {
    const { name, email, password } = req.body
    User
      .create({ name, email, password })
      .then(user => {
        const payload = { id: user._id, name, email }
        const access_token = generateToken(payload)

        res.status(201).json({
          message: 'Successfully registered!',
          access_token, user
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body

    if (email.length < 1) throw {
      name: 'BadRequest',
      status: 400,
      message: 'Please input your email address first!'
    }
    if (password.length < 1) throw {
      name: 'BadRequest',
      status: 400,
      message: 'Please input your password first!'
    }

    User
      .findOne({ email })
      .then(user => {
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        if (user.role === 'customer' && !verifyHash(password, user.password)) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        const payload = { id: user._id, name: user.name, email: user.email, role: user.role }
        const access_token = generateToken(payload)

        res.status(200).json({
          message: 'Successfully logged in!',
          access_token, user
        })
      })
      .catch(next)
  }

  static findById(req, res, next) {
    User
      .findById(req.user.id)
      .populate('user.questions', 'user.answers')
      .then(user => {
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Cannot find a user!'
        }
        res.status(200).json({ user })
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    const { googleidtoken } = req.headers
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let payload, name, email, password, picture

    client
      .verifyIdToken({
        idToken: googleidtoken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        name = payload.name
        email = payload.email
        password = process.env.DEFAULT_USER_PASSWORD
        picture = payload.picture

        return User
          .findOne({ email })
      })
      .then(user => {
        if (!user) {
          User
            .create({
              name, email, password, picture
            })
            .then(user => {
              const id = user.id
              const payload = { email, id }
              const access_token = generateToken(payload)

              res.status(201).json({
                message: 'Successfully registered!',
                access_token, user
              })
            })
            .catch(next)
        }
        else {
          payload = {
            email: payload.email,
            id: user.id
          }
          const access_token = generateToken(payload)

          res.status(200).json({
            message: 'Successfully logged in!',
            access_token, user
          })
        }
      })
      .catch(next)
  }

  static async watchTags(req, res, next) {
    try {
      const { tags } = req.body

      if (!tags || tags.length < 1) throw {
        status: 400,
        message: 'Tags cannot be empty! Please input a tag or press `enter` on your current input before adding.'
      }

      let tagsNotExist = []
      let tagsAdded = []

      let user = await User.findById(req.user.id)
      let tagsAlreadyWatched = []

      user.watchedTags.forEach(tag => tagsAlreadyWatched.push(tag))

      let allTags = []
      let cleanedTags = []

      tags.forEach(tag => {
        cleanedTags.push(tag.toLowerCase().trim())
      })

      let questions = await Question.find()

      for (let tag of cleanedTags) {
        for (let i in questions) {
          for (let j in questions[i].tags) {

            if (questions[i].tags[j] === tag && !allTags.includes(tag)) {
              allTags.push(tag)
            }
          }
        }
      }

      for (let tag of cleanedTags) {
        if (!allTags.includes(tag)) { tagsNotExist.push(tag); continue }

        if (!user.watchedTags.includes(tag)) {
          tagsAdded.push(tag)
          await User
            .findByIdAndUpdate(req.user.id, {
              $push: {
                watchedTags: tag
              }
            })
        } else {
          tagsAlreadyWatched.push(tag)
        }
      }

      let message = ''

      if (tagsNotExist.length === 1) message = `Tag with name '${tagsNotExist}' does not exist on this site`
      else if (tagsNotExist.length > 1) message = `Tags with names: '${tagsNotExist.join(', ')}' do not exist on this site.`

      if (tagsNotExist.length > 0) {
        throw {
          status: 400,
          message: message
        }
      } else {
        res.status(200).json()
      }

    } catch (error) {
      next(error)
    }
  }

  static async unwatchATag(req, res, next) {
    try {
      let tag

      if (req.params.tag) {
        tag = req.params.tag.toLowerCase().trim()
      }

      if (!tag) throw {
        status: 400,
        message: 'Please input a tag that you want to unwatch!'
      }

      let user = await User
        .findOne({ _id: req.user.id, watchedTags: tag })

      if (!user) throw {
        status: 400,
        message: 'You are not watching this tag!'
      }

      user = await User
        .findByIdAndUpdate(req.user.id, {
          $pull: {
            watchedTags: tag
          }
        }, { new: true })

      res.status(200).json({
        message: `Successfully unwatched tag '${tag}'!`, user
      })

    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerUser