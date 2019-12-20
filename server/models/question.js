const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    votes:[
        {
            userId : {type:String},
            vote : {type:Number},
            _id : false
        }
    ],
    author:{type:Schema.Types.ObjectId, ref:'User'},
    answers:[{type:Schema.Types.ObjectId, ref:'Answer'}],
    totalVotes:Number,
    tags:[String]
})

const Question = mongoose.model('Question',questionSchema)

module.exports = Question