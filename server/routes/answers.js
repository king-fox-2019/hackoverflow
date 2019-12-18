const router = require('express').Router();
const AnswerController = require('../controllers/answer');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/answerAuthorize');

router.get('/', AnswerController.showAll);
router.get('/:id', AnswerController.showOne);
router.post('/', authenticate, AnswerController.create);
router.put('/:id', authenticate, authorize, AnswerController.update);
router.delete('/:id', authenticate, authorize, AnswerController.destroy);
router.patch('/:id/upvote', authenticate, AnswerController.upvote);
router.patch('/:id/downvote', authenticate, AnswerController.downvote);

module.exports = router;