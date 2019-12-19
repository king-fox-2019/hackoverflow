const user = require('express').Router()
const {
  UserController,
  QuestionController,
  AnswerController
} = require('../controllers')
const { authenticate } = require('../middlewares/auth')

user.use(authenticate)
user.get('/checksession', UserController.checkSession)
user.patch('/watchedtags', UserController.editWatchedTags)
user.get('/questions', QuestionController.getAllUserQuestions)
user.get('/answers', AnswerController.getAllUserAnswers)

module.exports = user
