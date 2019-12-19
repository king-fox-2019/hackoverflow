const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

class UserController {
  static signupUser(req, res, next) {
    const { name, username, email, password } = req.body;
    const docs = {
      name,
      username,
      email,
      password
    };
    User.create(docs)
      .then(user => {
        const payload = {
          _id: user._id,
          username: user.username
        };
        const token = jsonwebtoken.sign(payload, secret);
        const id = user._id;
        const username = user.username;
        const responses = {
          message: "Sign up success",
          token,
          id,
          username
        };
        res.status(201).json(responses);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
  static signinUser(req, res, next) {
    const { emailUsername, password } = req.body;
    const condition = {
      $or: [{ username: emailUsername }, { email: emailUsername }]
    };
    console.log(req.body);
    User.findOne(condition)
      .then(user => {
        if (user) {
          const match = bcrypt.compareSync(password, user.password);
          if (match) {
            const payload = {
              _id: user._id,
              username: user.username
            };
            const token = jsonwebtoken.sign(payload, secret);
            const id = user._id;
            const username = user.username;
            const responses = {
              message: "Sign in success",
              token,
              id,
              username
            };
            res.status(200).json(responses);
          } else {
            throw {
              message: "Password wrong"
            };
          }
        } else {
          throw {
            message: "User not found"
          };
        }
      })
      .catch(err => {
        next(err);
      });
  }
  static getCurrentUser(req, res, next) {
    const responses = {
      message: "Success get current user",
      id: req.decoded._id,
      username: req.decoded.username
    };
    res.status(200).json(responses);
  }
}

module.exports = UserController;
