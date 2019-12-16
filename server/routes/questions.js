const questions = require('express').Router()
const { QuestionController } = require('../controllers')
const { authenticate, authorizeQuestion } = require('../middlewares/auth')

questions.get('/', QuestionController.getAllQuestions)
questions.get('/:id', QuestionController.getOneQuestion)

questions.use(authenticate)
questions.post('/', QuestionController.postQuestion)
questions.patch('/:id/upvote', QuestionController.upvoteQuestion)
questions.patch('/:id/downvote', QuestionController.downvoteQuestion)

questions.use('/:id', authorizeQuestion)
questions.patch('/:id', QuestionController.editQuestion)
questions.delete('/:id', QuestionController.deleteQuestion)

module.exports = questions
