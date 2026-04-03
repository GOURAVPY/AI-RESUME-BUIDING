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
} from "lucide-react";
import { useSelector } from "react-redux";
import endPoint from "../configs/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
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

  const pdfToText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }
    return text;
  };

  const loadAllResumes = async () => {
    try {
      setIsLoading(true);

      const { data } = await endPoint.get(
        "/api/user/resume", // ✅ fixed path
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAllResumes(data?.resumes || []); // ✅ fixed key
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createResume = async (eve) => {
    try {
      eve.preventDefault();

      const { data } = await endPoint.post(
        "/api/resumes/create", // matches backend
        { title },
        { headers: { Authorization: `Bearer ${token}` } }, // token must be Bearer if your backend expects it
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

      // Extract text from PDF
      const resumeText = await pdfToText(resume);
      console.log(resumeText, "error");

      // Send to backend
      const { data } = await endPoint.post(
        "/api/ai/enhance/uplode-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Reset states after upload
      setResume(null);
      setTitel("");
      setShowUploadResume(false);

      // Navigate to builder page
      navigate(`/app/builder/${data.resumeId}`);

      toast.success("Resume uploaded successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editResume = async (e) => {
  e.preventDefault();

  try {
    toast.info("Updating resume...", { autoClose: 1000 });

    // ✅ Send resumeData as a JSON string if your backend expects JSON.parse
   const { data } = await endPoint.put(
  `/api/resumes/update`,
  { 
    resumeId: editresumeid, 
    resumeData: JSON.stringify({ title }) 
  },
  { 
    headers: { Authorization: `Bearer ${token}` } // <-- add "Bearer "
  }
  
);
console.log(token ,'token');

    // Update local state
    setAllResumes(
      allresumes.map(resume =>
        resume?._id === editresumeid ? { ...resume, title } : resume
      )
    );

    setTitel("");        // reset input
    setEditResumeId("");

    toast.success(data.message, {
      style: { background: "#4caf50", color: "#fff", fontWeight: "bold" },
      icon: "✅"
    });

  } catch (error) {
    toast.error(error?.response?.data?.message || error.message, {
      style: { background: "#f44336", color: "#fff", fontWeight: "bold" },
      icon: "⚠️"
    });
  }
};

  const deleteResume = async () => {
    try {
      setDeletingId(selectedId); // animation trigger

      await endPoint.delete(`/api/resumes/delete/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        setAllResumes((prev) =>
          prev.filter((resume) => resume._id !== selectedId),
        );
        setDeletingId(null);
      }, 300);

      toast.success("Resume deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Gourav Suman
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-b from-green-500 to-green-300 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-green-600 transition-all duration-300 m-[5px]">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadIcon className="size-11 p-2.5 bg-gradient-to-tr from-purple-500 to-purple-300 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-purple-600 transition-all duration-300 m-[5px]">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume List */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allresumes?.map((resume, index) => {
            const basecolor = colors[index % colors.length];

            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className={`group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg transition-all duration-300 cursor-pointer
    ${
      deletingId === resume._id ? "opacity-0 scale-90" : "opacity-100 scale-100"
    }`}
                style={{
                  background: `linear-gradient(135deg, ${basecolor}10, ${basecolor}40)`,
                  borderColor: basecolor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: basecolor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: basecolor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: basecolor + "90" }}
                >
                  updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-1 right-1 hidden group-hover:flex items-center"
                >
                  <TrashIcon
                    onClick={() => {
                      setSelectedId(resume._id);
                      setShowDeleteModal(true);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitel(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => {
              setShowCreateResume(false);
            }}
            className=" fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-4"
            >
              <h2 className=" text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => {
                  setTitel(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title "
                className=" w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />
              <button className=" w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className=" absolute top-4 right-4 text-slate-400 hover:text-green-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitel("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => {
              setShowUploadResume(false);
            }}
            className=" fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-4"
            >
              <h2 className=" text-xl font-bold mb-4">Upload Resume</h2>
              <input
                onChange={(e) => {
                  setTitel(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title "
                className=" w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select resume file
                  <div
                    className=" flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed 
                       rounded-md p-4 py-10 my-4 hover:border-purple-500 hover:text-purple-700 translate-color"
                  >
                    {resume ? (
                      <p>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className=" size-14 stroke-1" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 rounded transition-colors flex items-center justify-center gap-2 ${isLoading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                disabled={isLoading}
              >
                {isLoading && "Wait"}
                <span className="text-sm">
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </span>
              </button>
              <XIcon
                className=" absolute top-4 right-4 text-slate-400 hover:text-purple-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitel("");
                }}
              />
            </div>
          </form>
        )}

        {editresumeid && (
          <form
            onSubmit={editResume}
            onClick={() => {
              setEditResumeId("");
            }}
            className=" fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-4"
            >
              <h2 className=" text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => {
                  setTitel(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title "
                className=" w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />
              <button className=" w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                update
              </button>
              <XIcon
                className=" absolute top-4 right-4 text-slate-400 hover:text-green-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitel("");
                }}
              />
            </div>
          </form>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[320px] shadow-xl text-center">
              <h2 className="text-lg font-semibold mb-3">Delete Resume?</h2>

              <p className="text-sm text-gray-600 mb-5">
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteResume}
                  className="w-full py-2 bg-green-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
