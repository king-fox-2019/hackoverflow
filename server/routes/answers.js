const answers = require('express').Router()
const { AnswerController } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

answers.get('/:id', AnswerController.getOneAnswer)

answers.use(authenticate)
answers.patch('/:id/upvote')
answers.patch('/:id/downvote')


answers.patch('/:id')
answers.delete('/:id')

module.exports = answers
