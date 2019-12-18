const Jawab = require('../models/answer')

class Controller {

    static showQuestionAnswers(req, res, next) {
        Jawab.find({ question: req.params.id })
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

    static updateAnswer(req, res, next) {
        Tanya.findByIdAndUpdate(req.params.id, {
            body: req.body.body,
        }, { new: true })
            .then((pertanyaan) => {
                res.status(200).json(pertanyaan)
            })
            .catch(next);
    }

    static increaseVote(req, res, next) {
        Jawab.findById(req.params.id)
            .then((jawaban) => {
                if (!jawaban.upVotes.includes(req.decode.id)) {
                    return Jawab.findByIdAndUpdate(req.params.id, {
                        $push: { upVotes: req.decode.id }
                    }, { new: true })
                }
            })
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

    static decreseVote(req, res, next) {
        Jawab.findById(req.params.id)
            .then((jawaban) => {
                if (!jawaban.downVotes.includes(req.decode.id)) {
                    return Jawab.findByIdAndUpdate(req.params.id, {
                        $pull: { downVotes: req.decode.id }
                    }, { new: true })
                }
            })
            .then((jawaban) => {
                res.status(200).json(jawaban)
            })
            .catch(next);
    }

}

module.exports = Controller