import React from "react";
import { GraduationCap, Plus, Trash2, School, Award, BookOpen, CalendarDays, Milestone } from "lucide-react";

// Assuming newEducation is imported from your constants
const EducationForm = ({ data = [], onChange }) => {
  
  const addEducation = () => {
    const placeholder = { institution: "", degree: "", field: "", graduation_date: "", gpa: "" };
    onChange([...data, placeholder]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
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
            <GraduationCap className="size-5 sm:size-6 text-indigo-500" />
            Education
          </h3>
          <p className="text-[11px] sm:text-sm text-slate-500 font-medium">
            Academic background & certifications.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95 shrink-0"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden xs:block">Add Degree</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="relative group overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 px-4 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
          <div className="size-14 sm:size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
             <GraduationCap className="size-6 sm:size-8 text-slate-300" />
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest">No Education Added</p>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-10 relative sm:before:absolute sm:before:left-6 sm:before:top-8 sm:before:bottom-8 sm:before:w-0.5 sm:before:bg-slate-100">
          {data.map((edu, index) => (
            <div key={index} className="relative sm:pl-12 group animate-in slide-in-from-left-4 duration-300">
              
              {/* Timeline Bullet - Visible only on Tablet/Desktop */}
              <div className="hidden sm:block absolute left-[18px] top-2 size-2.5 rounded-full bg-indigo-500 ring-4 ring-white z-10" />

              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 space-y-5 sm:space-y-6">
                
                {/* Card Header */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                  <div className="px-3 py-1 bg-slate-100 sm:bg-slate-900 rounded-full">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 sm:text-white">
                      Education #{index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="size-8 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <School className="size-3" /> Institution
                    </label>
                    <input
                      value={edu.institution || ""}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="e.g. Stanford University"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Award className="size-3" /> Degree
                    </label>
                    <input
                      value={edu.degree || ""}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <BookOpen className="size-3" /> Field of Study
                    </label>
                    <input
                      value={edu.field || ""}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <CalendarDays className="size-3" /> Graduation
                    </label>
                    <input
                      value={edu.graduation_date || ""}
                      onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all"
                      type="month"
                    />
                  </div>

                  {/* GPA Section - Full width on all devices */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                        <Milestone className="size-3" /> GPA / Grade
                    </label>
                    <div className="relative group/gpa">
                      <input
                        value={edu.gpa || ""}
                        onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                        placeholder="e.g. 3.8"
                        className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm bg-slate-50/30"
                        type="number"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within/gpa:opacity-100 transition-opacity hidden xs:block">
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

export default EducationForm;