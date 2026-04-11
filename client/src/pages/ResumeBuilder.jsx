import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon, ChevronLeft, ChevronRight, Eye, EyeOff, FileDown,
  Share2, Loader2, Save, User, FileText, Briefcase, GraduationCap, Rocket, Cpu
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
    _id: "", title: "", personal_info: {}, professional_summary: "",
    experience: [], education: [], project: [], skills: [],
    template: "classic", accent_color: "#3b82f6", public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const activeSection = sectuions[activeSectionIndex];

  const getIcon = (id) => {
    switch(id) {
      case 'personal': return <User size={18} />;
      case 'summary': return <FileText size={18} />;
      case 'experience': return <Briefcase size={18} />;
      case 'education': return <GraduationCap size={18} />;
      case 'project': return <Rocket size={18} />;
      case 'skills': return <Cpu size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const loadExistingResume = async () => {
    try {
      const { data } = await endPoint.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) { console.log(error.message); }
  };

  useEffect(() => { loadExistingResume(); }, [resumeId]);

  // --- ORIGINAL LOGIC PRESERVED ---
  const changeResumeVisibill = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

      const { data } = await endPoint.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      toast.error("Error changing visibility");
    }
  };

  const downloadResume = () => { window.print(); };

  const saveResume = async () => {
  try {
    if (!resumeData._id) {
      toast.error("Resume not loaded yet!");
      return;
    }

    setLoading(true);

    let updateResumeData = structuredClone(resumeData);

    // 🔥🔥🔥 ADD THIS BLOCK (MAIN FIX)
    updateResumeData.project = (updateResumeData.project || []).map((p) => ({
      ...p,
      description: Array.isArray(p.description)
        ? p.description.join(", ") // ✅ FIX
        : p.description || "",
    }));

    // 🔥 existing logic
    if (
      typeof resumeData.personal_info.image === "object" &&
      !(resumeData.personal_info.image instanceof File)
    ) {
      delete updateResumeData.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeId", resumeData._id);

    // 🔥 USE FIXED DATA
    formData.append("resumeData", JSON.stringify(updateResumeData));

    formData.append("removebackground", removeBackground ? "yes" : "no");

    if (resumeData.personal_info.image instanceof File) {
      formData.append("image", resumeData.personal_info.image);
    }

    // 🧪 DEBUG (optional)
    console.log("FINAL PROJECT:", updateResumeData.project);

    const { data } = await endPoint.put("/api/resumes/update", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setResumeData(data.updatedResume);
    toast.success(data.message);

  } catch (error) {
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
    <div className="min-h-screen bg-[#F8FAFC] pb-32 lg:pb-12">
      
      {/* SECONDARY NAV: Pushed down 88px, Z-index 40 so main Navbar stays on top */}
      <nav className="fixed top-[88px] left-0 right-0 z-[40] bg-white border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <Link to="/app" className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold text-sm">
            <ArrowLeftIcon size={16} />
            <span className="hidden xs:block">Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[10px] font-medium italic hidden sm:block">
              Auto-saving disabled
            </span>
            <button
              onClick={saveResume}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {loading ? "Saving..." : "Save Progress"}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT: pt-40 clears BOTH navbars */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-40 md:pt-44">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL */}
          <div className="w-full lg:col-span-5 order-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 lg:sticky lg:top-48">
              <div className="relative h-1.5 bg-slate-100">
                <div
                  className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-700 ease-out"
                  style={{ width: `${(activeSectionIndex / (sectuions.length - 1)) * 100}%` }}
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 bg-slate-50 p-2 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <TeamplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(t) => setResumeData(p => ({...p, template: t}))}
                    />
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(c) => setResumeData(p => ({...p, accent_color: c}))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setActiveSectionIndex(p => Math.max(p-1, 0))} disabled={activeSectionIndex === 0} className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 disabled:opacity-30"><ChevronLeft size={18}/></button>
                    <button onClick={() => setActiveSectionIndex(p => Math.min(p+1, sectuions.length-1))} disabled={activeSectionIndex === sectuions.length - 1} className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 disabled:opacity-30"><ChevronRight size={18}/></button>
                  </div>
                </div>

                <div className="min-h-[450px]">
                  <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 capitalize">
                    <span className="size-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">{activeSectionIndex + 1}</span>
                    {activeSection?.id} Details
                  </h2>
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeSection?.id === "personal" && <Persnolinfoform data={resumeData.personal_info || {}} onChange={(d) => setResumeData(p => ({...p, personal_info: d}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
                    {activeSection?.id === "summary" && <SummaryForm data={resumeData.professional_summary} onChange={(d) => setResumeData(p => ({...p, professional_summary: d}))} setResumeData={setResumeData} />}
                    {activeSection?.id === "experience" && <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData(p => ({...p, experience: d}))} />}
                    {activeSection?.id === "education" && <EducationForm data={resumeData.education} onChange={(d) => setResumeData(p => ({...p, education: d}))} />}
                    {activeSection?.id === "project" && <ProjectForm data={resumeData.project} onChange={(d) => setResumeData(p => ({...p, project: d}))} />}
                    {activeSection?.id === "skills" && <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData(p => ({...p, skills: d}))} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: PREVIEW - ORIGINAL SHARING/VISIBILITY UI PRESERVED */}
          <div className="w-full lg:col-span-7 order-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 px-2">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Preview</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.public && (
                  <button onClick={handleShare} className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-full hover:bg-emerald-100 transition-colors">
                    <Share2 size={12} /> Share
                  </button>
                )}
                <button onClick={changeResumeVisibill} className={`flex items-center gap-1.5 text-[10px] font-bold px-3 py-2 rounded-full transition-colors ${resumeData.public ? "text-blue-600 bg-blue-50" : "text-slate-500 bg-slate-100"}`}>
                  {resumeData.public ? <Eye size={12} /> : <EyeOff size={12} />}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button onClick={downloadResume} className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-slate-900 px-3 py-2 rounded-full hover:bg-black transition-all">
                  <FileDown size={12} /> Download
                </button>
              </div>
            </div>

            <div className="rounded-2xl border-[8px] md:border-[12px] border-slate-100 shadow-2xl bg-white overflow-hidden">
               <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAV: Highest Z-index */}
      <div className="fixed bottom-0 left-0 right-0 z-[110] lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-4 flex justify-between items-center shadow-lg">
        {sectuions.map((sec, i) => (
          <button key={sec.id} onClick={() => setActiveSectionIndex(i)} className={`flex flex-col items-center gap-1 transition-all ${activeSectionIndex === i ? "text-indigo-600 scale-110" : "text-slate-400"}`}>
             <div className={`${activeSectionIndex === i ? "bg-indigo-50 p-1.5 rounded-lg" : ""}`}>{getIcon(sec.id)}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResumeBuilder;