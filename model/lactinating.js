const mongoose = require('mongoose');

const lactatingMotherSchema = new mongoose.Schema({
 id:{
  type:String,
  unique:true,
  required:true
},
  name: {
    type: String,
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
  },
  lastCheckupDate: {
    type: Date 
  },
  currentStatus: {
    type: String,
    required: true 
  },

  // Additional fields specific to Lactating Mothers
  lastDeliveryDate: {
    type: Date,
    required: true // Date of the last delivery
  },
  breastfeedingStatus: {
    type: String,
    enum: ['exclusive', 'partial', 'none'],
    required: true // Status of breastfeeding
  },
  nutritionalSupport: {
    type: Boolean,
    default: false // Whether the mother is receiving nutritional support
  },
  lactationSupportDetails: {
    type: String // Additional details about lactation support
  }
});

const LactatingMother = mongoose.model('LactatingMother', lactatingMotherSchema);
module.exports = LactatingMother;