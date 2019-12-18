const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const kue = require('kue');
const queue = kue.createQueue();
const emailSender = require('../helpers/nodemailer');
const { createJob, processJob } = require('../helpers/emailWorker');

class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body;
        let err;

        User
            .findOne({ email })
            .then( user => {
                if (user) {
                    err = {
                        status: 400,
                        msg: 'Email address is taken.'
                    }
                    next(err);
                } else {
                    User
                        .create({ name, email, password })
                        .then( data => {
                            let token = jwt.sign({
                                id: data._id
                            }, process.env.JWT_SECRET)

                            res.status(201).json({ 
                                name, email, token
                            });
                        })
                        .catch(next)
                }

            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        let err;
        
        if (!email || !password) {
            err = {
                status: 400,
                msg: 'Bad request'
            }
            next(err)
        }
        
        User
            .findOne({ email })
            .then( user => {
                if (!user) {
                    err = {
                        status: 404,
                        msg: 'User not found'
                    }
                    next(err)
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({
                            id: user._id
                        }, process.env.JWT_SECRET);

                        res.status(200).json({
                            name: user.name, 
                            email, token
                        })
                    } else {
                        err = {
                            status: 404,
                            msg: 'Invalid email / password'
                        }
                        next(err)
                    }
                }
            })
            .catch(next)
    }

    static upload(req, res, next) {
        const { image } = req.body;
        res.status(200).json({ image })
    }

    static getTags(req, res, next) {
        User.findById(req.decoded.id)
            .select('tags -_id')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static addUserTag(req, res, next) {
        const { tag } = req.body;
        User.findOneAndUpdate({
            _id: req.decoded.id
        },{
            $addToSet: { tags: tag }
        },{
            upsert: true,
            returnOriginal: false
        })
        .select('tags -_id')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static removeUserTag(req, res, next) {
        const { tag } = req.body;
        console.log(tag)
        User.findOneAndUpdate({
            _id: req.decoded.id
        },{
            $pull: { tags: tag }
        },{
            upsert: true,
            returnOriginal: false
        })
        .select('tags -_id')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static forgotPassword(req, res, next) {
        const { email } = req.body;
        User
            .findOne({ email })
            .then(user => {
                if (!user) {
                    let err = {
                        status: 404,
                        msg: 'User not found.'
                    }
                    next(err);
                } else {
                    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                    createJob({ email, resetToken });
                    res.status(200).json({
                        message: "Email has been successfully sent!"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static async resetPassword(req, res, next) {
        const { token, password } = req.body;
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(id)

            if (!user) {
                let err = {
                    status: 404,
                    msg: 'Not found'
                }
                next(err)
            } else {
                const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                const updated = await User
                    .findOneAndUpdate({ _id: user.id},{
                        password: newPassword
                    },{
                        returnOriginal: false
                    })
                res.status(200).json(updated)
            }
        } catch(err) {
            next(err)
        }
    }
}

processJob();

module.exports = UserController;