'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerVoteSchema = new Schema({
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    },
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vote: {
        type: Number
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const answerVote = mongoose.model('Answer', answerVoteSchema)

module.exports = answerVote