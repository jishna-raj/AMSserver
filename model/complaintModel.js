

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthComplaintSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Complaint title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Complaint description is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Complaint type is required'],
    enum: ['Health', 'Nutrition', 'Hygiene', 'Other'],
    default: 'Health'
  },
  workerId: {  // Custom workerId (not ObjectId)
    type: String,  // or Number, depending on your workerId format
    required: [true, 'Worker ID is required']
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'], // Possible status values
    default: 'Pending' // Default status when a complaint is created
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to the current date and time
  }
});

// Export the model

const healthComplaints = mongoose.model('healthComplaints', healthComplaintSchema);
module.exports = healthComplaints