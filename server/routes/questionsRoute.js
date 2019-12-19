const router = require('express').Router();
const QuestionController = require('../controllers/QuestionController');
const auth = require('../middlewares/auth.js');

router.get('/', QuestionController.findAll)
router.get('/user/:userId', QuestionController.findByUser)
router.post('/tag', auth.authentication,  QuestionController.findByTag)
router.get('/:questionId', QuestionController.findOne)
router.post('/', auth.authentication, QuestionController.createQuestion)
router.patch('/upvote/:questionId', auth.authentication, QuestionController.upVote)
router.patch('/downvote/:questionId', auth.authentication, QuestionController.downVote)
router.patch('/edit/:questionId', auth.authentication, auth.authorizationQuestion, QuestionController.updateQuestion)
router.delete('/delete/:questionId', auth.authentication, auth.authorizationQuestion, QuestionController.deleteQuestion)

module.exports = router;