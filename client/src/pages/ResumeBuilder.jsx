import React, { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileDown,
  Share2,
} from "lucide-react";
import { sectuions } from "../constent";
import Persnolinfoform from "../components/persnolinfoform";
import ResumePreview from "../components/ResumePreview";
import TeamplateSelector from "../components/TeamplateSelector";
import ColorPicker from "../components/ColorPIcker"; // ✅ fixed name
import SummaryForm from "../components/SummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EductionForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import endPoint from "../configs/api";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6", // ✅ default color
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const [removeBackground, setRemoveBackground] = useState(false);

  const activeSection = sectuions[activeSectionIndex];

  const loadExistingResume = async () => {
    try {
      const { data } = await endPoint.get("/api/resumes/get/" + resumeId, {
        headers: {
          Authorization: token,
        },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  const changeResumeVisibill = async () => {
    try {
      const formData = new formData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await endPoint.put("/api/resumes/update", formData, {
        headers: {
          Authorization: token,
        },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toNamespacedPath.success(data.message);
    } catch (error) {
      console.error("erorr saving resume", error);
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
  try {
    // 🛑 stop if no id
    if (!resumeData._id) {
      toast.error("Resume not loaded yet!");
      return;
    }

    let updateResumeData = structuredClone(resumeData);

    if (typeof resumeData.personal_info.image === "object") {
      delete updateResumeData.personal_info.image;
    }

    const formData = new FormData();

    // ✅ match backend
    formData.append("resumeId", resumeData._id);
    formData.append("resumeData", JSON.stringify(updateResumeData));

    if (removeBackground) {
      formData.append("removebackground", "yes");
    }

    if (resumeData.personal_info.image instanceof File) {
      formData.append("image", resumeData.personal_info.image);
    }

    const { data } = await endPoint.put(
      "/api/resumes/update",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResumeData(data.updatedResume);
    toast.success(data.message);

  } catch (error) {
    console.error("Save error:", error.response?.data || error);
    toast.error(error.response?.data?.message || "Failed to save");
  }
};

  return (
    <div>
      {/* Top Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon size={18} />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 h-[3px] bg-gray-200 border-none" />

              <hr
                className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                style={{
                  width: `${
                    sectuions.length > 1
                      ? (activeSectionIndex / (sectuions.length - 1)) * 100
                      : 0
                  }%`,
                }}
              />

              {/* NAVIGATION */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TeamplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template,
                      }))
                    }
                  />

                  {/* ✅ FIXED COLOR PICKER */}
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sectuions.length - 1),
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 ${
                      activeSectionIndex === sectuions.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={activeSectionIndex === sectuions.length - 1}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* FORM SECTION */}
              <div className="space-y-6">
                {activeSection?.id === "personal" && (
                  <Persnolinfoform
                    data={resumeData.personal_info || {}}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removrBackground={removeBackground}
                    setremovrBackground={setRemoveBackground}
                  />
                )}
                {activeSection?.id === "summary" && (
                  <SummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection?.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection?.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
                {activeSection?.id === "project" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}
                {activeSection?.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>
              <button
                onClick={() => {
                  toast.promise(saveResume());
                }}
                className="mt-6 px-6 py-2 bg-gradient-to-br from-emerald-50 to-emerald-100 text-green-600 text-sm ring hover:ring-green-400 rounded-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className=" relative w-full">
              <div className=" absolute bottom-3 left-0 gap-2 right-0 flex items-center justify-end">
                {resumeData.public && (
                  <button
                    onClick={handleshare}
                    className="flex items-center gap-1 text-sm text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:ring px-3 py-2 rounded-lg"
                  >
                    <Share2 className="size4" />
                    Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibill}
                  className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 hover:ring px-3 py-2 rounded-lg"
                >
                  {resumeData.public ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                  {resumeData.public ? "Public" : " private "}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 hover:ring px-3 py-2 rounded-lg"
                >
                  <FileDown className="size-4" />
                  Download
                </button>
              </div>
            </div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
