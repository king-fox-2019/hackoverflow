'use strict';

const { User } = require('../models'); 
const { compare } = require('../helpers/bcryptjs');
const { sign } = require('../helpers/jsonwebtoken');

class UserController {
  static register(req, res, next) {
    const user = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    };
    User
      .create(user)
      .then((success) => {
        res.status(201).json(success);
      })
      .catch(next);
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    User
      .findOne({ email })
      .then((user) => {
        if(!user) {
          next({ isThrow: true, status: 404, message: 'Wrong email / password' });
        } else {
          if(compare(password, user.password)) {
            const payload = {
              id: user._id,
              email: user.emit
            };
            const token = sign(payload);
            res.status(200).json({ token });
          } else {
            next({ isThrow: true, status: 404, message: 'Wrong email / password' });
          }
        }
      })
      .catch(next);
  }
}

module.exports = UserController;
