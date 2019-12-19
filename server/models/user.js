const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hash } = require("../helpers/bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter username."]
  },
  tags: [{
    type: String
  }],
  image: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    unique: true,
    validate: {
      validator: function(value) {
        return User.findOne({ email: value }).then(user => {
          if (user) return false;
        });
      },
      message: props => "Email already registered"
    }
  },
  password: {
    type: String,
    required: [true, "Please enter your password."]
  },
  isGoogle: {
    type: Boolean,
    default: false
  }
});
userSchema.pre("save", function(next) {
  this.password = hash(this.password);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
