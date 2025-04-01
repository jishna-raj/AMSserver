const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',  // Reference to your Child model
        required: [true, 'Child reference is required']
      },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true,
    maxlength: [200, 'Message cannot exceed 200 characters']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required'],
    index: true
  },
  // Explicit time fields for easier querying
  date: { 
    type: String,
    required: true
  },
  time: {  
    type: String,
    required: true
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// Indexes (including the one you specified)
notificationSchema.index({ scheduledDate: 1, status: 1 });
notificationSchema.index({ date: 1, time: 1 }); // For queries by date/time separately


const notifications = mongoose.model('Notifications', notificationSchema)

module.exports = notifications ;