'use strict'

const router = require('express').Router()
const QuestionsController = require('../controllers/questionsController')
const { authorization } = require('../middlewares/auth')

router.post('/', QuestionsController.create)
router.get('/', QuestionsController.readAll)
router.get('/:id', QuestionsController.readOne)
router.get('/filter/:val', QuestionsController.filter)
router.patch('/vote/:id', QuestionsController.vote)
router.patch('/:id', authorization, QuestionsController.update)
router.delete('/:id', authorization, QuestionsController.remove)

module.exports = router;