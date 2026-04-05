import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileDown,
  Share2,
  Loader2, // Added for the button spinner
  Save,
} from "lucide-react";
import { sectuions } from "../constant";
import ColorPicker from "../components/home/ColorPicker.jsx";
import Persnolinfoform from "../components/Persnolinfoform";
import ResumePreview from "../components/ResumePreview";
import TeamplateSelector from "../components/TeamplateSelector";
import SummaryForm from "../components/SummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm"; 
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import endPoint from "../configs/api";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
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
    accent_color: "#3b82f6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const activeSection = sectuions[activeSectionIndex];

  const loadExistingResume = async () => {
    try {
      const { data } = await endPoint.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
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
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await endPoint.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      toast.error("Error changing visibility");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      if (!resumeData._id) {
        toast.error("Resume not loaded yet!");
        return;
      }

      setLoading(true);

      let updateResumeData = structuredClone(resumeData);

      if (
        typeof resumeData.personal_info.image === "object" &&
        !(resumeData.personal_info.image instanceof File)
      ) {
        delete updateResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeData._id);
      formData.append("resumeData", JSON.stringify(updateResumeData));

      // ✅ ALWAYS SEND VALUE
      formData.append("removebackground", removeBackground ? "yes" : "no");

      if (resumeData.personal_info.image instanceof File) {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await endPoint.put("/api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ❌ NO content-type
        },
      });

      setResumeData(data.updatedResume);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/share/${resumeId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/app"
            className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-all font-semibold"
          >
            <ArrowLeftIcon
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            <span className="text-slate-400 text-sm font-medium italic hidden sm:block">
              Auto-saving disabled
            </span>
            <button
              onClick={saveResume}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {loading ? "Saving..." : "Save Progress"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT PANEL: INPUT FORM */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-24">
              {/* Animated Progress Header */}
              <div className="relative h-1.5 bg-slate-100">
                <div
                  className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-700 ease-out"
                  style={{
                    width: `${(activeSectionIndex / (sectuions.length - 1)) * 100}%`,
                  }}
                />
              </div>

              <div className="p-8">
                {/* Form Toolbar */}
                <div className="flex justify-between items-center mb-8 bg-slate-50 p-2 rounded-2xl">
                  <div className="flex items-center gap-1">
                    <TeamplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(template) =>
                        setResumeData((prev) => ({ ...prev, template }))
                      }
                    />
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

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={activeSectionIndex === 0}
                      className="p-2 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all text-slate-600"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-xs font-black text-slate-400 w-12 text-center uppercase tracking-widest">
                      {activeSectionIndex + 1} / {sectuions.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.min(prev + 1, sectuions.length - 1),
                        )
                      }
                      disabled={activeSectionIndex === sectuions.length - 1}
                      className="p-2 rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all text-slate-600"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="min-h-[450px]">
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 capitalize">
                    <span className="size-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">
                      {activeSectionIndex + 1}
                    </span>
                    {activeSection?.id} Details
                  </h2>

                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeSection?.id === "personal" && (
                      <Persnolinfoform
                        data={resumeData.personal_info || {}}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
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
                          setResumeData((prev) => ({ ...prev, project: data }))
                        }
                      />
                    )}
                    {activeSection?.id === "skills" && (
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, skills: data }))
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: LIVE PREVIEW */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Live Preview
              </h3>
              <div className="flex gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors"
                  >
                    <Share2 size={14} /> Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibill}
                  className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-colors ${resumeData.public ? "text-blue-600 bg-blue-50" : "text-slate-500 bg-slate-100"}`}
                >
                  {resumeData.public ? <Eye size={14} /> : <EyeOff size={14} />}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-full hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  <FileDown size={14} /> Download
                </button>
              </div>
            </div>

            <div className="rounded-2xl border-[12px] border-slate-100 shadow-2xl shadow-slate-300 overflow-hidden bg-white">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
