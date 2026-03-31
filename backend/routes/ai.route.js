import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controller/ai.controller.js";

const aiRoute = express.Router();

aiRoute.post(
  "/enhance/professional-summary",
  protect,
  enhanceProfessionalSummary,
);
aiRoute.post("/enhance/job-jescription", protect, enhanceJobDescription);
aiRoute.post("/enhance/uplode-resume", protect, uploadResume);

export default aiRoute;
