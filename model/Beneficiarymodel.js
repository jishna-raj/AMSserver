const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    name: {
         type: String,
          required: true
         },
    type: {
         type: String, enum: ['child', 'pregnantWoman', 'lactatingMother'],
          required: true 
        },
    dateOfBirth: { 
        type: Date,
         required: true 
        },
    gender: {
         type: String,
          required: true 
        },
    address: {
         type: String,
          required: true 
        },
    guardianName: {
         type: String,
          required: true 
        },
    guardianPhone: {
         type: String,
          required: true
         },
    bloodGroup: {
         type: String,
          required: true 
        },
    
    registrationDate: {
         type: Date,
          default: Date.now 
        },
    assignedWorkerId: {
         type: String,
          required: true 
        }, // FK
    lastCheckupDate: {
        type: Date 
    },
    currentStatus: {
         type: String,
          required: true 
        }
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);
module.exports = Beneficiary;