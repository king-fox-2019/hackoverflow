const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user'),
  Question = require('../models/question')

function authenticate(req, res, next) {
  try {
    req.loggedUser = decodeToken(req.headers.token)
    User.findById(req.loggedUser.id)
      .then(user => {
        if(!user){
          next({status: 401, message: 'Authentication failed'})
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
        console.log('ketemu question nya ga?================', question);
        if(!question){
          next({status: 404, message: 'Question not found'})
        } 
        else if( question.author != req.loggedUser.id){
          next({status: 401, message: 'Authorization failed'})
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