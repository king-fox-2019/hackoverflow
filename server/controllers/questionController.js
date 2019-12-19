const Question = require('../models/question')

class QuestionController {
    static create(req,res,next){
        // console.log(req.body)
        Question.create({
            userId : req.loggedUser._id,
            title : req.body.title,
            question : req.body.question,
            tags : req.body.tags,
        })
        .then( data => {
            res.status(201).json({message:'success add question', question : data})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static findAll(req,res,next){
        Question.find() 
        .populate('userId')
        .populate({
            path: 'answers',
            populate: {
                path: ('upVotes'),
                select : ['name','_id']
            }
        })
        .populate({
            path: 'answers',
            populate: {
                path: 'downVotes',
                select : 'name'
            }
        })
        .sort({createdAt : -1})
        .then(data => {
          
            res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req,res,next){
        Question.findOne({
            _id : req.params.id
        })
        .populate('comments')
        .populate('userId')
        .populate({
            path:'answers',
            populate: {
                path: 'comments',
                path: 'userId',
            }
        })
        .then( data => {
            // console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteQuestion(req,res,next){
        Question.deleteOne({
            _id : req.params.id
        })
        .then(() => {
            res.status(200).json({ message : 'question deleted!' })
        })
        .catch(next)
    }
    
    static editQuestion(req,res,next){
        const { title, text, tags } = req.body; 
        Question.updateOne({_id : req.params.id},{
            title,text,tags
        })
        .then( data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static upVotes(req,res,next){
        Question.findOne({_id : req.params.id})
        .then(one => {
            if(one) {
                // console.log(one.userId, req.loggedUser._id)
                if(one.userId == req.loggedUser._id){
                    return 'VOTE_SELF'
                }else{
                    return Question.updateOne(
                        { _id : req.params.id},
                        { $pull: { downVotes : req.loggedUser._id}}
                    )
                }
            }else{
                return 'QUESTION NOT FOUND'
            }
        })
        .then(question => {
            if(question === 'QUESTION NOT FOUND' || question === 'VOTE_SELF'){
                return question
            } else {
                return Question.findOneAndUpdate(
                    {_id: req.params.id},
                    { $addToSet : {upVotes : req.loggedUser._id}},{new : true}
                )
            }
        })
        .then(question => {
            // console.log('masuk kah?')
            if(question === 'QUESTION NOT FOUND' || question === 'VOTE_SELF'){
                next({ message : question, status :400})
            }else{
                res.status(200).json(question)
            }
        })
    }

    static downVotes(req,res,next){
        Question.findOne({_id : req.params.id})
        .then(one => {
            if(one) {
                if(one.userId == req.loggedUser._id){
                    return 'VOTE_SELF'
                }else{
                    return Question.updateOne(
                        { _id : req.params.id},
                        { $pull: { upVotes : req.loggedUser._id}}
                    )
                }
            }else{
                return 'QUESTION NOT FOUND'
            }
        })
        .then(question => {
            if(question === 'QUESTION NOT FOUND' || question === 'VOTE_SELF'){
                return question
            } else {
                return Question.updateOne(
                    {_id: req.params.id},
                    { $addToSet : { downVotes : req.loggedUser._id}}
                )
            }
        })
        .then(question => {
            if(question === 'ANSWER NOT FOUND' || question === 'VOTE_SELF'){
                next({ message : question, status :400})
            }else{
                res.status(200).json({message : 'voted down'})
            }
        })
    }
}

module.exports = QuestionController