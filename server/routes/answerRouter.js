const express = require('express')
const router = express.Router()
const ControllerAnswer = require('../controllers/answerController')
const { authenticating, authorizating } = require('../middlewares/auth')

router.get('/', ControllerAnswer.getall)

router.get('/:id', ControllerAnswer.showQuestionAnswers)

router.post('/:id', authenticating, ControllerAnswer.createAnswer)

router.patch('/:id', authenticating, authorizating, ControllerAnswer.updateAnswer)

router.patch('/upvote/:id', authenticating, ControllerAnswer.increaseVote)

router.patch('/downvote/:id', authenticating, ControllerAnswer.decreaseVote)

module.exports = router