const Tanya = require('../models/question')

class Controller {

    static create(req, res, next) {
        Tanya.create({
            title: req.body.title,
            body: req.body.body,
            about: req.body.about,
            asker: req.decode.id
        })
            .then((pertanyaan) => {
                res.status(201).json(pertanyaan)
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Tanya.findByIdAndDelete(req.params.id)
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static getAllQuestion(req, res, next) {
        Tanya.find({}, null, { sort: '-date' }).populate('asker')
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static getMyQuestion(req, res, next) {
        Tanya.find({ asker: req.decode.id })
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static getSingleQuestion(req, res, next) {
        Tanya.findById(req.params.id).populate('asker')
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static updateQuestion(req, res, next) {
        console.log(req.body);
        Tanya.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            about: req.body.about
        }, { new: true })
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static increaseVote(req, res, next) {
        Tanya.findByIdAndUpdate(req.params.id, {
            $addToSet: { upVotes: req.decode.id },
            $pull: { downVotes: req.decode.id }
        }, { new: true })
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static decreaseVote(req, res, next) {
        Tanya.findByIdAndUpdate(req.params.id, {
            $addToSet: { downVotes: req.decode.id },
            $pull: { upVotes: req.decode.id }
        }, { new: true })
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }
}

module.exports = Controller