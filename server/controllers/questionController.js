const Question = require('../models/question')
const TopThisWeek = require('../models/topThisWeek')
const Answer = require('../models/answer')

class QuestionController {

    static findByUserId(req,res,next){
        Question.find({
            userId : req.loggedUser._id
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    
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
        // console.log('halo')
        Question.deleteOne({
            _id : req.params.id
        })
        .then(question => {
            return Answer.deleteMany({
                questionId : question._id
            })
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

    static filteredByTag(req,res,next){
        let searchQuery = {}
        if(req.params.filter) {
        searchQuery = {
            'tags': new RegExp(`${req.params.filter}`, 'gi')
        }
        } else {
        searchQuery = {}
        }
        Question.find(searchQuery)
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
        .then(questions => {
            // console.log(questions)
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static unansweredQuestion (req,res,next){
        
        Question.find( {answers: {$size :0}})
        .sort({createdAt : -1})
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
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                next(err)
            })
    }

    static popular (req,res,next){
        
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
        .then(questions => {
            for(let i = 0 ; i < questions.length; i++){
                for(let j = 0 ; j < questions.length-1; j++){
                        if((questions[j].upVotes.length + questions[j].downVotes.length) < (questions[j+1].upVotes.length + questions[j+1].downVotes.length)){
                            let temp = questions[j]
                            questions[j] = questions[j+1]
                            questions[j+1] = temp
                        }
                    }
                }
                res.status(200).json(questions)
            })
            .catch(err => {
                next(err)
            })
    }

    static createTopThree(req,res,next){
        Question.find()
        .populate('userId')
        .populate({
            path: 'answers',
            populate: {
                path: ('upVotes'),
                select : ['name','_id']
            }
        })
        .then(questions => {
            // console.log(questions)
            let TopThree = []
            for(let i = 0 ; i < questions.length; i++){
                for(let j = 0 ; j < questions.length-1; j++){
                        if(questions[j].upVotes.length < questions[j+1].upVotes.length){
                            let temp = questions[j].upVotes
                            questions[j].upVotes = questions[j+1].upVotes
                            questions[j+1].upVotes = temp
                        }
                    }
                }
                
            
            TopThree.push(questions[0]._id,questions[1]._id,questions[2]._id)
               return TopThisWeek.create({
                    questionId : TopThree
               })
            })
            .then(topThisWeek => {
                console.log('sukses')
                res.status(201).json(topThisWeek)
            })
            .catch(err => {
                next(err)
            })
    }
    static GetTopThree(req,res,next){
        TopThisWeek.find()
        // .populate('questionId')
        .populate({
            path: 'questionId',
            populate: {
                path: ('userId'),
                select : ['name','_id']
            }
        })
            .then(data => {
                res.status(200).json(data[0])
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = QuestionController