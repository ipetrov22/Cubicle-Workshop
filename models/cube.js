const mongoose = require('mongoose');
const urlValidator = require('../utils/urlValidator');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
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