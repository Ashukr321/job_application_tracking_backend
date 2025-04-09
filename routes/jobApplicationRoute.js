import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/authMiddleware.js";
import {
  createJobApplication,
  getAllJobApplications,
  updateJobApplication,
  deleteJobApplication
} from "../controllers/jobApplicationController.js";

// All routes are protected with authentication
router.post("/application", authenticateUser, createJobApplication);
router.get("/applications", authenticateUser, getAllJobApplications);
router.put("/application/:id", authenticateUser, updateJobApplication);
router.delete("/application/:id", authenticateUser, deleteJobApplication);

export default router;