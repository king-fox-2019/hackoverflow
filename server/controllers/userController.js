const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res, next) {
    const {username, password} = req.body;

    User.create({username, password})
      .then(function(user) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.status(201).json({token, username: user.username});
      })
      .catch(next);
  }

  static login(req, res, next) {
    const {username, password} = req.body;

    User.findOne({username})
      .then(function(user) {
        if (!user) {
          next({name: 'BadRequest', message: 'Username or password is wrong'});
        } else {
          if (bcryptjs.compareSync(password, user.password)) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.json({token, username: user.username});
          } else {
            next({name: 'BadRequest', message: 'Username or password is wrong'});
          }
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
