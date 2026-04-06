import { Briefcase, Plus, Sparkles, Trash2, Calendar, Building2, UserCircle, History } from "lucide-react";
import React from "react";
// Assuming newExperience is imported from your constants

const ExperienceForm = ({ data = [], onChange }) => {
  const addExperience = () => {
    // Creating a default object if newExperience isn't accessible in this snippet
    const placeholder = { company: "", position: "", start_date: "", end_date: "", description: "", is_current: false };
    onChange([...data, placeholder]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
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
            <History className="size-4 sm:size-5 text-indigo-500" />
            Experience
          </h3>
          <p className="text-[11px] sm:text-sm text-slate-500 font-medium">
            Highlight your career path.
          </p>
        </div>

        <button
          onClick={addExperience}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95 shrink-0"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden xs:block">Add Job</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="relative group overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 px-4 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
          <div className="size-14 sm:size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
             <Briefcase className="size-6 sm:size-8 text-slate-300" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest">No Experience Added</p>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-10 relative sm:before:absolute sm:before:left-6 sm:before:top-8 sm:before:bottom-8 sm:before:w-0.5 sm:before:bg-slate-100">
          {data.map((experience, index) => (
            <div key={index} className="relative sm:pl-12 group animate-in slide-in-from-left-4 duration-300">
              
              {/* Timeline Bullet - Only visible on Tablet/Desktop */}
              <div className="hidden sm:block absolute left-[18px] top-2 size-2.5 rounded-full bg-indigo-500 ring-4 ring-white z-10" />

              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 space-y-5 sm:space-y-6">
                
                {/* Card Header */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="px-3 py-1 bg-slate-100 sm:bg-slate-900 rounded-full">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 sm:text-white">
                      Role #{index + 1}
                    </span>
                  </div>

                  <button
                    onClick={() => removeExperience(index)}
                    className="size-8 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Building2 className="size-3" /> Company
                    </label>
                    <input
                      value={experience.company || ""}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="e.g. Google"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <UserCircle className="size-3" /> Job Title
                    </label>
                    <input
                      value={experience.position || ""}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="e.g. Lead Designer"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Calendar className="size-3" /> Start Date
                    </label>
                    <input
                      value={experience.start_date || ""}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                      type="month"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Calendar className="size-3" /> End Date
                    </label>
                    <input
                      value={experience.end_date || ""}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      disabled={experience.is_current}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 disabled:bg-slate-50 disabled:text-slate-300 transition-all"
                      type="month"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group/check w-fit px-1">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={experience.is_current || false}
                      onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                      className="peer size-5 rounded-lg border-2 border-slate-200 checked:bg-indigo-600 checked:border-indigo-600 appearance-none transition-all cursor-pointer"
                    />
                    <Plus className="absolute size-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none rotate-45 transition-all" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-600 group-hover/check:text-indigo-600 transition-colors">
                    Currently Working Here
                  </span>
                </label>

                {/* AI REWRITE SECTION */}
                <div className="pt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                      Responsibilities
                    </label>
                    
                    <button
                      type="button"
                      className="group relative flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95 overflow-hidden border border-slate-800"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <Sparkles className="size-3.5 text-emerald-400" />
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center">AI Rewrite</span>
                    </button>
                  </div>

                  <textarea
                    value={experience.description || ""}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    rows={4}
                    className="w-full text-sm px-4 py-3 sm:px-5 sm:py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all resize-none leading-relaxed text-slate-600 bg-slate-50/30"
                    placeholder="Briefly describe your measurable impact..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;