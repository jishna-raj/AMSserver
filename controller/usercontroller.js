const Users = require('../model/userModel');


exports.registerAdminController = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check for existing user
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        } else {
            const newAdmin = new Users({
                username,
                email,
                password, // Still in plain text (not recommended)
                role: "admin",
                phoneNumber: "", // Add empty values for optional fields
                address: "",
                workerId: "" // Empty for admin
            });

            await newAdmin.save();

            // For success response (status 201 is more appropriate for creation)
            res.status(201).json({
                message: "Admin registered successfully",
                user: newAdmin
            });
        }





        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Worker Registration
exports.registerWorkerController = async (req, res) => {
    console.log("inside worker");
    
    const { username, email, password, workerId } = req.body;
  
    try {
      // 1. Check for existing user first
      const existingUser = await Users.findOne( {workerId});
  
      if (existingUser) {
         res.status(400).json({ // Add RETURN here
          message: "Username, email, or worker ID already exists"
        });
      }
  
      // 2. Create new user
      const newWorker = new Users({
        username,
        email,
        password,
        role: "worker",
        workerId,
        phoneNumber: "",
        address: ""
      });
  
      // 3. Save to database
      await newWorker.save();
  
      // 4. Send single response
      res.status(201).json({
        message: "Worker registered successfully",
        user: newWorker
      });
  
    } catch (error) {
    
      console.error("Registration error:", error);
    }
  };