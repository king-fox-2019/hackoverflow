const User = require('../models/User.js')
const { compare } = require('../helpers/bcrypt.js')
const { sign } = require('../helpers/token.js')

class UserController{
  static login(req, res, next){
    let { username, email, password } = req.body
    User
      .findOne({
        $or: [
          {username}, 
          {email}
        ]
      })
      .then((userData) => {
        if (userData) {
          if (compare(password, userData.password)){
            let token = sign({id: userData._id})
            let response = {
              username: userData.username,
              token
            }
            res.status(200).json(response)
          }
          else {
            next({code: 400, message: 'Username or password wrong'})
          }
        }
        else {
          next({code: 400, message: 'Username or password wrong'})
        }
      })
      .catch(next)
  }
  static register(req, res, next){
    let { username, email, password } = req.body
    let createObj = {username, email, password}
    User
      .create(createObj)
      .then((createdUser) => {
        res.status(201).json(createdUser)
      })
      .catch(next)
  }
}

module.exports = UserController