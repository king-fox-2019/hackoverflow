const router = require('express').Router()
const authentication = require('../middlewares/authentication').authentication
const question = require('../controllers/questionController')
const Question = require('../models/question')

router.post('/topthree', question.createTopThree)

const authorization = (req,res,next) => {
    Question.findOne({_id : req.params.id})
        .then(question => {
            console.log(question.userId,req.loggedUser._id)
            if(question.userId.toString() == req.loggedUser._id.toString()){
                console.log('bnerhasil?')
                next()
            }else{
                next({
                    stateus :401,
                    messasge : 'you are not authorized'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}

router.use(authentication)
router.put('/:id',authorization,question.editQuestion)
router.delete('/:id',authorization, question.deleteQuestion)
router.get('/myquestion', question.findByUserId)
router.get('/topthree', question.GetTopThree)
router.get('/unanswered', question.unansweredQuestion)
router.get('/popular', question.popular)
router.get('/', question.findAll)
router.post('/', question.create)
router.get('/:id', question.findOne)
router.post('/:filter', question.filteredByTag)
router.post('/:id/upvotes', question.upVotes)
router.post('/:id/downvotes', question.downVotes)



module.exports = router