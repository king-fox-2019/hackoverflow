const router = require('express').Router();
const UserController = require('../controllers/userController');
const QuestionRouter = require('./questionRouter');
const AnswerRouter = require('./answerRouter');

router.get('/', function(req, res, next) {
  res.send('server alive!');
});
router.use('/questions', QuestionRouter);
router.use('/answers', AnswerRouter);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
