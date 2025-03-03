const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'worker'],
        required: true,
    },

    phoneNumber: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    workerId:{
        type:String,
    }
    
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
