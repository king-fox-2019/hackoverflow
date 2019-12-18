const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/PasswordGenerator').hashPassword

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalid format'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password min 6 char']
  },
  profilePicture: {
    type: String,
  },
  profile: {
    type: String,
  }
}, {
  timestamps: true, versionKey : false
})

userSchema.path('email').validate(function(value) {
  return User.findOne({ email: value })
    .then(user => {
      if(user) return false
    })
}, 'Email user is already registered!')

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
