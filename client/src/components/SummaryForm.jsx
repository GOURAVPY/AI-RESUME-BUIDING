import { Sparkles, Info } from "lucide-react";
import React from "react";

const SummaryForm = ({ data, onChange, setResumeData }) => {
  const handleAIEnhance = () => {
    if (!data) return;
    // Keeping your logic exactly as is
    const improved = data + " (Improved with AI ✨)";
    onChange(improved);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Professional Summary
          </h3>
          <p className="text-sm text-slate-500">
            Summarize your career highlights in 3-4 sentences.
          </p>
        </div>

        {/* AI Enhance Button - Upgraded UI */}
        <button
          onClick={handleAIEnhance}
          className="group relative flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-emerald-500/20 overflow-hidden"
        >
          {/* Animated background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <Sparkles className="size-4 text-emerald-400 group-hover:animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">AI Enhance</span>
        </button>
      </div>

      {/* Editor Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition duration-500" />
        
        <div className="relative">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={8}
            placeholder="e.g. Passionate Full-Stack Developer with 5+ years of experience in building scalable web applications..."
            className="w-full p-5 bg-white border border-slate-200 rounded-2xl text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 focus:border-emerald-500 outline-none transition-all shadow-sm selection:bg-emerald-100"
          />
          
          {/* Character Count or Tip Hint */}
          <div className="absolute bottom-4 right-4">
            <div className="px-2 py-1 bg-slate-50 rounded-md border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {data?.length || 0} Characters
                </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Tip Card */}
      <div className="space-y-1">
            <p className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">Pro Tip</p>
            <p className="text-xs text-indigo-700/80 leading-relaxed font-medium">
              Quantify your achievements. Instead of saying <span className="text-indigo-900 font-bold">"Improved sales,"</span> try <span className="text-emerald-700 font-bold">"Increased sales by 25% over 6 months."</span>
            </p>
        </div>
    </div>
  );
};

export default SummaryForm;