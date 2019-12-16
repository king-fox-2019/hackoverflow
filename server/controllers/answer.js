const Answer = require('../model/answer')

class AnswerController {

    static createAnswer(req,res,next){
        const { desc } = req.body
        Answer.create({
            desc,
            author: req.decoded.id,
            questionId: req.params.id
        })
        .then(answer => {
            res.status(201).json(answer)
        })
        .catch(next)
    }

    static getAllAnswer(req,res,next){
        Answer.find({
            questionId: req.params.id
        })
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static getOneAnswer(req,res,next){
        Answer.findOne({
            _id: req.params.id
        })
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static upvote(req,res,next){
        Answer.findOne({
            _id: req.params.id
        })
        .then(answer => {
            let upvote = answer.upvote
            if(upvote.include(req.decoded.id)){
                return Answer.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $pull : {
                        upvote: req.decoded.id
                    }
                },
                {
                    new: true
                })   
            }else{
                return Answer.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push: {
                        upvote: req.decoded.id
                    }
                },
                {
                    new: true
                })
            }
        })
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static downvote(req,res,next){
        Answer.findOne({
            _id: req.params.id
        })
        .then(answer => {
            let downvote = answer.downvote
            if(downvote.include(req.decoded.id)){
                return Answer.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $pull: {
                        downvote: req.decoded.id
                    }
                },
                {
                    new: true
                })
            }else{
                return Answer.findOneAndUpdate({
                    _id: req.params.id
                },
                {
                    $push:{
                        downvote: req.decoded.id
                    }
                },
                {
                    new: true
                })
            }
        })
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static editAnswer(req,res,next){
        const { desc } = req.body
        Answer.findOneAndUpdate({
            _id: req.params.id
        },
        {
            desc
        },
        {
            new: true
        })
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static deleteAnswer(req,res,next){
        Answer.deleteOne({
            _id: req.params.id
        })
        .then(answer=>{
            res.status(200).json(answer)
        })
        .catch(next)
    }
}

module.exports = AnswerController