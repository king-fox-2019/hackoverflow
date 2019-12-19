const router = require('express').Router()
const QuestionC = require('../controllers/question')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', QuestionC.findAll)
router.get('/tag', QuestionC.tag)
router.get('/user', authentication, QuestionC.findUser)
router.post('/', authentication, QuestionC.create)
router.patch('/:id', authentication, QuestionC.updateField)
router.patch('/upvote/:id', authentication, QuestionC.upvote)
router.patch('/downvote/:id', authentication, QuestionC.downvote)
router.delete('/:id', authentication, authorization, QuestionC.delete)

module.exports = router