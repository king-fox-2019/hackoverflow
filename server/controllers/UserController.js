const User = require('../models/user')
const comparePassword = require('../helpers/passwordEncryptor').comparePassword
const generateToken = require('../helpers/tokenMaker').generateToken

class UserController {
  static register(req, res, next) {
    let objUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }
    User.create(objUser)
      .then(result => {
        let payload = {
          id: result._id,
          username: result.username,
          email: result.email
        }
        let token = generateToken(payload)
        let data = {
          token, username: payload.username
        }
        res.status(201).json({ data })
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne(
      {
        email: req.body.email
      }
    )
      .then(user => {
        if (user && comparePassword(req.body.password, user.password)) {
          let payload = {
            id: user._id,
            email: user.email
          }
          let token = generateToken(payload)
          let data = {
            token, username: user.username
          }
          res.status(200).json({ data })
        } else if (!user) {
          next({ status: 400, message: "wrong email or you are not registered yet" })
        } else {
          next({ status: 400, message: "wrong password" })
        }
      })
      .catch(next)
  }

  static updateTag(req, res, next) {
    let tags = req.body.tags
    let id = req.loggedUser.id
    User.findById(id)
      .then(user => {
        let newTags = []
        for (let i = 0; i < tags.length; i++) {
          if(user.tags.indexOf(tags[i].toLowerCase()) == -1) {
            newTags.push(tags[i])
          }
        }
        return User.updateOne({ _id: id }, { $push: { tags: newTags } })
      })
      .then(_ => {
        res.status(200).json({ message: 'tags updated' })
      })
      .catch(next)
  }

  static deleteTag(req, res, next) {
    let tags = req.body.tags
    let id = req.loggedUser.id
    User.updateOne({ _id: id }, { $pull: { tags: { $in: tags } } })
      .then(_ => {
        res.status(200).json({ message: 'tags updated' })
      })
      .catch(next)
  }

  static getUserData(req, res, next) {
    let id = req.loggedUser.id
    User.findById({ _id: id })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = UserController