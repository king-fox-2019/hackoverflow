const router = require('express').Router(),
  QuestionController = require('../controllers/question'),
  { authenticate, authorize } = require('../middlewares/auth')

router.get('/', QuestionController.all)
router.use(authenticate)
router.post('/', QuestionController.create)
router.patch('/', QuestionController.upvote)
router.patch('/downvote', QuestionController.downvote)
router.delete('/:id', authorize, QuestionController.delete)

module.exports = router