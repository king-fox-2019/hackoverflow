"use strict";

const { User } = require("../models");
const { verify } = require('../helpers/jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.token || null;
  if (token) {
    let decoded = verify(token);
    let { id } = decoded;
    User.findById(id)
      .then(user => {
        if (!user) {
          next({
            isThrow: true,
            status: 404,
            message: "User not found"
          });
        } else {
          req.token = decoded;
          next();
        }
      })
      .catch(next);
  } else {
    next({
      isThrow: true,
      status: 401,
      message: 'Please Login'
    })
  }
};
