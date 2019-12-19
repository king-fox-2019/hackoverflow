"use strict";

const { verifyToken } = require("../helpers/jwt");
const Question = require("../models/question");
const Answer = require("../models/answer");

module.exports = {
  authentication(req, res, next) {
    if (!req.headers.access_token) {
      throw { errorCode: 401, message: "You must log in first" };
    }
    try {
      req.decoded = verifyToken(req.headers.access_token);
      next();
    } catch (err) {
      next({ status: 401, message: "You must log in first" });
    }
  },

  authorization(req, res, next) {
    let model;
    if (req.baseUrl === '/questions') {
      model = Question
    } else {
      model = Answer
    }
    model.findById(req.params.id)
      .then(data => {
        if (data) {
          if (String(data.UserId) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 401, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, message: `${model} not found` });
        }
      })
      .catch(next);
  }
};
