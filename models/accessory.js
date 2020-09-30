const mongoose = require('mongoose');

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

module.exports = mongoose.model('Accessory', AccessorySchema);