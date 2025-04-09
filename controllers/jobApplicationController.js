import JobApplication from '../models/JobApplicationModel.js';

 const createJobApplication = async (req, res) => {
  try {
    const { company, role, status, dateOfApplication, link } = req.body;

    // Validate required fields
    if (!company || !role || !status || !dateOfApplication) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: company, role, status, and dateOfApplication"
      });
    }

    // Validate status enum
    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: Applied, Interview, Offer, Rejected"
      });
    }

    // Create new job application
    const newJobApplication = await JobApplication.create({
      company,
      role,
      status,
      dateOfApplication: new Date(dateOfApplication),
      link
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Job application created successfully",
      data: newJobApplication
    });

  } catch (error) {
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

 const getAllJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .sort({ dateOfApplication: -1 }); // Sort by date, newest first

    return res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching job applications",
      error: error.message
    });
  }
};

const updateJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate status if it's being updated
    if (updateData.status) {
      const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
      if (!validStatuses.includes(updateData.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be one of: Applied, Interview, Offer, Rejected"
        });
      }
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Job application not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job application updated successfully",
      data: updatedApplication
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error updating job application",
      error: error.message
    });
  }
};

const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedApplication = await JobApplication.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Job application not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job application deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting job application",
      error: error.message
    });
  }
};
export { createJobApplication, getAllJobApplications, updateJobApplication, deleteJobApplication };