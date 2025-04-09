import express from "express";
const router = express.Router();
import {createJobApplication} from "../controllers/jobApplicationController.js";
router.post("/application", createJobApplication)

export default router;