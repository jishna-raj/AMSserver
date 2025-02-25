const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    childname: {
        type: String,
        required: true,
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
