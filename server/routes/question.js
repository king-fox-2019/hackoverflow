const router = require('express').Router(),
  QuestionController = require('../controllers/question'),
  { authenticate } = require('../middlewares/auth')

router.get('/', QuestionController.all)
router.use(authenticate)
router.post('/', QuestionController.create)
router.patch('/', QuestionController.upvote)

module.exports = router