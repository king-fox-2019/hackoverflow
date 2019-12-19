const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    User
      .create({
      username:  req.body.username,
      email: req.body.email,
      password: req.body.password
      })
      .then(user => {
        let token = generateToken({
          id: user._id,
          email: user.email
        })
        res.status(201).json({message: 'register success', token, user})
      })
      .catch(next)
  }
  static login(req, res, next) {
    User
      .findOne({
      email: req.body.email
      })
      .then(user => {
        if (!user) {
          throw {status : 400, message : `you are not registered. please register first`}
        } else {
          let password = req.body.password
          let passwordDB = user.password
          let match = compare(password, passwordDB)
          if (match) {
            let token = generateToken({
              id : user._id,
              email : user.email
            })
            res.status(200).json({
              message : `login success`, 
              token,
              id: user._id,
              email: user.email
             })
          } else {
            throw { status : 400, message : `username/password wrong`}
          }
        }
      })
      .catch(next)
  }
  static findUser(req, res, next) {
    const userId = req.loggedUser._id
    User
      .findById(userId)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
  static addTag(req, res, next) {
    const { tag } = req.body
    console.log("ini nih tag nya : --> ", req.body.tag, "<--- kena ke server gak body tag nya?");
    
    const userId = req.loggedUser._id
    User
      .updateOne({ _id: userId}, { $push : { tags : tag }})
      .then(user => {
        console.log(user, "brp yg kegantiiii");
        
        return User.findById(userId)
      })
      .then(user => {
        console.log(user, "udah ketangkep belom sih tag nya di user haduuuu");
        res.status(200).json(user)
      })
      .catch(next)
  }
  static findTags(req, res, next) {
    const userId = req.loggedUser._id
    User
      .findById(userId)
      .then(user => {
        res.status(200).json(user.tags)
      })
      .catch(next)
  }
  static removeTag(req, res, next) {
    const userId = req.loggedUser._id
    const { tag } = req.body
    User
      .findByIdAndUpdate(userId, { $pull: { tags : tag }}, { omitUndefined: true, new : true})
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }
}

module.exports = UserController
