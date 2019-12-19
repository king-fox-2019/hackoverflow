const User = require('../models/user'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt');
// { OAuth2Client } = require('google-auth-library'),
// mailer = require("../helpers/nodemailer")

class UserController {

    static register(req, res, next) {
        let { username, email, password, tags } = req.body
        User.create({ username, email, password, tags })
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(next)
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            email: email
        })
            .then(user => {
                if (!user) {
                    next({ status: 403, message: 'Invalid password or email' })
                } else {

                    let authPass = compare(password, user.password)
                    if (authPass) {
                        let username = user.username,
                            email = user.email,
                            _id = user._id;

                        const token = generateToken({
                            username: username,
                            email: email,
                            id: _id
                        })
                        res.status(200).json({ token, username, email })
                    } else {
                        next({ status: 403, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
        const clientId = process.env.GOOGLE_CLIENT_ID
        let googlePayload = ''
        const client = new OAuth2Client(clientId)
        client.verifyIdToken({
            idToken: req.body.token,
            audience: clientId
        })
            .then(ticket => {
                googlePayload = ticket.getPayload()
                return User.findOne({
                    email: googlePayload.email
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        name: googlePayload.name,
                        email: googlePayload.email,
                        password: process.env.PASSWORD_USER,
                        isGoogle: true
                    })
                }
            })
            .then(user => {
                let name = user.name,
                    email = user.email,
                    id = user._id;
                let payload = {
                    id: id,
                    name: name,
                    email: email
                },
                    token = generateToken(payload);
                console.log(token);
                res.status(200).json({ token, name, email })
            })
            .catch(next)
    }

    static addTag(req, res, next) {
        let tags = req.body.tags
        let id = req.loggedUser.id
        User.findById(req.loggedUser.id)
            .then(user => {
                let tagz = []
                for (let i = 0; i < tags.length; i++) {
                    if (user.tags.indexOf(tags[i].toLowerCase()) == -1) {
                        tagz.push(tags[i])
                    }
                }
                console.log(user.tags, tagz);
                return User.updateOne({ _id: id }, { $push: { tags: tagz } })
            })
            .then(_ => {
                res.status(200).json({ message: 'tags updated' })
            })
            .catch(next)
    }

    static removeTag(req, res, next) {
        console.log(req.body.tags);
        let tags = req.body.tags
        let id = req.loggedUser.id
        User.updateOne({ _id: id }, { $pull: { tags: { $in: tags } } })
            .then(_ => {
                res.status(200).json({ message: 'tags updated' })
            })
            .catch(next)
    }

    static getUserData(req, res, next) {
        let id = req.loggedUser.id
        User.findById({ _id: id })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static subscribe(req, res, next) {
        let email = req.loggedUser.email,
            username = req.loggedUser.username;
        return mailer(email, username)
    }
}

module.exports = UserController