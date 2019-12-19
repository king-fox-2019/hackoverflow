var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title : String,
    description : String,
    votes : [{
        user : { type: Schema.Types.ObjectId, ref: 'User' },
        number : Number
    }],
    tags : [ String ],
});

module.exports = mongoose.model('Question', modelSchema)