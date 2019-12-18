const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title can not be empty']
    },
    description: {
        type: String,
        required: [true, 'Description can not be empty']
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    tags: Array,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;