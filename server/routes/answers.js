const answers = require('express').Router({ mergeParams: true })
const { authenticate } = require('../middlewares/auth')
const { AnswerController } = require('../controllers')

answers.get('/', AnswerController.getAllQuestionAnswers)
answers.get('/:answerId', AnswerController.getOneAnswer)

answers.use(authenticate)
answers.post('/', AnswerController.postAnswer)
answers.patch('/:answerId/upvote')
answers.patch('/:answerId/downvote')

answers.patch('/:answerId')
answers.delete('/:answerId')

module.exports = answers
