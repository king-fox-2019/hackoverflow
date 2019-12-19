const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'name required']
    },
    password:{
        type:String,
        required:[true,'password required']
    },
    email:{
        type:String,
        required:[true,'email required'],
        validate:{
            validator: function(v) {
                return User.findOne({email:v})
                .then(user=>{
                    if(user) return false
                })
            },
            message: `Email already taken!`
        }
    },
    watchedTags:Array
})

const User = mongoose.model('User',userSchema)

module.exports = User