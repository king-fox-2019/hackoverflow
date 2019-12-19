const express = require('express')
const router = express.Router()
const ControllerQuestion = require('../controllers/questionController')
const { authenticating, authorizating } = require('../middlewares/auth')


router.get('/', ControllerQuestion.getAllQuestion)

router.post('/', authenticating, ControllerQuestion.create)

router.delete('/:id', authenticating, authorizating, ControllerQuestion.delete)

router.patch('/:id', authenticating, authorizating, ControllerQuestion.updateQuestion)

router.get('/:id', ControllerQuestion.getSingleQuestion)

router.get('/mine', authenticating, ControllerQuestion.getMyQuestion)

router.patch('/upvote/:id', authenticating, ControllerQuestion.increaseVote)

router.patch('/downvote/:id', authenticating, ControllerQuestion.decreaseVote)

module.exports = router