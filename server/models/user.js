'use strict'

const mongoose = require('mongoose')
const bcrypt = require('../helpers/bcript')
const Schema = mongoose.Schema

const emailValidationRules = [
    {
        validator: function (v) {
            return mongoose.models.User.findOne({
                email: v
            })
                .then(email => {
                    return !email
                })
        },
        message: props => `${props.value} already exist in database!`
    }
]

const validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/i

const userSchema = new Schema({
    displayName: {
        type: String,
        required: [true, 'display name must not empty!'],
        minlength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'email name must not empty!'],
        match: validEmailFormat,
        minlength: 6,
        maxlength: 50,
        validate: emailValidationRules
    },
    password: {
        type: String,
        required: [true, 'password must not empty!'],
        minlength: 6,
        maxlength: 30
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 500
    },
    avatarImage: {
        type: String,
    }
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashingPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User