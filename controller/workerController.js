const Workers = require('../model/workermodel'); // Adjust the path to your Worker model

exports.addworkerController = async (req, res) => {
    try {
        // Extract worker details from the request body
        const { username, email, role, phone, address, workerId } = req.body;

        // Validate required fields
        if (!username || !email || !role || !phone || !address || !workerId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields. Please provide username, email, role, phone, address, and workerId.',
            });
        }

        // Check if a worker with the same email or workerId already exists
        const existingWorker = await Workers.findOne({
            $or: [{ email }, { workerId }],
        });

        if (existingWorker) {
            return res.status(400).json({
                success: false,
                message: 'Worker with the same email or workerId already exists.',
            });
        }

        // Create a new worker document
        const newWorker = new Workers({
            username,
            email,
            role,
            phone,
            address,
            workerId,
            joiningDate: new Date(),
        });

        // Save the worker to the database
        const savedWorker = await newWorker.save();

        // Return a success response with the saved worker details
        return res.status(201).json({
            success: true,
            message: 'Worker added successfully.',
            worker: savedWorker,
        });
    } catch (error) {
        console.error('Error adding worker:', error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error. Please check the provided data.',
                error: error.message,
            });
        }

        // Handle duplicate key errors (e.g., duplicate email or workerId)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate key error. Worker with the same email or workerId already exists.',
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the worker.',
            error: error.message,
        });
    }
};




exports.allWorkerController = async (req, res) => {
    try {
        // Fetch all workers from the database
        const workers = await Workers.find({});

        console.log(workers);


        // If no workers are found, return a 404 response
        if (!workers || workers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No workers found.',
            });
        }

        // Return a success response with the list of workers
        return res.status(200).json({
            success: true,
            message: 'Workers fetched successfully.',
            workers,
        });
    } catch (error) {
        console.error('Error fetching workers:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching workers.',
            error: error.message,
        });
    }
};



exports.getAWorkerApi = async (req, res) => {

    console.log("inside worker controller");
    
    const { id } = req.params;

    console.log(`id is: ${id}`);
    

    try {
        const worker = await Workers.findById(id);
        
        console.log(worker);
        // Use "Worker" model (not "Workers")
        if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });
        
        res.status(200).json({ success: true, data: worker });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateWorkerController = async(req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        // Find the worker by id and update their details
        const updatedWorker = await Workers.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Run model validators on the update data
        });

        if (!updatedWorker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Worker updated successfully',
            data: updatedWorker,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating worker',
            error: error.message,
        });
    }



} 




exports.workerDeleteController = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the worker
        const deletedWorker = await Workers.findByIdAndDelete(id);

        if (!deletedWorker) {
            return res.status(404).json({
                success: false,
                message: 'Worker not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Worker deleted successfully',
            data: deletedWorker
        });

    } catch (error) {
        console.error('Error deleting worker:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting worker',
            error: error.message
        });
    }
};