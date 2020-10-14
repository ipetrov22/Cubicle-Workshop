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

module.exports = { saveUser, verifyUser };