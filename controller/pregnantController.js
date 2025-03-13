const PregnantBeneficiary = require('../model/pregnant')

exports.addPregnantController = async (req, res) => {


    try {
        const {
            name,
            dateOfBirth,
            gender,
            address,
            guardianName,
            guardianPhone,
            bloodGroup,
            assignedWorkerId,
            lastCheckupDate,
            currentStatus,
            healthRecords,
            vaccinationDetails,
            nutritionStatus,
            lastVisitDate,
        } = req.body;

        const documentPath = req.file.filename; // Path of the uploaded file

        // Parse nested objects and arrays
        const parsedAddress = JSON.parse(address);
        const parsedHealthRecords = JSON.parse(healthRecords);
        const parsedVaccinationDetails = JSON.parse(vaccinationDetails);
        const parsedNutritionStatus = JSON.parse(nutritionStatus);

        const newBeneficiary = new PregnantBeneficiary({
            name,
            dateOfBirth,
            gender,
            address: parsedAddress,
            guardianName,
            guardianPhone,
            bloodGroup,
            assignedWorkerId,
            lastCheckupDate,
            currentStatus,
            healthRecords: parsedHealthRecords,
            vaccinationDetails: parsedVaccinationDetails,
            nutritionStatus: parsedNutritionStatus,
            lastVisitDate,
            document: documentPath,
        });

        await newBeneficiary.save();
        res.status(200).json({ message: 'Pregnant beneficiary added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.getallpregnantController = async (req, res) => {


    try {
        // Fetch all pregnant beneficiaries from the database
        const allPregnantBeneficiaries = await PregnantBeneficiary.find();

        // If no beneficiaries are found, return a 404 response
        if (!allPregnantBeneficiaries || allPregnantBeneficiaries.length === 0) {
            return res.status(404).json({ message: 'No pregnant beneficiaries found' });
        }

        // Return the list of beneficiaries as a response
        res.status(200).json({
            success: true,
            message: 'Pregnant beneficiaries fetched successfully',
            data: allPregnantBeneficiaries,
        });
    } catch (error) {
        console.error('Error fetching pregnant beneficiaries:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching pregnant beneficiaries',
            error: error.message,
        });
    }


}

exports.getApregnantController = async (req, res) => {

    try {
        // Extract the beneficiary ID from the request parameters
        const { id } = req.params;



        // Fetch the beneficiary from the database
        const beneficiary = await PregnantBeneficiary.findById(id);

        // Check if the beneficiary exists
        if (!beneficiary) {
            return res.status(404).json({
                success: false,
                message: "Beneficiary not found"
            });
        }

        // Return the beneficiary data
        res.status(200).json({
            success: true,
            message: "Beneficiary data retrieved successfully",
            data: beneficiary
        });

    } catch (error) {
        // Handle any errors
        console.error("Error in getApregnantController:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching beneficiary data",
            error: error.message
        });
    }


}


exports.updatepregnantController = async(req,res)=>{



    try {
        const { id } = req.params; // Extract the beneficiary ID from the URL
        const updatedData = req.body; // Extract the updated data from the request body
    
        
    
        // Validate the updated data (optional)
        if (!updatedData || Object.keys(updatedData).length === 0) {
          return res.status(400).json({
            success: false,
            message: "No data provided for update",
          });
        }
    
        // Update the beneficiary in the database
        const updatedBeneficiary = await PregnantBeneficiary.findByIdAndUpdate(
          id,
          updatedData,
          { new: true, runValidators: true } // Return the updated document and run schema validators
        );
    
        // Check if the beneficiary was found and updated
        if (!updatedBeneficiary) {
          return res.status(404).json({
            success: false,
            message: "Beneficiary not found",
          });
        }
    
        // Send a success response with the updated data
        res.status(200).json({
          success: true,
          message: "Beneficiary updated successfully",
          data: updatedBeneficiary,
        });
      } catch (error) {
        console.error("Error in updatepregnantController:", error);
    
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
          message: "An error occurred while updating the beneficiary",
          error: error.message,
        });
      }


}


exports.deletepregnantController = async(req,res)=>{


    try {
        const { id } = req.params; // Extract the beneficiary ID from the URL
    
    
        // Find and delete the beneficiary by ID
        const deletedBeneficiary = await PregnantBeneficiary.findByIdAndDelete(id);
    
        // Check if the beneficiary was found and deleted
        if (!deletedBeneficiary) {
          return res.status(404).json({
            success: false,
            message: "Beneficiary not found",
          });
        }
    
        // Send a success response
        res.status(200).json({
          success: true,
          message: "Beneficiary deleted successfully",
          data: deletedBeneficiary,
        });
      } catch (error) {
        console.error("Error in deletepregnantController:", error);
    
        // Handle errors
        res.status(500).json({
          success: false,
          message: "An error occurred while deleting the beneficiary",
          error: error.message,
        });
      }

}