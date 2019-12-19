const Answer = require('../models/answer');

class AnswerController {

    static findOne(req, res, next) {
        console.log('answer findOne invoked');
        console.log('req.params.answerId => ',req.params.answerId);
    
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(next)
    }

    static findByQuestion(req, res, next) {
        console.log('answer findByQuestion invoked');

        Answer.find({
            questionId: req.params.questionId
        })
            .populate('userId')
            .then(found => {
                console.log('found => ',found);

                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(next)
    }

    static createAnswer(req, res, next) {
        console.log('createAnswer invoked');
        console.log('req.body => ',req.body);

        Answer.create({
                ...req.body,
                userId: req.authenticatedUser.id,
                upVotes: [],
                downVotes: [],
            })
            .then(created => {
                console.log('created => ',created);
                res.status(201).json(created)
            })
            .catch(next)
    }

    static deleteAnswer(req, res, next) {
        console.log('deleteAnswer invoked')
            
        Answer.findByIdAndRemove({
            _id: req.params.answerId
        })
            .then(found => {
                console.log('found => ', found);

                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(next)
    }

    static updateAnswer(req, res, next) {
        console.log('updateAnswer invoked')

        Answer.findByIdAndUpdate({
            _id: req.params.answerId
        }, {...req.body}, {new : true})
            .then(found => {
                console.log('found => ',found);

                if (found) res.status(200).json(found)
                else res.status(400).json({
                    message: 'No such answer'
                })
            })
            .catch(next)
    }

    static upVote(req, res, next) {
        console.log('upVote invoked');

        Answer.findById(req.params.answerId)
            .then(answer => {
                let haveDownVoted = false
                
                answer.downVotes.forEach((dv, i) => {
                    if (dv == req.authenticatedUser.id) {
                        haveDownVoted = true
                    }
                })
                answer.upVotes.forEach(uv => {
                    if (uv == req.authenticatedUser.id) {
                        throw new Error ('You have already upvoted!')
                    }
                })

                if (haveDownVoted) {
                    answer.downVotes = answer.downVotes.filter(x => {
                        return x.toString() != req.authenticatedUser.id
                    })
                } else if (haveDownVoted == false) {
                    console.log('msk3');
                    answer.upVotes.push(req.authenticatedUser.id)
                }

                return Answer.findByIdAndUpdate({
                        _id: req.params.answerId
                    }, {
                        $set: {
                            downVotes: answer.downVotes,
                            upVotes: answer.upVotes
                        }
                    }, {
                        new: true
                    })
                    .then((updated) => {
                        console.log('updated => ',updated);
                        res.status(200).json(updated)
                    })
                    .catch(next)
            })
    }

    static downVote(req, res, next) {

    Answer.findById(req.params.answerId)
        .then(answer => {

            let haveUpVoted = false
            answer.upVotes.forEach((uv, i) => {
                if (uv == req.authenticatedUser.id) {
                    haveUpVoted = true
                }
            })

            answer.downVotes.forEach(dv => {
                if (dv == req.authenticatedUser.id) {
                    throw new Error ('You have already downvoted!')
                }
            })

            if (haveUpVoted) {
                answer.upVotes = answer.upVotes.filter(x => {
                    return x.toString() != req.authenticatedUser.id
                })
            } else if (haveUpVoted == false) {
                console.log('mskn3');
                answer.downVotes.push(req.authenticatedUser.id)
            }

            return Answer.findByIdAndUpdate({ _id: req.params.answerId }, {
                    $set: {
                        upVotes: answer.upVotes,
                        downVotes: answer.downVotes
                    }
                }, {
                    new: true
                })
                    .then((updated) => {
                        console.log('updated => ',updated);
                        res.status(200).json(updated)
                    })
                    .catch(next)
        })
    }
}

module.exports = AnswerController