const Workers = require('../model/workermodel');

exports.loginController = async (req, res) => {
    try {
        // Extract email and workerId from the request body
        const { email, workerId } = req.body;

        // Validate required fields
        if (!email || !workerId) {
            return res.status(400).json({
                success: false,
                message: 'Email and Worker ID are required for login.',
            });
        }

        // Find the worker by email and workerId
        const worker = await Workers.findOne({ email, workerId });

        console.log(worker);
        

        // If no worker is found, return an error
        if (!worker) {
            return res.status(404).json({
                success: false,
                message: 'Invalid credentials. Please check your email and Worker ID.',
            });
        }

        // If the worker is found, check their role
        if (worker.role !== 'Health official') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You are not authorized as a health official.',
            });
        }

        // If everything is valid, return a success response
        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            worker: {
                username: worker.username,
                email: worker.email,
                role: worker.role,
                workerId: worker.workerId,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);

        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login.',
            error: error.message,
        });
    }
};