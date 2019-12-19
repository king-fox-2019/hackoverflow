const Question = require('../models/question')
const Answer = require('../models/answer')
const toUpdate = require('../helpers/updateField')


class QuestionC {

    static findAll(req, res, next) {
        let { tag, title } = req.query
        let filteredTag = { 'tags': { '$regex': '' } }
        let filteredTitle = { 'title': { '$regex': '' } }
        let objFilter = {}
        if (tag) {
            filteredTag = { 'tags': { '$regex': tag } }
            objFilter = filteredTag
        } else if (title) {
            filteredTitle = { 'title': { '$regex': title } }
            objFilter = filteredTitle
        }
        Question.find(objFilter)
            .sort([['updatedAt', 'descending']])
            .populate(['user', 'answer'])
            .then(questions => {
                console.log(questions);
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findUser(req, res, next) {
        Question.find({ user: req.loggedUser.id })
            .sort([['updatedAt', 'descending']])
            .populate(['user', 'answer'])
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static create(req, res, next) {
        Question.create({
            title: req.body.title,
            question: req.body.question,
            user: req.loggedUser.id,
            tags: req.body.tags
        })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }

    static updateField(req, res, next) {
        let dataChanged = toUpdate(['title', 'question', 'tags'], req.body)
        const _id = req.params.id;
        console.log(req.params.id);
        Question.findByIdAndUpdate(
            _id,
            {
                $set: dataChanged
            },
            {
                omitUndefined: true,
                new: true,
                runValidators: true
            })
            .then(question => {
                console.log(question);
                res.status(201).json({ question, message: 'success updated question' })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Answer.deleteMany({ question: req.params.id })
            .then(deleted => {
                return Question.findByIdAndDelete(req.params.id)
            })
            .then(deleted => {
                res.status(200).json({ deleted, message: 'delete question success' })
            })
            .catch(next)

    }

    static upvote(req, res, next) {
        let { id } = req.params
        Question.findOne({ _id: id })
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
                return Question.updateOne({ _id: id }, { upvotes: arrUpVotes, downvotes: arrDownVotes })
            })
            .then(_ => {
                res.status(201).json({ message: 'upvote success' })
            })
            .catch(next)
    }
    static downvote(req, res, next) {
        let { id } = req.params
        Question.findOne({ _id: id })
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
                return Question.updateOne({ _id: id }, { upvotes: arrUpVotes, downvotes: arrDownVotes })
            })
            .then(_ => {
                res.status(201).json({ message: 'downvote success' })
            })
            .catch(next)
    }

    static tag(req, res, next) {
        Question.aggregate([
            { "$unwind": "$tags" },
            {
                "$group": {
                    "_id": "$tags",
                    "count": { "$sum": 1 }
                }
            },
            { "$sort": { "count": -1 } },
            { "$limit": 4 }
        ])
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = QuestionC