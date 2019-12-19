const router = require('express').Router()
const ControllerAnswer = require('../controllers/answer')
const authenticate = require('../middlewares/authenticate')
const authorizeAnswer = require('../middlewares/authorizeAnswer')

router.get('/:questionId', ControllerAnswer.fetchByQuestionId)
router.get('/:id', ControllerAnswer.fetchOne)

router.use(authenticate)
router.post('/:questionId', ControllerAnswer.add)
router.patch('/:id/upvote', ControllerAnswer.upvote)
router.patch('/:id/downvote', ControllerAnswer.downvote)

router.use(authorizeAnswer)
router.put('/:id', authenticate, ControllerAnswer.update)
router.delete('/:id', authenticate, ControllerAnswer.delete)

module.exports = router