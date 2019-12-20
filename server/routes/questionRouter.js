const router = require('express').Router();
const QuestionController = require('../controllers/questionController');
const auth = require('../middlewares/auth');

router.get('/', QuestionController.getAllQuestions);
router.get('/:questionId', QuestionController.getDetailQuestion);

router.use(auth);
router.post('/', QuestionController.createNewQuestion);
router.post('/vote', QuestionController.pushVote);

module.exports = router;
