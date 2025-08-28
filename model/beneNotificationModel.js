const mongoose = require('mongoose');

const BeneNotificationSchema = new mongoose.Schema({
    notificationType: {
        type: String,
        enum: ['predefined', 'custom'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    phoneNumbers: [{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'At least one phone number is required'
        }
    }],
    predefinedTemplate: {
        type: String,
        default: ''
    },
    customMessage: {
        type: String,
        default: ''
    },
    placeholders: {
        type: Map,
        of: String,
        default: {}
    },
    recipientGroups: {
        mothers: { type: Boolean, default: false },
        pregnant: { type: Boolean, default: false },
        children: { type: Boolean, default: false }
    },
    totalRecipients: {
        type: Number,
        required: true,
        min: 1
    },
    smsResults: [{
        phoneNumber: String,
        status: String,
        error: String,
        sid: String
    }],
    sentAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const BeneNotifications = mongoose.model('BeneNotifications', BeneNotificationSchema);

module.exports = BeneNotifications;