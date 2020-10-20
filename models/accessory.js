const mongoose = require('mongoose');
const urlValidator = require('../utils/urlValidator');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [5, 'Name should be at least 5 characters long.'],
        match: [/^[A-Za-z0-9 ]+$/, 'Name should consist only with English letters, digits and whitespaces.'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: [20, 'Description should be at least 20 characters long.'],
        match: [/^[A-Za-z0-9 ]+$/, 'Description should consist only with English letters, digits and whitespaces.'],
        required: true
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
});

AccessorySchema.path('imageUrl').validate(urlValidator, 'Image URL is invalid!');

module.exports = mongoose.model('Accessory', AccessorySchema);