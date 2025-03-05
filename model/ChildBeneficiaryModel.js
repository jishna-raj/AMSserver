const mongoose = require('mongoose');


const childBeneficiarySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  parent: { type: String, required: true }, // New field for parent's name
  healthRecords: [
    {
      date: { type: Date, required: true },
      weight: { type: Number, required: true },
      height: { type: Number, required: true },
      immunizations: [{ type: String }],
      illnesses: [{ type: String }],
    },
  ],
  nutritionStatus: {
    date: { type: Date, required: true },
    status: { type: String, required: true },
  },
  educationDetails: {
    preschoolName: { type: String, required: true },
    enrollmentDate: { type: Date, required: true },
    progress: { type: String, required: true },
  },
  guardian: {
    name: { type: String, required: true },
    relationship: { type: String, required: true }, // e.g., "Father", "Mother", "Guardian"
    contactNumber: { type: String, required: true },
    email: { type: String }, // Optional
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
  },
  lastVisitDate: { type: Date }, // New field for last visit date
  vaccinationDetails: [ // New field for vaccination details
    {
      vaccineName: { type: String },
      dateAdministered: { type: Date },
      administeredBy: { type: String },
      notes: { type: String },
    },
  ],
});

// Create the Child Beneficiary Model
const ChildBeneficiary = mongoose.model('ChildBeneficiary', childBeneficiarySchema);

module.exports = ChildBeneficiary;