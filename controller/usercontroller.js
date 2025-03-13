const Users = require('../model/userModel');
const jwt = require('jsonwebtoken')


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
        status:"Active",
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
    const existingUser = await Users.findOne({ workerId });

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
      address: "",
      status:"Active"
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


// Admin Login Controller
exports.loginAdminController = async (req, res) => {

  console.log('inside cntroller');

  const { email, password } = req.body;

  console.log(email, password);


  try {
    const adminUser = await Users.findOne({
      email, password,
      role: 'admin'
    });

    if (adminUser) {



      const token = jwt.sign({ userId: adminUser._id }, 'superkey');
      res.status(200).json({
        adminUser,
        token
      });


    } else {
      res.status(406).json("account doesnot exist")
    }



  } catch (error) {
    res.status(401).json({ message: 'Server error', error });
  }
};



// Worker Login Controller
exports.loginWorkerController = async (req, res) => {
  const { email, password, workerId } = req.body;

  try {
    const workerUser = await Users.findOne({
      email,
      password,
      workerId,
      role: 'worker'
    });

    if (workerUser) {
      const token = jwt.sign({ userId: workerUser._id }, 'superkey');
      res.status(200).json({
        workerUser,
        token
      });
    }else{

      res.status(406).json("account doesnot exist")

    }



  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.getalluserController = async(req,res) => {

  try {
    const users = await Users.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error in getalluserController:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }

}


exports.deleteUserController = async(req,res) =>{



  try {
    const { id } = req.params;
    console.log(id);
    

   

    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }

}

exports.updateusercontroller = async(req,res)=>{


  try {
    const { id } = req.params; // Extract the user ID from the URL
    const updatedData = req.body; // Extract the updated data from the request body

   

    // Validate the updated data (optional)
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    // Update the user in the database
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send a success response with the updated data
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateusercontroller:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
}