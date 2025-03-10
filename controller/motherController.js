const LactatingMothers = require('../model/lactinating')



exports.addMotherController = async (req, res) => {
    try {
        // Extract required fields from request body
        const {
            id,
            name,
            dateOfBirth,
            gender,
            address,
            guardianName,
            guardianPhone,
            bloodGroup,
            assignedWorkerId,
            lastDeliveryDate,
            breastfeedingStatus,
            nutritionalSupport,
            lactationSupportDetails
        } = req.body;

        // Validate required fields
        const requiredFields = [
            'id', 'name', 'dateOfBirth', 'gender', 'address',
            'guardianName', 'guardianPhone', 'bloodGroup',
            'assignedWorkerId', 'lastDeliveryDate', 'breastfeedingStatus'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate date formats explicitly
        const dobDate = new Date(dateOfBirth);
        const deliveryDate = new Date(lastDeliveryDate);

        if (isNaN(dobDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format for dateOfBirth'
            });
        }

        if (isNaN(deliveryDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format for lastDeliveryDate'
            });
        }

        // Check if mother already exists - use findOne instead of findById
        const existingMother = await LactatingMothers.findOne({ id });
        if (existingMother) {
            return res.status(409).json({
                success: false,
                message: 'Mother with this ID already exists'
            });
        }

        // Create new lactating mother document
        const newMother = new LactatingMothers({
            id,
            name,
            dateOfBirth: dobDate,
            gender,
            address,
            guardianName,
            guardianPhone,
            bloodGroup,
            assignedWorkerId,
            lastDeliveryDate: deliveryDate,
            breastfeedingStatus,
            nutritionalSupport: nutritionalSupport || false,
            lactationSupportDetails: lactationSupportDetails || '',
            registrationDate: new Date(), // Automatically set to the current date
            currentStatus: 'active' // Default status
        });

        // Validate document before saving
        const validationError = newMother.validateSync();
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationError.errors
            });
        }

        // Save to database
        const savedMother = await newMother.save();

        res.status(201).json({
            success: true,
            message: 'Lactating mother added successfully',
            data: savedMother
        });

    } catch (error) {
        console.error('Error adding lactating mother:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Duplicate entry detected - this record may already exist'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Handle invalid date format errors
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: `Invalid data format for field: ${error.path}`,
                details: error.message
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};



exports.getAllMotherController = async(req,res)=>{


try{
    const {id} = req.params;


    const child = await lactinat
}

}