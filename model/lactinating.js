const mongoose = require('mongoose');

const lactatingMotherSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianPhone: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  assignedWorkerId: {
    type: String,
    required: true,
  },
  lastCheckupDate: {
    type: Date,
  },
  currentStatus: {
    type: String,
    required: true,
  },
  lastDeliveryDate: {
    type: Date,
    required: true,
  },
  breastfeedingStatus: {
    type: String,
    enum: ['exclusive', 'partial', 'none'],
    required: true,
  },
  nutritionalSupport: {
    type: Boolean,
    default: false,
  },
  lactationSupportDetails: {
    type: String,
  },
  // Include child details as an array of subdocuments
  children: [
    {
      name: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      birthWeight: {
        type: Number,
        required: true,
      },
      breastfeedingStatus: {
        type: String,
        enum: ['exclusive', 'partial', 'none'],
        required: true,
      },
    },
  ],
});

const LactatingMothers = mongoose.model('LactatingMothers', lactatingMotherSchema);
module.exports = LactatingMothers;