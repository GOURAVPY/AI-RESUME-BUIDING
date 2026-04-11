import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
    },

    public: {
      type: Boolean,
      default: false,
    },

    // 👤 Personal Info
    personal_info: {
      full_name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
      profession: { type: String, default: "" },
      image: { type: String, default: "" },
    },

    // 📝 Summary
    professional_summary: {
      type: String,
      default: "",
    },

    // 🛠 Skills
    skills: [
      {
        type: String,
      },
    ],

    // 💼 Experience
    experience: [
      {
        company: String,
        position: String,
        start_date: String,
        end_date: String,
        description: [String],
        is_current: Boolean,
      },
    ],

    // 🎓 Education
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        graduation_date: String,
        gpa: String,
      },
    ],

    // 🚀 project (🔥 FIX HERE)
    project: {
      type: [
        {
          name: { type: String, default: "" },
          type: { type: String, default: "" },
          description: { type: String, default: "" },
        },
      ],
      default: [],
    },

    // 🎨 UI Settings
    template: {
      type: String,
      default: "classic",
    },

    accent_color: {
      type: String,
      default: "#3b82f6",
    },
  },
  { timestamps: true, minimize: false }
);

// 🔥 IMPORTANT: avoid old schema cache issue
delete mongoose.models.Resume;

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;