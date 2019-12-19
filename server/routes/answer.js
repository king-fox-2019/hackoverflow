'use strict'

const express = require('express')
const router = express.Router()

const AnswerController = require('../controllers/answerController')
const auth = require('../middlewares/auth');

router.get('/answer/:questionId', AnswerController.getAnswers)
router.use(auth.authenticating)
router.post('/answer/:questionId', AnswerController.create)
router.patch('/:answerId', AnswerController.update)

module.exports = router