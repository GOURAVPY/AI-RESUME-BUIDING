import { response } from "express";
import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// POST: /api/resume/create
export const createResume = async (req, res) => {
  try {
    // 🔐 from protect middleware
    const userId = req.user._id;

    // 📦 from frontend
    const { title } = req.body;

    // 🆕 create resume
    const newResume = await Resume.create({
      userId,
      title,
    });

    // ✅ response
    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error("Create Resume Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE: /api/resume/:id
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    const deleted = await Resume.findByIdAndDelete(resumeId);

    if (!deleted) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      message: "Resume deleted successfully",
    });

  } catch (error) {
    console.log("DELETE ERROR:", error); // 👈 VERY IMPORTANT
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET: /api/resume/:id
export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // 🔍 find resume
    const resume = await Resume.findById(resumeId).select(
      "-__v -createdAt -updatedAt",
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✅ success
    res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error("Get Resume Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // 🔍 find only public resume
    const resume = await Resume.findOne({
      _id: resumeId,
      public: true,
    }).select("-__v");

    // ❌ not found or not public
    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or not public",
      });
    }

    // ✅ success
    res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error("Public Resume Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const { resumeId, resumeData, removebackground } = req.body;
    const image = req.file;

    console.log("removebackground:", removebackground);
    console.log("file:", image);

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID missing" });
    }

    let resumeDataCopy;
    try {
      resumeDataCopy = JSON.parse(resumeData);
    } catch (err) {
      return res.status(400).json({ message: "Invalid resumeData JSON" });
    }

    // ✅ convert to boolean
    const shouldRemoveBg = removebackground === "yes";

    if (image) {
      const fileBuffer = fs.readFileSync(image.path);

      // ✅ convert to base64 (IMPORTANT)
      const base64File = fileBuffer.toString("base64");

      const response = await imagekit.files.upload({
        file: base64File,
        fileName: `resume_${Date.now()}.jpg`,
        folder: "user_resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (shouldRemoveBg ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info =
        resumeDataCopy.personal_info || {};

      resumeDataCopy.personal_info.image = response.url;

      // ✅ cleanup
      fs.unlinkSync(image.path);
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      resumeDataCopy,
      { returnDocument: "after" }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume saved successfully",
      updatedResume,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};