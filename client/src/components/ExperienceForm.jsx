import { Briefcase, Plus, Sparkles, Trash2, Calendar, Building2, UserCircle, History } from "lucide-react";
import { newExperience } from "../constant";

const ExperienceForm = ({ data = [], onChange }) => {
  const addExperience = () => {
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <History className="size-5 text-indigo-500" />
            Professional Experience
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            Highlight your career path and key achievements.
          </p>
        </div>

        <button
          onClick={addExperience}
          className="group flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">Add Job</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="relative group overflow-hidden flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
             <Briefcase className="size-8 text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">No Experience Added</p>
          <p className="text-xs text-slate-400 mt-1">Start by adding your most recent position.</p>
        </div>
      ) : (
        <div className="space-y-10 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100">
          {data.map((experience, index) => (
            <div
              key={index}
              className="relative pl-12 group animate-in slide-in-from-left-4 duration-300"
            >
              {/* Timeline Bullet */}
              <div className="absolute left-[18px] top-1.5 size-2.5 rounded-full bg-indigo-500 ring-4 ring-white z-10" />

              <div className="p-6 bg-white border border-slate-200 rounded-[1.8rem] shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-slate-900 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">
                            Role #{index + 1}
                        </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeExperience(index)}
                    className="size-8 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Input Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Building2 className="size-3" /> Company
                    </label>
                    <input
                      value={experience.company || ""}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="e.g. Google"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <UserCircle className="size-3" /> Job Title
                    </label>
                    <input
                      value={experience.position || ""}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="e.g. Lead Designer"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Calendar className="size-3" /> Start Date
                    </label>
                    <input
                      value={experience.start_date || ""}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                      type="month"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Calendar className="size-3" /> End Date
                    </label>
                    <input
                      value={experience.end_date || ""}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      disabled={experience.is_current}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm disabled:bg-slate-50 disabled:text-slate-300 disabled:border-slate-100"
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
                      className="peer size-5 rounded-lg border-2 border-slate-200 checked:bg-indigo-600 checked:border-indigo-600 appearance-none transition-all cursor-pointer shadow-sm"
                    />
                    <Plus className="absolute size-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none rotate-45 transition-all" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 group-hover/check:text-indigo-600 transition-colors">
                    Currently Working Here
                  </span>
                </label>

                {/* AI REWRITE BUTTON - PREMIUM VERSION */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                      Job Responsibilities
                    </label>
                    
                    <button
                      type="button"
                      className="group relative flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-emerald-500/20 overflow-hidden border border-slate-800"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <Sparkles className="size-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">AI Rewrite</span>
                    </button>
                  </div>

                  <textarea
                    value={experience.description || ""}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    rows={5}
                    className="w-full text-sm px-5 py-4 rounded-[1.5rem] border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all resize-none leading-relaxed text-slate-600 shadow-inner bg-slate-50/30"
                    placeholder="Briefly describe your key responsibilities and measurable impact..."
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