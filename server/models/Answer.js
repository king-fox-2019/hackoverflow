var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    question : { type: Schema.Types.ObjectId, ref: 'Question' },
    description : String,
    votes : [{
        user : { type: Schema.Types.ObjectId, ref: 'User' },
        number : Number
    }],
    comment : [{
        user : { type: Schema.Types.ObjectId, ref: 'User' },
        comment : String
    }],
});

module.exports = mongoose.model('Answer', modelSchema)