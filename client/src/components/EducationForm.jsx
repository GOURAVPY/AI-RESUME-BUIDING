import React from "react";
import { GraduationCap, Plus, Trash2, School, Award, BookOpen, CalendarDays, Milestone } from "lucide-react";
import { newEducation } from "../constent";

const EductionForm = ({ data = [], onChange }) => {
  const addEduction = () => {
    onChange([...data, { ...newEducation }]);
  };

  const removeEduction = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEduction = (index, field, value) => {
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
            <GraduationCap className="size-6 text-indigo-500" />
            Education
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            Your academic background and certifications.
          </p>
        </div>

        <button
          type="button"
          onClick={addEduction}
          className="group flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">Add Education</span>
        </button>
      </div>

      {data.length === 0 ? (
        /* Empty State */
        <div className="relative group overflow-hidden flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
             <GraduationCap className="size-8 text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">No Education Added</p>
          <p className="text-xs text-slate-400 mt-1">Add your degrees or relevant certifications.</p>
        </div>
      ) : (
        /* Timeline Container */
        <div className="space-y-10 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100">
          {data.map((eduction, index) => (
            <div
              key={index}
              className="relative pl-12 group animate-in slide-in-from-left-4 duration-300"
            >
              {/* Timeline Bullet */}
              <div className="absolute left-[18px] top-1.5 size-2.5 rounded-full bg-indigo-500 ring-4 ring-white z-10" />

              <div className="p-6 bg-white border border-slate-200 rounded-[1.8rem] shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="px-3 py-1 bg-slate-900 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">
                      Education #{index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEduction(index)}
                    className="size-8 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Input Grid */}
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Institution */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <School className="size-3" /> Institution
                    </label>
                    <input
                      value={eduction.institution || ""}
                      onChange={(e) => updateEduction(index, "institution", e.target.value)}
                      placeholder="e.g. Stanford University"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                      type="text"
                    />
                  </div>

                  {/* Degree */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <Award className="size-3" /> Degree
                    </label>
                    <input
                      value={eduction.degree || ""}
                      onChange={(e) => updateEduction(index, "degree", e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                      type="text"
                    />
                  </div>

                  {/* Field of Study */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <BookOpen className="size-3" /> Field of Study
                    </label>
                    <input
                      value={eduction.field || ""}
                      onChange={(e) => updateEduction(index, "field", e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                      type="text"
                    />
                  </div>

                  {/* Graduation Date */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <CalendarDays className="size-3" /> Graduation Date
                    </label>
                    <input
                      value={eduction.graduation_date || ""}
                      onChange={(e) => updateEduction(index, "graduation_date", e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                      type="month"
                    />
                  </div>

                  {/* GPA - Debugged & Polished */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      <Milestone className="size-3" /> GPA / Grade
                    </label>
                    <div className="relative group/gpa">
                      <input
                        value={eduction.gpa || ""}
                        onChange={(e) => updateEduction(index, "gpa", e.target.value)}
                        placeholder="e.g. 3.8"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm bg-slate-50/30"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within/gpa:opacity-100 transition-opacity">
                         <span className="text-[10px] font-bold text-indigo-400 uppercase">Max 10.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EductionForm;