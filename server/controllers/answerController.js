const Jawab = require('../models/answer')

class Controller {

    static getall(req, res, next) {
        Jawab.find()
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

    static createAnswer(req, res, next) {
        Jawab.create({
            body: req.body.body,
            question: req.params.id,
            user: req.decode.id
        })
            .then((jawaban) => {
                res.status(201).json(jawaban)
            })
            .catch(next);
    }

    static showQuestionAnswers(req, res, next) {
        Jawab.find({ question: req.params.id }).populate('user')
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

    static updateAnswer(req, res, next) {
        Jawab.findByIdAndUpdate(req.params.id, {
            body: req.body.body,
        }, { new: true })
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

    static increaseVote(req, res, next) {
        Jawab.findByIdAndUpdate(req.params.id, {
            $addToSet: { upVotes: req.decode.id },
            $pull: { downVotes: req.decode.id }
        }, { new: true })
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

    static decreaseVote(req, res, next) {
        Jawab.findByIdAndUpdate(req.params.id, {
            $addToSet: { downVotes: req.decode.id },
            $pull: { upVotes: req.decode.id }
        }, { new: true })
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }
}

module.exports = Controller