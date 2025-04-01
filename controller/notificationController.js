const notifications = require('../model/notification');
const Child = require('../model/child'); // Renamed for clarity

exports.addnotificationController = async (req, res) => {
    try {
        const { child, message, date, time } = req.body;

        // Validation
        if (!child || !message || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'Child reference, message, date, and time are required fields.'
            });
        }

        // Validate child exists
        const existingChild = await Child.findById(child);
        if (!existingChild) {
            return res.status(404).json({
                success: false,
                message: 'Child not found'
            });
        }

        // Date validation
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Use YYYY-MM-DD.'
            });
        }

        // Time validation
        if (!/^\d{2}:\d{2}$/.test(time)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid time format. Use HH:MM.'
            });
        }

        // Create Date object
        const scheduledDate = new Date(`${date}T${time}:00.000Z`);

        // Past date check
        if (scheduledDate < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot schedule notifications in the past.'
            });
        }

        // Create and save notification
        const newNotification = new notifications({
            child,
            message,
            scheduledDate,
            date,
            time
        });

        const savedNotification = await newNotification.save();

        // Populate child details in response
        await savedNotification.populate({
            path: 'child',
            select: 'name age id' // Include specific child fields
        });

        res.status(201).json({
            success: true,
            message: 'Notification scheduled successfully',
            data: savedNotification
        });

    } catch (err) {
        console.error('Error adding notification:', err);
        
        // Handle duplicate key errors
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate notification detected.'
            });
        }

        // Handle invalid ObjectId format
        if (err.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid child ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
};


exports.getChildnotificationController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        

    
        // Check if the child exists (optional but recommended)
        const child = await Child.findById(id);
        if (!child) {
            return res.status(404).json({
                success: false,
                error: 'Child not found'
            });
        }

        // Fetch notifications associated with the child ID
        const childNotifications = await notifications.find({ child: id })
            .sort({ scheduledDate: -1 }); // Sort by latest first

        res.status(200).json({
            success: true,
            message: 'Notifications retrieved successfully',
            data: childNotifications
        });

    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};