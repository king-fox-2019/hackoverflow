const User = require("../models/user");
const { validatePass } = require('../helpers/bcrypt')
const { generateToken }= require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      user.save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static login(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          let err = {
            status: 404,
            message: "Email and/or password incorrect"
          };
          next(err);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = { id: user._id, email: user.email };
          let access_token = generateToken(payload);
          res.status(200).json({ access_token: access_token });
        } else {
          let err = {
            status: 403,
            message: "Email and/or password incorrect"
          };
          next(err);
        }
      })
      .catch(next);
  }

}

module.exports = UserController;
