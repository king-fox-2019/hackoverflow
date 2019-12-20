const question = require('../models/question');
const answer = require('../models/answer');

class controllerQuestion {
    static create(req, res, next) {
        question.create({
            title: req.body.title,
            description: req.body.description,
            user: req._id
        }).then(response => {
            res.status(201).json({
                message: "Question successfully created",
                data: response
            })
        }).catch(next)
    }

    static view(req, res, next) {
        question.find()
            .then(response => {
                res.status(201).json({
                    data: response
                })
            }).catch(next)
    }

    static viewOne(req, res, next) {
        question.findById(
            req.params.id
        ).populate(
            'answer'
        ).populate(
            'user'
        ).then(response => {
            res.status(201).json({
                data: response
            })
        }).catch(next)
    }

    static delete(req, res, next) {
        question.findByIdAndDelete(
            req.params.id
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Question not found"});
            return answer.deleteMany({
                question: req.params.id
            })
        }).then(response => {
            res.status(201).json({
                message: "Question successfully deleted",
                data: response
            });
        }).catch(next)
    }

    static like(req, res, next) {
        question.findById(
            req.params.id
        ).then(response => {
            let like = response.upVotes;
            let isUserAlreadyLike = like.indexOf(req._id);

            if (isUserAlreadyLike > -1) {
                throw({code: 400, errmsg: "You already like this question"});
            }

            return question.findByIdAndUpdate(
                req.params.id,
                {
                    "$push": {
                        upVotes: req._id
                    }
                })
        }).then(response => {
            res.status(201).send({
                message: "Successfully like"
            })
        }).catch(next)
    }

    static unLike(req, res, next) {
        question.findById(
            req.params.id
        ).then(response => {
            let unLike = response.downVotes;
            let isUserAlreadyUnLike = unLike.indexOf(req._id);

            if (isUserAlreadyUnLike > -1) {
                throw({code: 400, errmsg: "You already unlike this question"});
            }

            return question.findByIdAndUpdate(
                req.params.id,
                {
                    "$push": {
                        downVotes: req._id
                    }
                })
        }).then(response => {
            res.status(201).send({
                message: "Successfully unLike"
            })
        }).catch(next)
    }
}

module.exports = controllerQuestion;