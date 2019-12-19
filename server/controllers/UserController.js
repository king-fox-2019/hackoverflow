const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

    static findById(req, res, next) {
        console.log('findById invoked');
        User.findById(req.authenticatedUser.id)
        .then(data => {
            console.log('data => ',data);
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({msg : `No such user`})
            }
        })
        .catch(next)
    }
    
    static register(req, res, next) {
        console.log('register invoked')
        console.log('req.body => ',req.body);
        
        User.create({...req.body})
        .then(created => {
            console.log('created => ',created);
            res.status(201).json(created)
        })
        .catch(next)
    }

    static login(req, res, next) {
    
    console.log('login invoked')
    User.findOne({ email: req.body.email })
        .then(found => {
            if (found) {
                console.log('found => ',found);
                if (!bcrypt.compareSync(req.body.password, found.password)) {
                    res.status(400).json({
                        msg: 'Invalid password/Email'
                    })
                } else {
                    let { email, _id } = found
                    let token = jwt.sign({ id: _id, email }, process.env.JWT_SECRET)
                    console.log('dapat token', token)
                    req.headers.token = token
                    res.status(200).json({ token, email, _id })
                }
            } else {
                console.log('email tidak ditemukan')
                res.status(400).json({ msg: 'Email Not Found' })
            }
        })
        .catch(next)
    }
}

module.exports = UserController