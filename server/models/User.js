const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"]
  },
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
    validate: [
      {
        validator: value => {
          const condition = {
            username: value
          };
          return models.User.findOne(condition).then(user => {
            if (user) return false;
          });
        },
        msg: "Username is unavailable"
      }
    ]
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
    validate: [
      {
        validator: value => {
          const condition = {
            email: value
          };
          return models.User.findOne(condition).then(user => {
            if (user) return false;
          });
        },
        msg: "Email is unavailable"
      },
      {
        validator: value => {
          const regExEmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
          const userEmailValid = regExEmailValidation;
          return userEmailValid;
        },
        msg: "Email format is not valid"
      }
    ]
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"]
  }
});

userSchema.pre("save", function(next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = model("User", userSchema);

module.exports = User;
