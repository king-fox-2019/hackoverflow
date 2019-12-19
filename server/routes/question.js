'use strict'

const express = require('express')
const router = express.Router()

const QuestionController = require('../controllers/questionController')

const auth = require('../middlewares/auth');

router.get('/', QuestionController.getAll)
router.use(auth.authenticating)
router.post('/', QuestionController.create)
router.patch('/:id', QuestionController.update)
router.get('/:id', QuestionController.detail)

module.exports = router