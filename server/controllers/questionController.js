const Question = require('../models/question')
const mongoose = require('mongoose')

class questionController{
    static create(req,res,next){
        Question.create({
            title:req.body.title,
            description:req.body.description,
            votes:[],
            author:mongoose.Types.ObjectId(req.decoded.id),
            answers:[]
        })
        .then(question=>res.status(201).json(question))
        .catch(next)
    }
    static get(req,res,next){
        if(req.query.userquestion){
            Question.find({author:req.decoded.id})
            .populate('answers')
            .populate('author')
            .then(questions=>res.status(200).json(questions))
            .catch(next)
        }else if(req.query.questionId){
            Question.findOne({_id:req.query.questionId})
            .populate('answers')
            .populate('author')
            .then(questions=>res.status(200).json(questions))
            .catch(next)
        }
        else{
            Question.find()
            .populate('answers')
            .populate('author')
            .then(questions=>res.status(200).json(questions))
            .catch(next)
        }
    }
    static update(req,res,next){
        Question.updateOne({_id:req.body.id},{
            $set:{
                title:req.body.title,
                description:req.body.description
            }
        },
        {runValidators:true})
        .then(result=>res.status(201).json(result))
        .catch(next)
    }
    static delete(req,res,next){
        Question.deleteOne({_id:req.body.id})
        .then(result=>res.status(201).json(result))
        .catch(next)
    }
    static vote(req,res,next){
        Question.findOne({_id:req.params.id})
        .then(question=>{
            let found = false
            let votes = question.votes
            for(let vote of votes){
                if(vote.userId===req.decoded.id){
                    found = true
                    if(vote.vote===req.body.vote){
                        return Question.updateOne({_id:req.params.id},{
                            $pull:{votes:{userId:req.decoded.id}},
                        })
                    }else{
                        return Question.updateOne({'votes.userId':req.decoded.id},{
                            'votes.$.vote':req.body.vote,
                        })
                    }   
                }
            }
            if(found===false){
                return Question.updateOne({_id:req.params.id},{
                    $push:{votes:{userId:req.decoded.id,vote:req.body.vote}},
                })
            }
        })
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)
    }
}

module.exports = questionController