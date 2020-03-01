var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/user/signup', (req, res) => {
    const options = {
        httpOnly: true,
        signed: true
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password
    }).save((err, response) => {
        if(err) return res.status(400).send(err)
        res.status(200).cookie('name', req.body.username, options).send({ screen: req.body.username })
        console.log(`Added ${req.body.username} to users`)
    });
});

router.post('/user/login', (req, res) => {
    const options = {
        httpOnly: true,
        signed: true
    }
    User.findOne({ 'username': req.body.username }, (err, user) => {
        if(!user) return res.status(401).send({ message: 'Login failed, user not found' });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch) return res.status(400).send({
                message: 'Wrong password'
            });
            let date = new Date();
            User.update({ 'username': req.body.username }, { $push: { loginHistory: date } }, (err) => {
                if(err) throw err
                res.cookie('name', req.body.username, options).send({ screen: req.body.username });
                console.log(`Successful user login: ${req.body.username}`);
            });
        });
    });
});

router.get('/user/get-data', (req, res) => {
    if (req.signedCookies.name) {
        User.findOne({ 'username': req.signedCookies.name }, (err, user) => {
            console.log(user)
            if(!user) return res.status(400).send({ message: 'Unable to get data' });
            res.send({ user: req.signedCookies.name, data: user.loginHistory })
        })

    }
});

router.get('/user/read-cookie', (req, res) => {
    if (req.signedCookies.name) {
        res.send({ screen: req.signedCookies.name });
    } else {
        res.send({ screen: 'auth' });
    }
});

router.get('/user/clear-cookie', (req, res) => {
    res.clearCookie('name').end();
});

module.exports = router;