const router = require('express').Router()
const QuestionController = require('../controllers/question')
const { authenticate, authorizationQuestion } = require('../middlewares/auth')

// create question
router.post('/', authenticate, QuestionController.createQuestion)

// get question
router.get('/:id', authenticate, QuestionController.getOneQuestion)

// get all question
router.get('/', QuestionController.getAllQuestion)

// edit question
router.put('/:id', authenticate, authorizationQuestion, QuestionController.editQuestion)

// give upvote
router.put('/:id/upvote', authenticate, QuestionController.upvote)

// downvote
router.put('/:id/downvote', authenticate, QuestionController.downvote)

// views
router.put('/:id/views', authenticate, QuestionController.countView)

// delete question
router.delete('/:id', authenticate, authorizationQuestion, QuestionController.deleteQuestion)

module.exports = router