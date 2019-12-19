const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const QuestionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answerId: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    title : {
        type : String,
        required: [true, 'title is required'],
    },
    description : {
        type : String,
        required: [true, 'description is required'],
    },
    tags:{
        type: Array
    },
    upvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    downvotes : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }]
},{
    versionKey: false,
    timestamps: true
})

module.exports = model('Question',QuestionSchema)