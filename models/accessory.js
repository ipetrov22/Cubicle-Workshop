const mongoose = require('mongoose');
const urlValidator = require('../utils/urlValidator');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
});

AccessorySchema.path('imageUrl').validate(urlValidator, 'Image URL is invalid!');

module.exports = mongoose.model('Accessory', AccessorySchema);