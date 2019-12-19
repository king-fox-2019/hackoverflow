const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    question: {
        type: String,
        required: [true, 'question is required']
    },
    tags: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    downvotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    answer: [{ type: Schema.Types.ObjectId, ref: 'answer' }]
}, {
    timestamps: true,
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question