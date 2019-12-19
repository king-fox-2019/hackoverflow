const { hashPassword } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const { Schema, model, models  } = mongoose
const UserSchema = new Schema({
    email : {
        type : String,
        required: [true, 'email is required'],
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Invalid Email Format'],
        unique:true
    },
    password : {
        type : String,
        required: [true, 'password is required'],
        minlength: [4, 'Password Minimum Contain 4 Character']
    },
    popular:{
        type: Number,
        default: 0
    },
    image:{
        type: Array,
        validate: {
            validator: function(v){
                return v.length < 1 ? false : true
            },
            message: `Please Fill Your PhotoProfile` 
        }
    },
    watchedTags:{
        type: Array,
        validate: {
            validator: function(v){
                models.User.findOne({ email: this.email })
                    .then(user=>{
                        user.watchedTags.forEach(tag=>{
                            if (tag === v) {
                                return false
                            }
                        })
                        return true
                    })
                    .catch(console.log)
            },
            message:props => `tag is used, not be dublicated!`
        }
    }
},{
    versionKey: false,
    timestamps: true
})

UserSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

module.exports = model('User',UserSchema)