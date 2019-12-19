const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title cannot be empty']
    },
    desc:{
        type: String,
        required: [true, 'Description cannot be empty']
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    views: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: []
},
{
    versionKey: false,
    timestamps: true
})

const Question = model('Question', questionSchema)

module.exports = Question