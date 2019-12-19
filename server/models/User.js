const { Schema, model, models } = require('mongoose')
const { hashSync } = require('bcryptjs')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: [
        {
          validator(val) {
            return models.User.findOne({
              email: val,
              _id: { $ne: this._id }
            }).then(user => {
              if (user) return false
              return true
            })
          },
          msg: 'Email already registered'
        },
        {
          validator(val) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              val
            )
          },
          msg: 'Invalid email format'
        }
      ]
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: [6, 'Password min length 6']
    },
    watchedTags: [
      {
        type: String
      }
    ]
  },
  { versionKey: false }
)

userSchema.post('validate', function(doc, next) {
  if (!doc._id) {
    doc.password = hashSync(doc.password, 10)
  }
  next()
})

module.exports = model('User', userSchema)
