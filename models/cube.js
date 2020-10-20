const mongoose = require('mongoose');
const urlValidator = require('../utils/urlValidator');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [5, 'Name should be at least 5 characters long.'],
        match: [/^[A-Za-z0-9 ]+$/, 'Name should consist only with English letters, digits and whitespaces.'],
        required: true
    },
    description: {
        type: String,
        minlength: [20, 'Description should be at least 20 characters long.'],
        match: [/^[A-Za-z0-9 ]+$/, 'Description should consist only with English letters, digits and whitespaces.'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }],
    creatorId: {
        type: 'ObjectId',
        ref: 'User',
        required: true
    }
});

CubeSchema.path('imageUrl').validate(urlValidator, 'Image URL is invalid!');

module.exports = mongoose.model('Cube', CubeSchema);