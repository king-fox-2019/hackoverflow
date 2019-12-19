const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Description can not be empty']
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;