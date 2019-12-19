const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    upVotes: { type: [Schema.Types.ObjectId], ref: 'User' },
    downVotes: { type: [Schema.Types.ObjectId], ref: 'User' },
    body: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer