const parents = require('../model/parentModel')

const jwt = require('jsonwebtoken')


exports.ParentRegController = async (req, res) => {
    try {
        // Extract data from the request body
        const { child_id, username, password, email, childname } = req.body;

        // Check if the email is already registered
        const existingParent = await parents.findOne({ email });
        if (existingParent) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Create a new Parent document
        const newParent = new parents({
            child_id,
            username,
            password, // In a real-world scenario, you should hash the password before saving
            email,
            childname,
        });

        // Save the new parent to the database
        await newParent.save();

        // Respond with success message
        res.status(201).json({ message: 'Parent registered successfully', parent: newParent });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error registering parent:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.ParentLoginController = async(req,res)=>{


    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the parent by email
        const parent = await parents.findOne({ email });
        if (!parent) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password (in a real-world scenario, compare hashed passwords)
        if (parent.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: parent._id }, 'superkey');

        // Respond with the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


}