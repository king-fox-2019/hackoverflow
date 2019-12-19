const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
    static addAnswer(req,res,next){
        // console.log(req.body)
        Answer.create({
            userId : req.loggedUser._id,
            text : req.body.text
        })
        .then( data => {
            return Question.update(
                { _id : req.params.id},
                { $push : { answers : data._id }}
                )
        },{new : true})
        // .populate('userId')
        .then(question =>{
            console.log(question)
            res.status(201).json(question)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
    static deleteAnswer(req,res,next){
        Answer.findOneAndDelete({ _id : req.params.id })
        .then( answer => {
            Question.findOneAndUpdate({
                
            })
            // res.status(200).json( { message : 'answer deleted'})
        }) 
        .catch(next)
    }
    static upVotes(req,res,next){
        Answer.findOne({_id : req.params.id})
        .then(one => {
            if(one) {
                // console.log(one.userId, req.loggedUser._id)
                if(one.userId == req.loggedUser._id){
                    return 'VOTE_SELF'
                }else{
                    return Answer.updateOne(
                        { _id : req.params.id},
                        { $pull: { downVotes : req.loggedUser._id}}
                    )
                }
            }else{
                return 'ANSWER NOT FOUND'
            }
        })
        .then(answer => {
            if(answer === 'ANSWER NOT FOUND' || answer === 'VOTE_SELF'){
                return answer
            } else {
                return Answer.updateOne(
                    {_id: req.params.id},
                    { $addToSet : {upVotes : req.loggedUser._id}}
                )
            }
        })
        .then(answer => {
            if(answer === 'ANSWER NOT FOUND' || answer === 'VOTE_SELF'){
                next({ message : answer, status :400})
            }else{
                res.status(200).json({message : 'voted up'})
            }
        })
    }
    static downVotes(req,res,next){
        Answer.findOne({_id : req.params.id})
        .then(one => {
            if(one) {
                if(one.userId == req.loggedUser._id){
                    return 'VOTE_SELF'
                }else{
                    return Answer.updateOne(
                        { _id : req.params.id},
                        { $pull: { upVotes : req.loggedUser._id}}
                    )
                }
            }else{
                return 'ANSWER NOT FOUND'
            }
        })
        .then(answer => {
            if(answer === 'ANSWER NOT FOUND' || answer === 'VOTE_SELF'){
                return answer
            } else {
                return Answer.updateOne(
                    {_id: req.params.id},
                    { $addToSet : { downVotes : req.loggedUser._id}}
                )
            }
        })
        .then(answer => {
            if(answer === 'ANSWER NOT FOUND' || answer === 'VOTE_SELF'){
                next({ message : answer, status :400})
            }else{
                res.status(200).json({message : 'voted down'})
            }
        })
    }
}

module.exports = AnswerController