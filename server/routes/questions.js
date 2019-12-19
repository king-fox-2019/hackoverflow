const questions = require('express').Router()
const { QuestionController, AnswerController } = require('../controllers')
const { authenticate, authorizeQuestion } = require('../middlewares/auth')

questions.get('/', QuestionController.getAllQuestions)
questions.get('/:id', QuestionController.getOneQuestion)
questions.get('/:id/answers', AnswerController.getAllQuestionAnswers)

questions.use(authenticate)
questions.post('/', QuestionController.postQuestion)
questions.post('/:id/answers', AnswerController.postAnswer)
questions.patch('/:id/upvote', QuestionController.upvoteQuestion)
questions.patch('/:id/downvote', QuestionController.downvoteQuestion)

questions.use('/:id', authorizeQuestion)
questions.patch('/:id', QuestionController.editQuestion)
questions.delete('/:id', QuestionController.deleteQuestion)

module.exports = questions
