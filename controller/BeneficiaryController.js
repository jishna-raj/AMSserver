const BeneNotifications = require('../model/beneNotificationModel');
const { sendBulkSMS } = require('../emailService');

exports.AddBeneNotification = async (req, res) => {
    try {
        const { notificationType, message, phoneNumbers } = req.body;
        
        if (!message || !Array.isArray(phoneNumbers)) {
            return res.status(400).json({ 
                success: false,
                error: 'Message and phoneNumbers are required' 
            });
        }

        if (phoneNumbers.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No valid phone numbers provided'
            });
        }

        const newNotification = new BeneNotifications({
            notificationType,
            message,
            phoneNumbers,
            ...(notificationType === 'predefined' && {
                predefinedTemplate: req.body.predefinedTemplate,
                placeholders: req.body.placeholders
            }),
            ...(notificationType === 'custom' && {
                customMessage: req.body.customMessage
            }),
            recipientGroups: req.body.recipientGroups,
            totalRecipients: phoneNumbers.length,
            sentAt: new Date()
        });

        // Save to database
        const savedNotification = await newNotification.save();
        
        // Send SMS via Twilio
        const smsResults = await sendBulkSMS(message, phoneNumbers);
        
        // Update with SMS results
        savedNotification.smsResults = smsResults;
        await savedNotification.save();

        res.status(201).json({
            success: true,
            data: savedNotification,
            message: 'Notification sent successfully'
        });

    } catch (error) {
        console.error('Error saving notification:', error);
        res.status(500).json({
            success: false,
            error: 'Server error',
            message: error.message
        });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await BeneNotifications.find().sort({ sentAt: -1 });
        res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};