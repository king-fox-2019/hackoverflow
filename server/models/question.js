const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Comment = require('../models/comment')
// const Answer = require('../models/answer')
// const User = require('../models/user')

const QuestionSchema = new Schema ({
    userId: {
        type : Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    },
    title : {
        type : String,
        required: [true, 'title is required']
    },
    tags: [{
        type : String
    }],
    answers : [{
        type : Schema.Types.ObjectId,
        ref : "Answer"
    }],
    createdAt : {
        type : Date
    },
    question : {
        type : String
    },
    upVotes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: [true,'user id is required']
        }
    ],
    downVotes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: [true,'user id is required']
        }
    ],
    },{ timestamps : true, versionKey : false})

    const Question = mongoose.model('Question', QuestionSchema)

    module.exports = Question