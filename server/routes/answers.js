const express = require('express')
const route = express.Router()
const AnswerCon = require('../controllers/AnswerCon')
const {authenticate,authorize2} = require('../middlewares/auth')

route.get('/:id', AnswerCon.findAll)
route.use(authenticate)
route.get('/', AnswerCon.myAnswer)
route.post('/', AnswerCon.add)
route.put('/:id',authorize2 ,AnswerCon.update)
route.patch('/up/:id',AnswerCon.upVote)
route.patch('/down/:id',AnswerCon.downVote)


module.exports = route