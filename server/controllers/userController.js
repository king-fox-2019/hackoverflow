
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {comparePassword} = require('../helpers/bcrypt')

class UserController {

   static readAll(req, res, next) {

      User
      .find()
      .then(users => {
         res.status(200).json({users})
      })
      .catch(next)
   }

   static register(req, res, next) {

      User
      .create(req.body)
      .then(user => {
         const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
         res.status(201).json({token})
      })
      .catch(next)
   }

   static login(req, res, next) {

      User
      .findOne({email: req.body.email})
      .then(user => {
         console.log('ini user', user)
         console.log('ini compare password', comparePassword(req.body.password, user.password))
         if(!user || !comparePassword(req.body.password, user.password)) throw {
            errorCode: 400,
            message: 'Email and password combination is wrong'
         }
         else {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
            res.status(200).json({token})
         }
      })
      .catch(next)
   }
}

module.exports = UserController