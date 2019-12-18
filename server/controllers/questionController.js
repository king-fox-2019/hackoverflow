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
        Tanya.deleteOne(req.params.id)
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static getAllQuestion(req, res, next) {
        Tanya.find()
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
        Tanya.findById(req.params.id)
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static updateQuestion(req, res, next) {
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
}

module.exports = Controller