const mongoose = require('mongoose');


const childBeneficiarySchema = new mongoose.Schema({
  
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
  parent: { type: String, required: true }, // Single string field
  healthRecords: [
    {
      date: { type: Date, required: true },
      weight: { type: Number, required: true },
      height: { type: Number, required: true },
      immunizations: [{ type: String }], // Array of strings
      illnesses: [{ type: String }], // Array of strings
    },
  ],
  nutritionStatus: {
    date: { type: Date, required: true },
    status: { type: String, required: true },
  },
  educationDetails: {
    preschoolName: { type: String, required: true },
    enrollmentDate: { type: Date, required: true },
    progress: { type: String, required: true }, // Changed from progressReport
  },
  guardian: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    contactNumber: { type: String, required: true }, // Changed from contact
    email: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
  },
  lastVisitDate: { type: Date, required: true }, // Changed from lastVisit.date
  vaccinationDetails: [
    {
      vaccineName: { type: String, required: true },
      dateAdministered: { type: Date, required: true },
      administeredBy: { type: String, required: true },
      notes: { type: String },
    },
  ],
});


const ChildBeneficiary = mongoose.model('ChildBeneficiary', childBeneficiarySchema);

module.exports = ChildBeneficiary;