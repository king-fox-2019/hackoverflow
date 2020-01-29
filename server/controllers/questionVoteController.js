'use strict'

const QuestionVote = require('../models/questionVote')

class questionVoteController {

    static voteUp(req, res, next) {
        // console.log(object);
        const voteData = {
            question: req.params.questionId,
            voter: req.userData.userId,
            vote: 1
        }
        QuestionVote.create(voteData)
            .then(vote => {
                res.status(201).json({
                    code: 201,
                    status: 'success',
                    vote
                })
            })
            .catch(next)
    }

    static voteDown(req, res, next) {
        const voteData = {
            question: req.params.questionId,
            voter: req.userData.userId,
            vote: -1
        }
        QuestionVote.create(voteData)
            .then(vote => {
                res.status(201).json({
                    code: 201,
                    status: 'success',
                    vote
                })
            })
            .catch(next)
    }

    static totalVoteUp(req, res, next) {
        
    }

    static totalVoteDown(req, res, next) {
        
    }

}

module.exports = questionVoteController