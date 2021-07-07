const User = require('../models/user')
const { generateToken } = require('../helpers/token')
const { comparePassword } = require('../helpers/encrypt')

class UserController {

  static showMyTag(req,res, next) {
    let { _id } = req.decoded

    User.findById(_id)
        .then(user => {
          res.status(200).json(user.tags)
        })
        .catch(next)
  }
  
  static addTag(req, res, next) {
    let { _id } = req.decoded

    User.findByIdAndUpdate({_id}, {
        $push: {
          tags: req.body.tag
        }
    }, {new: true})
        .then(user => {
          res.status(200).json(user)
        })
        .catch(next)
  }

  static signup(req, res, next) {
    const { name, email, password } = req.body

    User.create({ name, email, password })
      .then(user => {
        let payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        let token = generateToken(payload)
        
        res.status(201).json({ token, payload })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    const { email, password } = req.body

    User.findOne({ email })
      .then(user => {
        if (user) {
          if (comparePassword(password, user.password)) {
            let payload = {
              _id: user._id,
              name: user.name,
              email: user.email
            }
            let token = generateToken(payload)

            res.status(201).json({ token, payload })
          } else {
            next({status: 400, message: 'Invalid email/password'})
          }
        } else {
          next({status: 400, message: 'Invalid email/password'})
        }
      })
  }
}

module.exports = UserController
