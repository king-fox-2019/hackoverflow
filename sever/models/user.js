const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  email : {
    type : String, 
    required : [true, `Please enter your email`],
    unique : [true, 'Email is already used'],
    match : [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'invalid email format']
  },
  password : {
    type : String,
    required : [true, `Password cannot be empty`],
    minlength: [5, 'Password must be at least 5 charachters long']
  },
  tags: [{
    type: String
  }]
}, {
  versionKey: false
})
userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model(`User`, userSchema)

module.exports = User