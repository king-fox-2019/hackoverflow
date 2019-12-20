const mongoose = require('mongoose')
const { Schema, model  } = mongoose
const AnswerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type : String,
    },
    description : {
        type : String,
        required: [true, 'description is required'],
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

module.exports = model('Answer',AnswerSchema)