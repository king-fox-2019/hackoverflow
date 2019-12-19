var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { encrypt } = require('../helpers/encrypt')

var modelSchema = new Schema({
email:{
    type : String,
    unique: true
}, 
username:{
    type : String,
    unique: true
}, 
password: String,
watchedTag : [String]
});

modelSchema.pre('save', function(){
    this.password = encrypt(this.password)
})

module.exports = mongoose.model('User', modelSchema)