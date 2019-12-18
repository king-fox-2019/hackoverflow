const router = require('express').Router(),
  AnswerController = require('../controllers/answer'),
  { authenticate } = require('../middlewares/auth')

router.get('/:id', AnswerController.all)
router.use(authenticate)
router.post('/', AnswerController.create)
router.patch('/', AnswerController.upvote)

module.exports = router