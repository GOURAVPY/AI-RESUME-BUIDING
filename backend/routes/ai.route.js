import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../configs/multer.js"; // ✅ ADD THIS LINE
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controller/ai.controller.js";

const aiRoute = express.Router();

aiRoute.post(
  "/enhance/professional-summary",
  protect,
  enhanceProfessionalSummary
);

aiRoute.post(
  "/enhance/job-diescription",
  protect,
  enhanceJobDescription
);

aiRoute.post(
  "/enhance/uplode-resume",
  protect,
  upload.single("resume"), // ✅ now works
  uploadResume
);

export default aiRoute;