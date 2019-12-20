const express = require('express')
const router = express.Router()
const QuestionController = require('../controllers/questionController.js')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/', QuestionController.showAll)
router.get('/:id', QuestionController.showOne)
router.use(authenticate)
router.post('/:id', QuestionController.vote)
router.post('/', QuestionController.create)
router.use('/:id', authorize)
router.patch('/:id', QuestionController.edit)
router.delete('/:id', QuestionController.delete)

module.exports = router