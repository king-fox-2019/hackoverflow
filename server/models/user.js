const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    validate: [
      {
        validator: function(val) {
          return new Promise((resolve, reject) => {
            mongoose.models.User.findOne({username: val})
              .then(function(user) {
                user ? resolve(false) : resolve(true);
              })
              .catch(reject);
          });
        },
        msg: 'Username already registered',
      },
    ],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'min length password 6'],
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    },
  ],
});

userSchema.post('validate', function(user) {
  user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10));
});

const User = mongoose.model('User', userSchema);

module.exports = User;
