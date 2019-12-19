const router = require('express').Router();
const AnswerController = require('../controllers/answerController');

router.get('/', AnswerController.getAllAnswers);

module.exports = router;
