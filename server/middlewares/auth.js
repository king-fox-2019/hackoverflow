const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user'),
  Question = require('../models/question')

function authenticate(req, res, next) {
  try {
    req.loggedUser = decodeToken(req.headers.token)
    User.findById(req.loggedUser.id)
      .then(user => {
        if(!user){
          throw new Error({status: 401, message: 'Authentication failed'})
        } else {
          next()
        }
      })
  } catch (error) {
    next(error)
  }
}

function authorize(req, res, next) {
  try {
    Question.findById(req.params.id)
      .then(question => {
        if(!question){
          throw new Error({status: 404, message: 'Question not found'})
        } 
        else if( question.author != req.loggedUser.id){
          throw new Error({status: 401, message: 'Authorization failed'})
        }
        else {
          next()
        }
      })
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize }