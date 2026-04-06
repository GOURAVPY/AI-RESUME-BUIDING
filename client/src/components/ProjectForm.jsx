import { Folder, Plus, Sparkles, Trash2, Code2, Layout, Rocket } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const placeholder = { name: "", type: "", description: "" };
    onChange([...data, placeholder]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between gap-4 px-1">
        <div className="space-y-0.5 sm:space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Rocket className="size-5 text-indigo-500" />
            Projects
          </h3>
          <p className="text-[11px] sm:text-sm text-slate-500 font-medium">
            Showcase your builds and personal work.
          </p>
        </div>

        <button
          onClick={addProject}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95 shrink-0"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden xs:block">Add Project</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="relative group overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 px-4 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
          <div className="size-14 sm:size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
             <Folder className="size-6 sm:size-8 text-slate-300" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest">No Projects Found</p>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 space-y-5 sm:space-y-6"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <div className="px-3 py-1 bg-slate-100 sm:bg-slate-900 rounded-full">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 sm:text-white">
                    Project #{index + 1}
                  </span>
                </div>

                <button
                  onClick={() => removeProject(index)}
                  className="size-8 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <Code2 className="size-3" /> Project Title
                  </label>
                  <input
                    value={project.name || ""}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="e.g. AI Resume Builder"
                    className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <Layout className="size-3" /> Project Type
                  </label>
                  <input
                    value={project.type || ""}
                    onChange={(e) => updateProject(index, "type", e.target.value)}
                    placeholder="e.g. Full-Stack Web App"
                    className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* AI Rewrite Section */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                    Project Description
                  </label>
                  
                  <button
                    type="button"
                    className="group relative flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95 overflow-hidden border border-slate-800"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Sparkles className="size-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Enhance with AI</span>
                  </button>
                </div>

                <textarea
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  rows={4}
                  className="w-full text-sm px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all resize-none leading-relaxed text-slate-600 bg-slate-50/30 shadow-inner"
                  placeholder="What problem did you solve? Mention the tech stack..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;