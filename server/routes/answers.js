'use strict'

const router = require('express').Router()
const AnswersController = require('../controllers/answersController')
const { authorization } = require('../middlewares/auth')

router.post('/', AnswersController.create)
router.get('/:id', AnswersController.readAll)
router.get('/answer/:id', AnswersController.readOne)
router.patch('/vote/:id', AnswersController.vote)
router.patch('/:id', authorization, AnswersController.update)
router.delete('/:id', authorization, AnswersController.remove)

module.exports = router;