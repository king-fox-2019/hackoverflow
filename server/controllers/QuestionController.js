const Question = require('../models/question')

class QuestionController {
    static findOne(req, res, next) {
        console.log('QuestionController findOne');
        
        console.log('req.params.questionId => ',req.params.questionId);
        Question.findById(req.params.questionId)
        .populate('userId')
            .then(found => {
                console.log('found => ',found);
                if (found) {
                    res.status(200).json(found);
                } else {
                    res.status(404).json({ message : 'No such question' })
                }
            })
            .catch(next)
    }

    static findByTag(req, res, next) {
        console.log('QuestionController findByTag');
        console.log('req.body.tag => ',req.body.tag);

        Question.find({ tags: { "$in" : [req.body.tag]} })
        .populate('userId')
            .then((data) => {
                console.log('data => ',data);
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findByUser(req, res, next) {
        console.log('QuestionController findByUser')
        console.log('req.body => ',req.body);
        console.log('req.params.userId => ',req.params.userId);
        
        Question.find({userId : req.params.userId})
        .populate('userId')
            .then(found => {
                console.log('found => ',found);
                if (found) {
                     res.status(200).json(found)
                } else {
                    res.status(404).json({message : 'No such question on that user'})
                }
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        
        Question.find({})
        .populate('userId')
            .then(found => {
                console.log('found => ',found);
                if (found) {
                    res.status(200).json(found)
                } else {
                    res.status(404).json({message : 'No such question'})
                }
            })
            .catch(next)
    }
    
    static createQuestion(req, res, next) {
        console.log('createQuestion');
        console.log('req.body => ',req.body);
        
        Question.create({
            ...req.body,
            tags : req.body.tags,
            userId : req.authenticatedUser.id,
            upVotes : [],
            downVotes : []
        })
            .then(created => {
                console.log('created => ',created);
                res.status(201).json(created)
            })
            .catch(next)
    }

    static deleteQuestion(req, res, next) {

        Question.findByIdAndRemove({_id : req.params.questionId})
            .then(found => {
                console.log('found => ',found);
                if (found) res.status(200).json(found)
                else res.status(404).json({message : 'No such question'})
            })
            .catch(next)
    }

    static updateQuestion(req, res, next) {
        console.log('updateQuestion');
        console.log('req.body => ',req.body);

        Question.findByIdAndUpdate({_id : req.params.questionId}, {...req.body})
            .then(found => {
                console.log('found => ',found);
                if (found) {
                    res.status(200).json(found)
                } else {
                    res.status(400).json({message : 'No such question'})
                }
            })
            .catch(next)
    }

    static downVote(req, res, next) {
    console.log('static downVote');

    console.log('req.params.questionId => ',req.params.questionId);
    console.log('req.body => ',req.body);
        
    Question.findById(req.params.questionId)
        .then(quest => {

            console.log('quest => ',quest);
            let haveUpVoted = false
            quest.upVotes.forEach((uv, i) => {
                if (uv == req.authenticatedUser.id) {
                    haveUpVoted = true
                }
            })

            quest.downVotes.forEach(dv => {
                if (dv == req.authenticatedUser.id) {
                    throw new Error ('You have already downvoted!')
                }
            })


            if (haveUpVoted) {
                quest.upVotes = quest.upVotes.filter(x => {
                    return x.toString() != req.authenticatedUser.id
                })
            } else if (haveUpVoted == false) {
                console.log('belum pernah upVote')
                quest.downVotes.push(req.authenticatedUser.id)
            }

            return Question.findByIdAndUpdate({ _id: req.params.questionId }, {
                    $set: {
                        upVotes: quest.upVotes,
                        downVotes: quest.downVotes
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

    static upVote(req, res, next) {

    console.log('static upVote invoked');

    console.log('req.body => ',req.body);
    console.log('req.params.id => ',req.params.id);
        
    Question.findById(req.params.questionId)
        .then(quest => {
            console.log('quest => ',quest);
            let haveDownVoted = false
            
            quest.downVotes.forEach((dv, i) => {
                if (dv == req.authenticatedUser.id) {
                    haveDownVoted = true
                }
            })
            quest.upVotes.forEach(uv => {
                if (uv == req.authenticatedUser.id) {
                    throw new Error ('You have already upvoted!')
                }
            })

            if (haveDownVoted) {
                quest.downVotes = quest.downVotes.filter(x => {
                    return x.toString() != req.authenticatedUser.id
                })
            } else if (haveDownVoted == false) {
                quest.upVotes.push(req.authenticatedUser.id)
            }

            return Question.findByIdAndUpdate({
                    _id: req.params.questionId
                }, {
                    $set: {
                        downVotes: quest.downVotes,
                        upVotes: quest.upVotes
                    }
                }, {
                    new: true
                })
                .then((updated) => {
                    console.log('msk4');
                    console.log('updated => ',updated);
                    res.status(200).json(updated)
                })
                .catch(next)
        })
    }
}

module.exports = QuestionController
