import { Plus, Sparkles, X, Terminal, Cpu } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5 sm:space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="size-4 sm:size-5 text-indigo-500" />
            Skills & Expertise
          </h3>
          <p className="text-[11px] sm:text-sm text-slate-500 font-medium">
            Technical and soft skills.
          </p>
        </div>

        <div className="size-9 sm:size-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">
          <Terminal className="size-4 sm:size-5 text-slate-400" />
        </div>
      </div>

      {/* Modern Input Card */}
      <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-2 sm:pl-4 rounded-2xl sm:rounded-[1.5rem] border border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all shadow-sm">
        <div className="flex-1 flex items-center gap-2 px-2 sm:px-0">
          <Plus className="size-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type skill and press Enter..."
            className="w-full bg-transparent py-2.5 sm:py-2 text-sm text-slate-600 outline-none placeholder:text-slate-400 font-medium"
          />
        </div>

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="group relative flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl sm:rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md disabled:opacity-30 disabled:grayscale overflow-hidden active:scale-95"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="text-[10px] font-black uppercase tracking-widest">Add Skill</span>
        </button>
      </div>

      {/* Skills Pill Cloud */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-1">
          {data.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-slate-200 rounded-full text-[11px] sm:text-xs font-bold text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all cursor-default animate-in zoom-in-95 duration-200"
            >
              <span>{skill}</span>

              <button
                onClick={() => removeSkill(index)}
                className="opacity-100 sm:opacity-0 group-hover:opacity-100 -mr-1 size-4 sm:size-5 flex items-center justify-center rounded-full hover:bg-rose-100 hover:text-rose-500 transition-all active:scale-90"
                title="Remove skill"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 text-slate-400">
          <div className="size-10 sm:size-12 rounded-full bg-white border border-slate-100 flex items-center justify-center mb-3">
             <Sparkles className="size-4 sm:size-5 text-slate-200" />
          </div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-300">Your skillset is empty</p>
        </div>
      )}

      {/* Premium Tip Section */}
      <div className="relative overflow-hidden flex items-start gap-3 bg-slate-900 p-4 rounded-2xl sm:rounded-[1.5rem] border border-slate-800 group shadow-lg">
        <div className="absolute -right-4 -top-4 size-20 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
        
        <div className="mt-0.5 size-7 sm:size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
            <Sparkles className="size-3.5 sm:size-4 text-emerald-400 animate-pulse" />
        </div>
        
        <div className="space-y-1">
          <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-400">Pro Tip</p>
          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
            Aim for <span className="text-white font-bold">8–10 core skills</span>. Mix technical tools with essential soft skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;