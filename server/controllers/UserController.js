const User = require('../models/User')
const {signToken} = require('../helpers/jwt')
const {compare} = require('../helpers/bcrypt')

class UserCtrl {

  static register (req, res, next) {
    const { name, email, password } = req.body
    User.create({
      name,
      email,
      password
    })
      .then(user => {
        const token = signToken({id: user._id})
        res.status(201).json({
          name: user.name, 
          token: token
        })
      })
      .catch(next)
  }

  static login(req, res, next){
    const { email, password } = req.body
    User.findOne({email})
      .then(user => {
        if (user) {
          if(compare(password, user.password)) {
            const token = signToken({id: user._id})
            res.status(201).json({
              name: user.name,
              token: token
            })
          } else {
            next({
              status: 400,
              message: 'Your email or password is invalid!'
            })
          }
        } else {
          next({status: 400, message: 'User not found!'})
        }
      })
      .catch(next) 
  }

}

module.exports = UserCtrl