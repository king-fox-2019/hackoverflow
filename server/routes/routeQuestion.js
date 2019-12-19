const router = require('express').Router()
const ControllerQuestion = require('../controllers/question')
const authenticate = require('../middlewares/authenticate')
const authorizeQuestion = require('../middlewares/authorizeQuestion')

router.get('/', ControllerQuestion.fetchAll)
router.get('/search', ControllerQuestion.search)
router.get('/:id', ControllerQuestion.fetchOne)

router.use(authenticate)
router.post('/', ControllerQuestion.add)
router.patch('/:id/upvote', ControllerQuestion.upvote)
router.patch('/:id/downvote', ControllerQuestion.downvote)

router.use('/:id', authorizeQuestion)
router.put('/:id', ControllerQuestion.update)
router.delete('/:id', ControllerQuestion.delete)

module.exports = router