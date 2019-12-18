const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    upVotes: { type: [Schema.Types.ObjectId], ref: 'User' },
    downVotes: { type: [Schema.Types.ObjectId], ref: 'User' },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    asker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question