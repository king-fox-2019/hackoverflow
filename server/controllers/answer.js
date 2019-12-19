const Question = require('../models/question')
const Answer = require('../models/answer')
const toUpdate = require('../helpers/updateField')

class AnswerC {

    static create(req, res, next) {
        let answer;
        Answer.create({
            answer: req.body.answer,
            user: req.loggedUser.id,
            question: req.params.id
        })
            .then(newAnswer => {
                answer = newAnswer;
                return Question.findByIdAndUpdate(req.params.id, { $push: { answer } })
            })
            .then(updated => {
                res.status(200).json({ updated, answer })
            })
    }

    static updateField(req, res, next) {
        let dataChanged = toUpdate(['answer'], req.body)
        const _id = req.params.id;
        Answer.findByIdAndUpdate(
            _id,
            {
                $set: { dataChanged }
            },
            {
                omitUndefined: true,
                new: true,
                runValidators: true
            })
            .then(answer => {
                res.status(201).json({ answer, message: 'success updated answer' })
            })
            .catch(next)
    }

    static userAnswer(req, res, next) {
        Answer.find({ user: req.loggedUser.id })
            .populate(['user', 'question'])
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(next)
    }

    static upvote(req, res, next) {
        let { id } = req.params
        Answer.findOne({ _id: id })
            .then(result => {
                let arrUpVotes = result.upvotes
                let arrDownVotes = result.downvotes
                if (arrUpVotes.indexOf(req.loggedUser.id) === -1) {
                    arrUpVotes.push(req.loggedUser.id)
                    if (arrDownVotes.indexOf(req.loggedUser.id) !== -1) {
                        arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser.id), 1)
                    }
                } else {
                    arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser.id), 1)
                }
                return Answer.updateOne({ _id: id }, { upvotes: arrUpVotes, downvotes: arrDownVotes })
            })
            .then(_ => {
                res.status(201).json({ message: 'upvote success' })
            })
            .catch(next)
    }
    static downvote(req, res, next) {
        let { id } = req.params
        Answer.findOne({ _id: id })
            .then(result => {
                let arrUpVotes = result.upvotes
                let arrDownVotes = result.downvotes
                if (arrDownVotes.indexOf(req.loggedUser.id) === -1) {
                    arrDownVotes.push(req.loggedUser.id)
                    if (arrUpVotes.indexOf(req.loggedUser.id) !== -1) {
                        arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser.id), 1)
                    }
                } else {
                    arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser.id), 1)
                }
                return Answer.updateOne({ _id: id }, { upvotes: arrUpVotes, downvotes: arrDownVotes })
            })
            .then(_ => {
                res.status(201).json({ message: 'downvote success' })
            })
            .catch(next)
    }
}

module.exports = AnswerC
