const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.access_token;
  const decoded = jsonwebtoken.verify(token, secret);
  req.decoded = decoded;
  const id = decoded._id;
  User.findById(id)
    .then(user => {
      if (user) next();
      else
        throw {
          code: 404,
          message: "User not found"
        };
    })
    .catch(err => {
      next(err);
    });
};
