const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        minlength: [5, 'Username should be at least 5 characters long.'],
        match: [/^[A-Za-z0-9]+$/, 'Username should consist only with English letters and digits.'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);