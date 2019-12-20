const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function(req, res, next) {
  if (!req.headers.token) {
    next({name: 'BadRequest', message: 'token is missing'});
  }

  try {
    const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET);

    User.findById(payload.id)
      .then(function(user) {
        if (!user) next({name: 'BadRequest', message: 'Bad token'});
        req.payload = payload;
        next();
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
