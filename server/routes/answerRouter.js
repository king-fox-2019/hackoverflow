const router = require('express').Router();
const AnswerController = require('../controllers/answerController');
const auth = require('../middlewares/auth')

router.get('/', AnswerController.getAllAnswers);

router.use(auth)
router.post('/', AnswerController.addNewAnswer);
router.post('/vote', AnswerController.pushVote);

module.exports = router;
