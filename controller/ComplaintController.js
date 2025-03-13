const healthComplaints = require('../model/complaintModel');
const Workers = require('../model/workermodel');

exports.addComplaintsController = async (req, res) => {
  try {
    // Extract data from the request body
    const { title, description, type, workerId } = req.body;

    console.log(title, description, type, workerId);

    // Validate required fields
    if (!title || !description || !type || !workerId) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, type, and workerId are required fields.'
      });
    }

    // Validate the type against the enum values
    const validTypes = ['Health', 'Nutrition', 'Hygiene', 'Other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid complaint type. Valid types are: Health, Nutrition, Hygiene, Other.'
      });
    }

    // Check if the worker exists using the custom workerId
    const worker = await Workers.findOne({ workerId: workerId }); // Query by custom workerId
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found.'
      });
    }

    // Create a new complaint
    const newComplaint = new healthComplaints({
      title,
      description,
      type,
      workerId  // Use the custom workerId directly
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: 'Complaint added successfully.',
      data: savedComplaint
    });
  } catch (err) {
    console.error('Error adding complaint:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: err.message
    });
  }
};


exports.getallComplaintsController = async(req,res)=>{


    try {
        // Fetch all complaints from the database
        const complaints = await healthComplaints.find()
    
        // Send the response
        res.status(200).json({
          success: true,
          message: 'All complaints fetched successfully.',
          data: complaints
        });
      } catch (err) {
        console.error('Error fetching complaints:', err);
        res.status(500).json({
          success: false,
          message: 'Internal server error.',
          error: err.message
        });
      }

}


exports.getaComplaintController = async(req,res) =>{

    try {
        const { id } = req.params; // Extract complaint ID from request parameters
    
        // Find the complaint by ID
        const complaint = await healthComplaints.findById(id)
    
        // If complaint not found
        if (!complaint) {
          return res.status(404).json({
            success: false,
            message: 'Complaint not found.'
          });
        }
    
        // Send the response
        res.status(200).json({
          success: true,
          message: 'Complaint fetched successfully.',
          data: complaint
        });
      } catch (err) {
        console.error('Error fetching complaint:', err);
        res.status(500).json({
          success: false,
          message: 'Internal server error.',
          error: err.message
        });
      }

}

exports.updateComplaintController = async(req,res)=>{


    try {
    const { id } = req.params; // Extract complaint ID from request parameters
    const { status } = req.body; // Extract status from request body

    // Validate if status is provided
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required for update.'
      });
    }

    // Find the complaint by ID and update it
    const updatedComplaint = await healthComplaints.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    // If complaint not found
    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found.'
      });
    }

    // Send the response
    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully.',
      data: updatedComplaint
    });
  } catch (err) {
    console.error('Error updating complaint:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: err.message
    });
  }
}