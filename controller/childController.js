const Children = require('../model/child'); 


exports.addChildController = async (req, res) => {
  try {
   
    const {
      id,
      name,
      age,
      gender,
      dateOfBirth,
      address,
      parentDetails,
      siblings,
      healthRecords,
      medicalHistory,
      allergies,
      dietaryPreferences,
      emergencyContact,
      nutritionStatus,
    } = req.body;

    const childImage = req.file.filename

    // Check if a child with the same ID already exists
    const existingChild = await Children.findOne({ id });
    if (existingChild) {
      return res.status(406).json({ message: 'Child with this ID already exists' });
    }

    // Create a new child document
    const newChild = new Children({
       id,
      name,
      age,
      gender,
      dateOfBirth,
      childImage,
      address: JSON.parse(address), // Parse nested objects
      parentDetails: JSON.parse(parentDetails),
      siblings: JSON.parse(siblings),
      healthRecords: JSON.parse(healthRecords),
      medicalHistory: JSON.parse(medicalHistory),
      allergies: JSON.parse(allergies),
      dietaryPreferences: JSON.parse(dietaryPreferences),
      emergencyContact: JSON.parse(emergencyContact),
      nutritionStatus: JSON.parse(nutritionStatus),
    });

    
    await newChild.save();
    

    // Return success response
    res.status(200).json({ message: 'Child added successfully', child: newChild });
  } catch (error) {
    console.error('Error adding child:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




exports.getAllChildController = async (req, res) => {
  try {
    // Fetch all children from the database
    const children = await Children
    .find({});

    // If no children are found, return a 404 response
    if (!children || children.length === 0) {
      return res.status(404).json({ message: 'No children found' });
    }

    // Return the list of children as a response
    res.status(200).json({ message: 'Children fetched successfully', children });
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


/* get a child */


// controllers/childController.js

exports.getChildByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Get the child ID from the URL
    
    console.log(id);
    

    // Find the child by ID
    const child = await Children.findOne({ id });

    console.log(child);
    

    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Return the child details
    res.status(200).json({ message: 'Child fetched successfully', child });
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



/* update a child */


exports.updateChildController = async (req, res) => {
    const { id } = req.params;
  
    // Destructure fields from the request body
    const {
      name,
      age,
      gender,
      dateOfBirth,
      address,
      parentDetails,
      siblings,
      healthRecords,
      medicalHistory,
      allergies,
      dietaryPreferences,
      emergencyContact,
      nutritionStatus,
      // Remove childImage
    } = req.body;
  
    try {
      // Update the child in the database
      const updatedChild = await Children.findOneAndUpdate(
        { id: id },
        {
          name,
          age,
          gender,
          dateOfBirth,
          address: JSON.parse(address),
          parentDetails: JSON.parse(parentDetails),
          siblings: JSON.parse(siblings),
          healthRecords: JSON.parse(healthRecords),
          medicalHistory: JSON.parse(medicalHistory),
          allergies: JSON.parse(allergies),
          dietaryPreferences: JSON.parse(dietaryPreferences),
          emergencyContact: JSON.parse(emergencyContact),
          nutritionStatus: JSON.parse(nutritionStatus),
          // Remove childImage
        },
        { new: true }
      );
  
      if (!updatedChild) {
        return res.status(404).json({ message: 'Child not found' });
      }
  
      res.status(200).json({ message: 'Child updated successfully', child: updatedChild });
    } catch (error) {
      console.error('Error updating child:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  /* delete */


  exports.deleteChildController = async (req, res) => {
    const { id } = req.params; // Get the child ID from the URL
  
    try {
      // Find and delete the child by ID
      const deletedChild = await Children.findOneAndDelete({ id: id });
  
      if (!deletedChild) {
        return res.status(404).json({ message: 'Child not found' });
      }
  
      res.status(200).json({ message: 'Child deleted successfully', child: deletedChild });
    } catch (error) {
      console.error('Error deleting child:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };