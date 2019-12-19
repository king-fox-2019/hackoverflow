'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    questioner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'title must not empty!'],
        minlength: 5,
        maxlength: 50
    },
    body: {
        type: String,
        required: [true, 'Question must not empty!']
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true } })

// questionSchema.virtual('numAnswers', {
//     ref: 'Answer', 
//     localField: '_id', 
//     foreignField: 'questionId',
//     count: true
// })

const Question = mongoose.model('Question', questionSchema)

module.exports = Question