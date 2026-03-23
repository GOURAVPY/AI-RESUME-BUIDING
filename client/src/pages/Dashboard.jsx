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
import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allresumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitel] = useState("");
  const [resume, setResume] = useState(null);
  const [editresumeid, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (eve) => {
  eve.preventDefault();
  setShowCreateResume(false);
  setTitel("");   // add this
  navigate(`/app/builder/res123`);
};

  const uploadResume = async (eve) => {
    eve.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`);
  };
  const editResume = (e) => {
    e.preventDefault();

    setAllResumes((prev) =>
      prev.map((r) => (r._id === editresumeid ? { ...r, title } : r)),
    );

    setEditResumeId("");
    setTitel("");
  };
  const deleteResume = async (resumeid) => {
    const confirm = window.confirm(
      "ARE YOU SURE YOU WANT TO DELETE THIS RESUME ?...",
    );
    if (confirm) {
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeid));
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
          {allresumes.map((resume, index) => {
            const basecolor = colors[index % colors.length];

            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
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
                    onClick={() => deleteResume(resume._id)}
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
              <button className=" w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                Upload Resume
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
      </div>
    </div>
  );
};

export default Dashboard;
