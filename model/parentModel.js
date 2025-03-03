const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    child_id: {
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
    }

});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
