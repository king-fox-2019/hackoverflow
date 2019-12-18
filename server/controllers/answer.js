const Answer = require('../models/Answer');
const Question = require('../models/Question');

class AnswerController {
    static create(req, res, next) {
        const { description, question } = req.body;
        Answer
            .create({
                description, question,
                user: req.decoded.id
            })
            .then(answer => {
                return Question
                    .findOneAndUpdate({_id : question},{
                        $addToSet : {answers : answer._id}
                    },{
                        returnOriginal: false
                    })
                    .populate('answers')
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static showOne(req, res, next) {
        Answer
            .findById(req.params.id)
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
        Answer
            .find()
            .then( datas => {
                res.status(200).json(datas);
            })
            .catch( err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const { description } = req.body;
        Answer
            .findOneAndUpdate({_id: req.params.id}, { 
                description
             })
            .then( data => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err);
            })
    }

    static destroy(req, res, next) {
        Answer
            .findByIdAndRemove({_id: req.params.id})
            .then( data => {
                if (!data) {
                    let err = {
                        status: 400,
                        msg: 'Not found'
                    }
                    next(err);
                } else {
                    res.status(200).json(data)
                } 
            })
            .catch( err => {
                next(err);
            })
    }

    static async upvote(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Answer.findById(id)
            if (data.downvotes.includes(req.decoded.id)) {
                await Answer
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $pull: { downvotes: req.decoded.id}
                    })
                
                const result = await Answer
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $addToSet: { upvotes: req.decoded.id }
                    },{
                        upsert: true,
                        returnOriginal: false
                    })

                    res.status(200).json(result)
            }
        } catch(err) {
            next(err)
        }
    }

    static async downvote(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Answer.findById(id)
            if (data.upvotes.includes(req.decoded.id)) {
                await Answer
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $pull: { upvotes: req.decoded.id}
                    })
            }

            const result = await Answer
                .findByIdAndUpdate({
                    _id: id
                },{
                    $addToSet: { downvotes: req.decoded.id }
                },{
                    upsert: true,
                    returnOriginal: false
                })

                res.status(200).json(result)
        } catch(err) {
            next(err)
        }
    }

    static async upvote(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Answer.findById(id)
            if (data.downvotes.includes(req.decoded.id)) {
                await Answer
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $pull: { downvotes: req.decoded.id }
                    })
            }

            const answer = await Answer
                .findOneAndUpdate({
                    _id: id
                },{
                    $addToSet: { upvotes: req.decoded.id }
                },{
                    upsert: true,
                    returnOriginal: false
                })
          
            const result = await Question.findById(answer.question).populate('user').populate('answers')
                
            res.status(200).json(result)
        } catch(err) {
            next(err)
        }
    }

    static async downvote(req, res, next) {
        const { id } = req.params;

        try {
            const data = await Answer.findById(id)
            if (data.upvotes.includes(req.decoded.id)) {
                await Answer
                    .findOneAndUpdate({
                        _id: id
                    },{
                        $pull: { upvotes: req.decoded.id}
                    })
            }

            const answer = await Answer
                .findByIdAndUpdate({
                    _id: id
                },{
                    $addToSet: { downvotes: req.decoded.id }
                },{
                    upsert: true,
                    returnOriginal: false
                })

                const result = await Question.findById(answer.question).populate('user').populate('answers')

                res.status(200).json(result)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = AnswerController;