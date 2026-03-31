import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.routes.js";
import aiRoute from "./routes/ai.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/user", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
