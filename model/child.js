const mongoose = require('mongoose');


const childSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  parentDetails: {
    parentName: {
      type: String,
      required: true,
    },
    parentContact: {
      type: String,
      required: true,
    },
    parentEmail: {
      type: String,
      required: true,
    },
    parentOccupation: {
      type: String,
      required: true,
    },
  },
  siblings: [
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
    },
  ],
  healthRecords: [
    {
      date: {
        type: Date,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      immunizations: {
        type: [String],
        required: true,
      },
      illnesses: {
        type: [String],
        required: true,
      },
    },
  ],
  medicalHistory: {
    chronicConditions: {
      type: [String],
      required: true,
    },
    surgeries: {
      type: [String],
      required: true,
    },
  },
  allergies: {
    type: [String],
    required: true,
  },
  dietaryPreferences: {
    vegetarian: {
      type: Boolean,
      required: true,
    },
    lactoseIntolerant: {
      type: Boolean,
      required: true,
    },
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  nutritionStatus: {
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Normal', 'Underweight', 'Overweight'],
    },
  },
 
});

// Create the Child model
const Child = mongoose.model('Child', childSchema);

module.exports = Child;