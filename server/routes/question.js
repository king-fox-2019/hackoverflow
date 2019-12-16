'use strict';

const controller = require('../controllers/question');
const auth = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();

router.get('/', controller.getAllQuestions);
router.use(auth);
router.post('/', controller.askQuestion);
router.put('/', controller.updateQuestion);
router.delete('/:id', controller.remove);

module.exports = router;
