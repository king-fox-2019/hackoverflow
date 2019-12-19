'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionVoteSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    voter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vote: {
        type: Number
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const questionVote = mongoose.model('Vote', questionVoteSchema)

module.exports = questionVote