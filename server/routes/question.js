'use strict';

const controller = require('../controllers/question');
const auth = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();

router.get('/', controller.getAllQuestions);
router.use(auth);
router.get('/my', controller.myQuestions);
router.post('/', controller.askQuestion);
router.patch('/upvotes/:id', controller.upVotes);
router.patch('/downvotes/:id', controller.downVotes);
router.use(authorization);
router.delete('/:id', controller.remove);

module.exports = router;
