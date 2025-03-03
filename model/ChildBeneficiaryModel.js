const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childBeneficiarySchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  parent: { 
    type: String,
    required: true 
  },
  healthRecords: [
    {
      date: { type: Date, required: true },
      weight: Number,
      height: Number,
      immunizations: [String],
      illnesses: [String]
    }
  ],
  nutritionStatus: {
    date: { type: Date, required: true },
    status: { type: String, enum: ['Normal', 'Underweight', 'Overweight'], required: true }
  },
  educationDetails: {
    preschoolName: {
      type: String,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
    },
    progress: {
      type: String,
      required: true,
    },
  },
  
  lastVisitDate: {
    type: Date,
    default: null, 
  },
  
  vaccinationDetails: [
    {
      vaccineName: { type: String, required: true }, 
      dateAdministered: { type: Date, required: true }, 
      administeredBy: { type: String, required: true },
      notes: { type: String }
    }
  ]
});

const childBeneficiary = mongoose.model('childBeneficiary', childBeneficiarySchema);

module.exports = childBeneficiary;