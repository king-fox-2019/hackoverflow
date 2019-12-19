'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    answerer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    body: {
        type: String,
        required: [true, 'Answer must not empty!']
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer