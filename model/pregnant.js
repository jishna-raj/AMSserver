const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pregnantBeneficiarySchema = new Schema({
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
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
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
  }, // Foreign Key to link with a worker
  lastCheckupDate: { 
    type: Date 
  },
  currentStatus: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Completed'], 
    required: true 
  },
  healthRecords: [
    {
      date: { type: Date, required: true },
      weight: { type: Number, required: true },
      bloodPressure: { 
        systolic: { type: Number, required: true },
        diastolic: { type: Number, required: true }
      },
      fetalHeartRate: { type: Number, required: true },
      notes: { type: String }
    }
  ],
  vaccinationDetails: [
    {
      vaccineName: { type: String, required: true }, // Name of the vaccine (e.g., Tetanus, Influenza)
      dateAdministered: { type: Date, required: true },
      administeredBy: { type: String, required: true }, // Name of the healthcare provider
      notes: { type: String } // Additional notes about the vaccination
    }
  ],
  nutritionStatus: {
    date: { type: Date, required: true },
    status: { type: String, enum: ['Normal', 'Underweight', 'Overweight'], required: true }
  },
  lastVisitDate: { 
    type: Date, 
    default: null 
  }
});

const PregnantBeneficiary = mongoose.model('PregnantBeneficiary', pregnantBeneficiarySchema);

module.exports = PregnantBeneficiary;