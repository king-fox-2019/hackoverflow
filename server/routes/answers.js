const answers = require('express').Router()
const { AnswerController } = require('../controllers')
const { authenticate, authorizeAnswer } = require('../middlewares/auth')

answers.get('/:id', AnswerController.getOneAnswer)

answers.use(authenticate)
answers.patch('/:id/upvote', AnswerController.upvoteAnswer)
answers.patch('/:id/downvote', AnswerController.downvoteAnswer)

answers.use('/:id', authorizeAnswer)
answers.patch('/:id', AnswerController.editAnswer)
answers.delete('/:id')

module.exports = answers
