const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
       
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

    workerId:{
        type:String,
    },
    status:{
        type:String,
        
    }
    
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
