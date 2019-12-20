const User = require("../model/user");
const avatar = "https://api.adorable.io/avatars/285";
const { compare } = require("../helpers/bcrypt");
const { genereteToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    console.log(req.body);
    const { username, email, password } = req.body;
    User.create({
      username,
      email,
      password,
      avatar: `${avatar}/${email}.png`
    })
      .then(user => {
        res.status(201).json({
          user,
          message: "Success Register"
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      email
    })
      .then(user => {
        if (user) {
          let valid = compare(password, user.password);
          if (valid) {
            let token = genereteToken({ id: user._id });
            res.status(200).json({
              user,
              token,
              message: `Success Login, Welcome ${user.username}`
            });
          } else {
            throw {
              status: 400,
              message: "Your email/password is wrong"
            };
          }
        } else {
          throw {
            status: 400,
            message: "Your email is not registered"
          };
        }
      })
      .catch(next);
  }

  static getInfo(req, res, next) {
    User.findOne({
      _id: req.decoded.id
    })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next);
  }

  static getAllUser(req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(next);
  }

  static addTag(req, res, next) {
    const { tag } = req.body;
    User.findOne({
      _id: req.decoded.id
    })
      .then(user => {
        if (user.tag.includes(tag)) {
          throw {
            status: 400,
            message: "Tag already exists"
          };
        } else {
          User.findOneAndUpdate(
            {
              _id: req.params.id
            },
            {
              $push: { tag }
            },
            {
              new: true
            }
          );
        }
      })
      .then(user => {
        res.status(200).json({
          message: "Add tags success"
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
