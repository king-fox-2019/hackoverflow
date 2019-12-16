const user = require('express').Router()
const { UserController, QuestionController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

user.use(authenticate)
user.get('/checksession', UserController.checkSession)
user.get('/questions', QuestionController.getAllUserQuestions)

module.exports = user
