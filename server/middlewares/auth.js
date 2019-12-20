const { verify } = require('../helpers/token')
const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

function authenticate(req, res, next){
  try {
    let token = verify(req.headers.access_token);
    User.findById(token.id)
      .select('-password')
      .then((user) => {
        req.user = user
        next()
      })
      .catch((err) => {
        next(err)
      })
  } 
  catch(err) {
    next(err)
  }
}

function authorize(req, res, next){
  let modelName = ''
  if (req.baseUrl.includes('questions')){
    modelName = Question
  }
  else if (req.baseUrl.includes('answers')){
    modelName = Answer
  }
  if (modelName){
    modelName
      .findById(req.params.id)
      .then((modelData) => {
        if (modelData.UserId == req.user.id){
          next()
        }
        else {
          next('Not found')
        }
      })
      .catch(next)
  }
  else {
    next('Wrong URL')
  }
}

module.exports = { authenticate, authorize }