const Question = require('../models/Question');
const Answer = require('../models/Answer');
class QuestionController {
    static create(req, res, next) {
        const { title, description, tags } = req.body;
        Question
            .create({
                title, description, tags,
                user: req.decoded.id
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Question
            .findById(req.params.id)
            .populate('answers')
            .populate('user')
            .then( data => {
                if (!data) {
                    let err = {
                        status: 404,
                        msg: 'Not found'
                    }
                    next(err)
                } else {
                    res.status(200).json(data)
                } 
            })
            .catch( err => {
                next(err);
            })
    }

    static showAll(req, res, next) {
        Question
            .find()
            .populate('answers')
            .populate('user')
            .then( datas => {
                res.status(200).json(datas);
            })
            .catch( err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const { title, description, tags } = req.body;
        Question
            .findOneAndUpdate({_id: req.params.id}, { 
                title, description, tags
             },{
                 returnOriginal: false
             })
            .populate('answers')
            .populate('user')
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static async destroy(req, res, next) {
        const { id } = req.params;
        try {
            let question = await Question.findByIdAndRemove(id)
            await Answer.deleteMany({_id: {$in: question.answers }});

            res.status(200).json(question)
        } catch(err) {
            next(err)
        }
    }

    static async upvote(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Question.findById(id)
            if (data.downvotes.includes(req.decoded.id)) {
                await Question
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $pull: { downvotes: req.decoded.id}
                    })
            }
            const result = await Question
                .findOneAndUpdate({
                    _id: id
                },{
                    $addToSet: { upvotes: req.decoded.id }
                },{
                    upsert: true,
                    returnOriginal: false
                })
                .populate('answers')
                .populate('user')

                res.status(200).json(result)
        } catch(err) {
            next(err)
        }
    }

    static async downvote(req, res, next) {
        const { id } = req.params;

        try {
            const data = await Question.findById(id)
            if (data.upvotes.includes(req.decoded.id)) {
                await Question
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $pull: { upvotes: req.decoded.id}
                    })
            }

            const result = await Question
                .findByIdAndUpdate({
                    _id: id
                },{
                    $addToSet: { downvotes: req.decoded.id }
                },{
                    upsert: true,
                    returnOriginal: false
                })
                .populate('answers')
                .populate('user')

                res.status(200).json(result)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = QuestionController;