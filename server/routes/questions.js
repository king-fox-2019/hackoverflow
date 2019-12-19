const express = require('express')
const route = express.Router()
const QuestionCon = require('../controllers/QuestionCon')
const {authenticate,authorize} = require('../middlewares/auth')

route.get('/', QuestionCon.findAll)
route.get('/myQuestion', authenticate ,QuestionCon.myQuestion)
route.get('/:id',QuestionCon.findOne)
route.use(authenticate)
route.post('/', QuestionCon.add)
route.put('/:id',authorize ,QuestionCon.update)
route.patch('/up/:id',QuestionCon.upVote)
route.patch('/down/:id',QuestionCon.downVote)
route.delete('/:id',QuestionCon.destroy)





module.exports = route