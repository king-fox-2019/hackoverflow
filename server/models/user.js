const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 18,
        required: [true, 'I dont know what to call you then if you left it blank :(']
    },
    email: {
        type: String,
        required: [true, `Don't worry, i'll not share your email to anyone`],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Your email not valid']
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://image.freepik.com/free-vector/hand-painted-fox-design_1152-89.jpg'
    },
    aboutMe: {
        type: String,
        default: 'Currently blank',
        maxlength: [200, 'Simple story, please :)']
    }
}, { minimize: true })

UserSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User