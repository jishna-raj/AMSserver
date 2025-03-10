const childbeneficiaries = require('../model/ChildBeneficiaryModel')




exports.addChildBeneficiaryController = async (req, res) => {
    try {
      const { name, age, gender, dateOfBirth, parent, lastVisitDate, address, healthRecords, nutritionStatus, educationDetails, guardian, vaccinationDetails } = req.body;
  
      // Check if a child with the same name and date of birth already exists
      const existingChild = await childbeneficiaries.findOne({ name, dateOfBirth,parent });
      if (existingChild) {
        return res.status(409).json({
          success: false,
          message: 'Child already exists'
        });
      }
  
      // Create new child beneficiary
      const newChild = new childbeneficiaries({
        name,
        age: parseInt(age),
        gender,
        dateOfBirth,
        address,
        parent,
        healthRecords,
        nutritionStatus,
        educationDetails,
        guardian,
        lastVisitDate: lastVisitDate || null,
        vaccinationDetails: vaccinationDetails || []
      });
  
      // Save to database
      const savedChild = await newChild.save();
  
      res.status(201).json({
        success: true,
        message: 'Child beneficiary created successfully',
        data: savedChild
      });
  
    } catch (error) {
      // Handle specific error types
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: messages
        });
      }
  
      // Handle generic server errors
      console.error('Server Error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };







exports.getallchildbeneficiaryController = async (req,res) => {

    try {
        const beneficiaries = await childbeneficiaries.find(); // Fetch all beneficiaries
        res.status(200).json({
          success: true,
          data: beneficiaries,
        });
      } catch (error) {
        console.error('Error fetching child beneficiaries:', error);
        res.status(500).json({
          success: false,
          message: 'Server error while fetching child beneficiaries',
        });
      }
}



exports.getAchildBeneficiaryController = async(req,res) => {

    try {
        const { id } = req.params;
    
       
    
        // Find the child beneficiary
        const child = await childbeneficiaries.findById(id);
    
        if (!child) {
          return res.status(404).json({
            success: false,
            message: 'Child beneficiary not found'
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Child beneficiary retrieved successfully',
          data: child
        });
    
      } catch (error) {
        console.error('Error fetching child beneficiary:', error);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }
}



exports.updateChildbeneficiariesController = async(req,res)=>{
    try {
        const { id } = req.params;
        const updateData = req.body;
    

    
    
        // Update the child beneficiary
        const updatedChild = await childbeneficiaries.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
    
        if (!updatedChild) {
          return res.status(404).json({
            success: false,
            message: 'Child beneficiary not found'
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Child beneficiary updated successfully',
          data: updatedChild
        });
    
      } catch (error) {
        console.error('Error updating child beneficiary:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
          return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: error.message
          });
        }
    
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }
    
}


exports.deleteChildBeneficiaries = async (req,res) => {
    try {
        const { id } = req.params;
    
    
        // Find and delete the child beneficiary
        const deletedChild = await childbeneficiaries.findByIdAndDelete(id);
    
        if (!deletedChild) {
          return res.status(404).json({
            success: false,
            message: 'Child beneficiary not found'
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Child beneficiary deleted successfully',
          data: deletedChild
        });
    
      } catch (error) {
        console.error('Error deleting child beneficiary:', error);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }


}