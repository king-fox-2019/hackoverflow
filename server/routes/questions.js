const router = require('express').Router();
const QuestionController = require('../controllers/question');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/questionAuthorize');

router.get('/', QuestionController.showAll);
router.get('/:id', QuestionController.showOne);
router.post('/', authenticate, QuestionController.create);
router.put('/:id', authenticate, authorize, QuestionController.update);
router.delete('/:id', authenticate, authorize, QuestionController.destroy);
router.patch('/:id/upvote', authenticate, QuestionController.upvote);
router.patch('/:id/downvote', authenticate, QuestionController.downvote);

module.exports = router;