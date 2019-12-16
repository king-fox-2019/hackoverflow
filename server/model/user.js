const { Schema,model,Model } = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be empty']
    },
    email:{
        type: String,
        required: [true, 'Email cannot be empty'],
        match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'Your email is not valid'],
        validate:{
            validator(val){
                Model.findOne({
                    email: val
                })
                .then(user => {
                    if (user) return false
                    else return true
                })
            },
            message: 'Your email is already registered'
        }
    },
    password:{
        type: String,
        required: [true, 'Password cannot be empty']
    },
    avatar:{
        type: String
    }
})


userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = model('User', userSchema)

module.exports = User