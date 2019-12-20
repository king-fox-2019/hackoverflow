const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/answerController.js')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/:id', AnswerController.getAnswer)
router.use(authenticate)
router.post('/:id', AnswerController.vote)
router.post('/', AnswerController.create)
router.use('/:id', authorize)
router.patch('/:id', AnswerController.edit)
router.delete('/:id', AnswerController.delete)

module.exports = router