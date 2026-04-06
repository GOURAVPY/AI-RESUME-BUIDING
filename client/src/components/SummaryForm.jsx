import { Sparkles, Info } from "lucide-react";
import React from "react";

const SummaryForm = ({ data, onChange }) => {
  const handleAIEnhance = () => {
    if (!data) return;
    const improved = data + " (Improved with AI ✨)";
    onChange(improved);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section - Stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs">
            Summarize your career highlights in 3-4 sentences.
          </p>
        </div>

        {/* AI Enhance Button - Full width on mobile, auto on desktop */}
        <button
          onClick={handleAIEnhance}
          className="group relative flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-emerald-500/20 overflow-hidden active:scale-[0.98]"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <Sparkles className="size-3.5 sm:size-4 text-emerald-400 group-hover:animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">AI Enhance</span>
        </button>
      </div>

      {/* Editor Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition duration-500" />
        
        <div className="relative">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={window.innerWidth < 640 ? 6 : 8} // Slightly shorter on mobile to save scroll space
            placeholder="e.g. Passionate Full-Stack Developer with 5+ years of experience..."
            className="w-full p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all shadow-sm selection:bg-emerald-100"
          />
          
          {/* Character Count - Positioned for better thumb clearance */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <div className="px-2 py-1 bg-slate-50/80 backdrop-blur-sm rounded-md border border-slate-100">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {data?.length || 0} Chars
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Tip Card - Improved readability on small screens */}
      <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50 space-y-1">
        <div className="flex items-center gap-2">
          <Info className="size-3 text-indigo-600" />
          <p className="text-[10px] sm:text-[11px] font-black text-indigo-900 uppercase tracking-wider">Pro Tip</p>
        </div>
        <p className="text-[11px] sm:text-xs text-indigo-700/80 leading-relaxed font-medium">
          Quantify your achievements. Instead of <span className="text-indigo-900 font-bold">"Improved sales,"</span> try <span className="text-emerald-700 font-bold">"Increased sales by 25%."</span>
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;