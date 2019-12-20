const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const { authenticate, authorizationAnswer } = require('../middlewares/auth')

// create answer
router.post('/question/:id', authenticate, AnswerController.createAnswer)

// get all answer of question
router.get('/question/:id', authenticate, AnswerController.getAllAnswer)

// get one answer
router.get('/:id', authenticate, AnswerController.getOneAnswer)

// upvote
router.put('/:id/upvote', authenticate, AnswerController.upvote)

// downvote
router.put('/:id/downvote', authenticate, AnswerController.downvote)

// edit answer
router.put('/:id', authenticate, authorizationAnswer , AnswerController.editAnswer)

// delete answer
router.delete('/:id', authenticate, authorizationAnswer, AnswerController.deleteAnswer)

module.exports = router