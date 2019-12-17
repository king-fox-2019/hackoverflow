'use strict'; 
const { Question } = require('../models');

module.exports = (req, res, next) => {
    let { id } = req.params
    Question
        .findOne(id)
        .populate({
            path: 'userId',
            select: '-password'
        })
        .then((data) => {
            if (data.userId._id == req.token.id ) {
                next();
            } else {
                next({ isThrow: true, status: 401, message: "Product" });
            }
        })
        .catch(next)
}