import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadIcon,
  XIcon,
  Loader2, // Added for spinners
} from "lucide-react";
import { useSelector } from "react-redux";
import endPoint from "../configs/api";
import { toast } from "react-toastify";
// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#6366f1", "#f59e0b", "#ef4444", "#0ea5e9", "#10b981"];
  const [allresumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitel] = useState("");
  const [resume, setResume] = useState(null);
  const [editresumeid, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // const pdfToText = async (file) => {
  //   const arrayBuffer = await file.arrayBuffer();
  //   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  //   let text = "";
  //   for (let i = 1; i <= pdf.numPages; i++) {
  //     const page = await pdf.getPage(i);
  //     const content = await page.getTextContent();
  //     text += content.items.map((item) => item.str).join(" ");
  //   }
  //   return text;
  // };

  const loadAllResumes = async () => {
    try {
      setIsLoading(true);
      const { data } = await endPoint.get("/api/user/resume", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data?.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      // Small timeout to prevent "flicker" on fast connections
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  const createResume = async (eve) => {
    try {
      eve.preventDefault();
      const { data } = await endPoint.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllResumes([...allresumes, data.resume]);
      setTitel("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  const uploadResume = async (e) => {
  e.preventDefault();

  if (!resume) {
    toast.error("Please select a PDF file");
    return;
  }

  try {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("resume", resume); // ✅ file
    formData.append("title", title);

    const { data } = await endPoint.post(
      "/api/ai/enhance/uplode-resume",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    

    setResume(null);
    setTitel("");
    setShowUploadResume(false);

    navigate(`/app/builder/${data.resumeId}`);
    toast.success("Resume uploaded successfully!");

  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
  }
};

  const editResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await endPoint.put(
        `/api/resumes/update`,
        { resumeId: editresumeid, resumeData: JSON.stringify({ title }) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllResumes(
        allresumes.map((resume) =>
          resume?._id === editresumeid ? { ...resume, title } : resume
        )
      );
      setTitel("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async () => {
    try {
      setDeletingId(selectedId);
      await endPoint.delete(`/api/resumes/delete/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes((prev) => prev.filter((r) => r._id !== selectedId));
      toast.success("Resume deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // --- SKELETON LOADER COMPONENT ---
  const ResumeSkeleton = () => (
    <div className="h-52 bg-white rounded-[2rem] border border-slate-100 p-6 animate-pulse">
      <div className="size-12 rounded-2xl bg-slate-100 mb-auto" />
      <div className="space-y-3">
        <div className="h-5 bg-slate-100 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-50 rounded-lg w-1/2" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24"> 
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Workspace</h1>
            <p className="text-slate-500 font-medium">Build, refine, and manage your career assets.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-right duration-700">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{user?.name || "Gourav Suman"}</span>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create Button */}
          <button onClick={() => setShowCreateResume(true)} className="group h-52 bg-white flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50">
            <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-emerald-500 transition-all duration-500 group-hover:rotate-90">
              <PlusIcon className="size-6 text-emerald-600 group-hover:text-white" />
            </div>
            <p className="mt-4 font-bold text-slate-700 group-hover:text-emerald-700">Create New</p>
          </button>

          {/* Import Button */}
          <button onClick={() => setShowUploadResume(true)} className="group h-52 bg-white flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50">
            <div className="p-4 bg-indigo-100 rounded-2xl group-hover:bg-indigo-500 transition-all duration-300 group-hover:-translate-y-1">
              <UploadIcon className="size-6 text-indigo-600 group-hover:text-white" />
            </div>
            <p className="mt-4 font-bold text-slate-700 group-hover:text-indigo-700">Import PDF</p>
          </button>

          {/* LOADING STATE: Render Skeletons */}
          {isLoading ? (
            <>
              <ResumeSkeleton />
              <ResumeSkeleton />
            </>
          ) : (
            allresumes?.map((resume, index) => {
              const basecolor = colors[index % colors.length];
              return (
                <div key={resume._id} className={`group relative h-52 transition-all duration-500 hover:-translate-y-2 animate-in fade-in zoom-in-95`}>
                  <div onClick={() => navigate(`/app/builder/${resume._id}`)} className="w-full h-full bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-slate-200">
                    <div className="size-12 rounded-2xl flex items-center justify-center mb-auto" style={{ backgroundColor: `${basecolor}15` }}>
                      <FilePenLineIcon style={{ color: basecolor }} className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 truncate mb-1 pr-4">{resume.title}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Update: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button onClick={(e) => { e.stopPropagation(); setEditResumeId(resume._id); setTitel(resume.title); }} className="p-2 bg-white border border-slate-100 shadow-lg rounded-xl hover:text-indigo-600">
                        <PencilIcon className="size-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedId(resume._id); setShowDeleteModal(true); }} className="p-2 bg-white border border-slate-100 shadow-lg rounded-xl hover:text-red-600">
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* MODALS */}
        {(showCreateResume || showUploadResume || editresumeid || showDeleteModal) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => {
              setShowCreateResume(false);
              setShowUploadResume(false);
              setEditResumeId("");
              setShowDeleteModal(false);
              setTitel("");
            }} />
            
            {/* 1. Create Modal */}
            {showCreateResume && (
              <form onSubmit={createResume} className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-black text-slate-900 mb-2">New Resume</h2>
                <p className="text-slate-500 mb-6 font-medium">Give your professional profile a name.</p>
                <input autoFocus onChange={(e) => setTitel(e.target.value)} value={title} placeholder="e.g. Fullstack Developer" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl mb-6 focus:ring-2 focus:ring-emerald-500 transition-all font-semibold" required />
                <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all">Get Started</button>
                <XIcon onClick={() => {setShowCreateResume(false); setTitel("")}} className="absolute top-6 right-6 text-slate-400 hover:rotate-90 transition-all cursor-pointer" />
              </form>
            )}

            {/* 2. Upload Modal */}
            {showUploadResume && (
              <form onSubmit={uploadResume} className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Upload PDF</h2>
                <p className="text-slate-500 mb-6 font-medium">We'll extract your data to populate the builder.</p>
                <input onChange={(e) => setTitel(e.target.value)} value={title} placeholder="Resume Title" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl mb-4 focus:ring-2 focus:ring-indigo-500 transition-all font-semibold" required />
                <label htmlFor="resume-input" className="block cursor-pointer group mb-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 group-hover:border-indigo-500 group-hover:bg-indigo-50/30 transition-all">
                    {resume ? <span className="font-bold text-indigo-600">{resume.name}</span> : <>
                      <UploadCloud className="size-10 text-slate-300 group-hover:text-indigo-500 mb-2" />
                      <span className="text-sm font-bold text-slate-400 group-hover:text-indigo-600">Click to select PDF</span>
                    </>}
                  </div>
                  <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])} />
                </label>
                <button disabled={isLoading} className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'}`}>
                  {isLoading && <Loader2 className="size-4 animate-spin" />}
                  {isLoading ? "Processing PDF..." : "Import Resume"}
                </button>
                <XIcon onClick={() => {setShowUploadResume(false); setTitel(""); setResume(null)}} className="absolute top-6 right-6 text-slate-400 hover:rotate-90 transition-all cursor-pointer" />
              </form>
            )}

            {/* 3. Edit Modal */}
            {editresumeid && (
              <form onSubmit={editResume} className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Rename Resume</h2>
                <input autoFocus onChange={(e) => setTitel(e.target.value)} value={title} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl mb-6 focus:ring-2 focus:ring-indigo-500 transition-all font-semibold" required />
                <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 active:scale-95 transition-all">Update Title</button>
                <XIcon onClick={() => {setEditResumeId(""); setTitel("")}} className="absolute top-6 right-6 text-slate-400 hover:rotate-90 transition-all cursor-pointer" />
              </form>
            )}

            {/* 4. Delete Modal */}
            {showDeleteModal && (
              <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <div className="size-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {deletingId ? <Loader2 className="size-8 animate-spin" /> : <TrashIcon className="size-8" />}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Are you sure?</h2>
                <p className="text-slate-500 mb-8">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-colors">Cancel</button>
                  <button onClick={deleteResume} disabled={deletingId} className="flex-1 py-3 font-bold bg-red-500 text-white rounded-2xl hover:bg-red-600 shadow-lg shadow-red-100 active:scale-95 transition-all flex items-center justify-center">
                    {deletingId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;