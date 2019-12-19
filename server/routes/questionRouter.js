const router = require('express').Router()
const QuestionController = require('../controllers/questionController')

router.get('/', QuestionController.getAllQuestions)

module.exports = router
