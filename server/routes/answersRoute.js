const router = require('express').Router();
const AnswerController = require('../controllers/AnswerController');
const auth = require('../middlewares/auth.js');

router.post('/', auth.authentication, AnswerController.createAnswer)
router.get('/question/:questionId', AnswerController.findByQuestion)
router.get('/:answerId', AnswerController.findOne)
router.patch('/upvote/:answerId', auth.authentication, AnswerController.upVote)
router.patch('/downvote/:answerId', auth.authentication, AnswerController.downVote)
router.patch('/edit/:answerId', auth.authentication, auth.authorizationAnswer, AnswerController.updateAnswer)
router.delete('/delete/:answerId', auth.authentication, auth.authorizationAnswer, AnswerController.deleteAnswer)

module.exports = router