const router = require('express').Router();
const AnswerController = require('../controllers/answerController');
const auth = require('../middlewares/auth')

router.get('/', AnswerController.getAllAnswers);

router.use(auth)
router.post('/', AnswerController.addNewAnswer);

module.exports = router;
