const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
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
  parent: { type: Schema.Types.ObjectId, ref: 'Parent', required: true },
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
    preschoolName: String,
    enrollmentDate: Date,
    progress: String
  }
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
