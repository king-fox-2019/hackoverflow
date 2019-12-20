'use strict';

const router = require('express').Router();
const controller = require('../controllers/answer');

router.post('/:questionId', controller.addComment);
router.get('/:questionId', controller.getComment);
router.patch('/up/:id', controller.upVotes);
router.patch('/down/:id', controller.downVotes);

module.exports = router
