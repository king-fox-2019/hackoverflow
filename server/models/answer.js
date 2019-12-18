const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    text : {
        type : String,
        required : [true, 'Please put some answer']
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
},{ timestamps: true, versionKey: false})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports =  Answer