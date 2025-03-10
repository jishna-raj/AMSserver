const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['Worker', 'Health official', 'Admin'], // Restrict roles to specific values
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'], // E.164 format
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    workerId: {
        type: String,
        required: [true, 'Worker ID is required'],
        unique: true,
        trim: true,
    },
    joiningDate: {
        type: Date,
        required: [true, 'Joining date is required'],
        default: Date.now, // Automatically set to the current date if not provided
    },
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;