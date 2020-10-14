const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    return jwt.sign(data, process.env.PRIVATE_KEY);
};

const saveUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (password !== repeatPassword) {
        return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashedPass
    });

    const userObject = await user.save();

    const token = generateToken({
        userId: userObject._id,
        username: userObject.username
    });

    res.cookie('aid', token);

    return true;
};

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const userObject = await User.findOne({ username });
    const status = await bcrypt.compare(password, userObject.password);

    if (status) {
        const token = generateToken({
            userId: userObject._id,
            username: userObject.username
        });

        res.cookie('aid', token);
    }

    return status;
};

const authAccess = (req, res, next) => {
    try {
        const token = req.cookies['aid'];
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    } catch (err) {
        res.redirect('/');
    }
};

const authAccessJSON = (req, res, next) => {
    try {
        const token = req.cookies['aid'];
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    } catch (err) {
        return res.json({error: 'Not Authenticated!'});
    }
};

const guestAccess = (req, res, next) => {
    try {
        const token = req.cookies['aid'];
        jwt.verify(token, process.env.PRIVATE_KEY);
        res.redirect('/')
    } catch (err) {
        next();
    }
};

const checkLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies['aid'];
        jwt.verify(token, process.env.PRIVATE_KEY);
        req.isLoggedIn = true;
    } catch (err) {
        req.isLoggedIn = false;
    }
    next();
}

module.exports = {
    saveUser,
    verifyUser,
    authAccess,
    authAccessJSON,
    guestAccess,
    checkLoggedIn
};