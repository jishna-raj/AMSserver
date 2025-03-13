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
            lactationSupportDetails,
            children // Add children field
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

        // Validate child details if provided
        if (children && Array.isArray(children)) {
            for (const child of children) {
                const childDOB = new Date(child.dateOfBirth);
                if (isNaN(childDOB.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid date format for child's dateOfBirth: ${child.name}`
                    });
                }
            }
        }

        // Check if mother already exists
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
            currentStatus: 'active', // Default status
            children: children || [] // Include child details if provided
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





exports.getAllMotherController = async (req, res) => {
    try {
       

      
        const mothers = await LactatingMothers.find();

        res.status(200).json({
            success: true,
            message: 'All mothers fetched successfully',
            data: mothers,
        });

    } catch (error) {
        console.error('Error fetching mothers:', error);

        // Handle invalid ID format errors
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format',
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};



exports.getAMotherController = async (req,res) => {

    try {
        const { id } = req.params; 
        console.log(id);
        

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Mother ID is required',
            });
        }

        // Fetch the mother from the database
        const mother = await LactatingMothers.findOne({ id });

        // If mother not found, return a 404 error
        if (!mother) {
            return res.status(404).json({
                success: false,
                message: 'Mother not found',
            });
        }

        // Return the mother's details
        res.status(200).json({
            success: true,
            message: 'Mother fetched successfully',
            data: mother,
        });

    } catch (error) {
        console.error('Error fetching mother:', error);

        // Handle invalid ID format errors
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format',
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }

}


exports.updatemothercontroller = async(req,res)=>{



    try {
        const { id } = req.params; // Extract the mother's ID from the request parameters
        const updateData = req.body; // Extract the updated data from the request body

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Mother ID is required',
            });
        }

        // Validate the update data
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No data provided for update',
            });
        }

        // Find the mother by ID and update her details
        const updatedMother = await LactatingMothers.findOneAndUpdate(
            { id }, // Find the mother by ID
            updateData, // Update with the provided data
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        // If mother not found, return a 404 error
        if (!updatedMother) {
            return res.status(404).json({
                success: false,
                message: 'Mother not found',
            });
        }

        // Return the updated mother's details
        res.status(200).json({
            success: true,
            message: 'Mother updated successfully',
            data: updatedMother,
        });

    } catch (error) {
        console.error('Error updating mother:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors,
            });
        }

        // Handle invalid ID format errors
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format',
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }

}



exports.deleteMotherController = async(req,res) => {

    try {
        const { id } = req.params; // Extract the mother's ID from the request parameters

        // Validate the ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Mother ID is required',
            });
        }

        // Find and delete the mother by ID
        const deletedMother = await LactatingMothers.findOneAndDelete({ id });

        // If mother not found, return a 404 error
        if (!deletedMother) {
            return res.status(404).json({
                success: false,
                message: 'Mother not found',
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Mother deleted successfully',
            data: deletedMother,
        });

    } catch (error) {
        console.error('Error deleting mother:', error);

        // Handle invalid ID format errors
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format',
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }



}