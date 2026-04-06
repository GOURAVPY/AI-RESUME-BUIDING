import { Sparkles, Info, Loader2, Wand2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import endPoint from "./../configs/api";
import { toast } from "react-hot-toast";

const SummaryForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIEnhance = async () => {
    try {
      if (!data || data.trim().length < 10) {
        toast.error("Please enter a bit more detail for better enhancement");
        return;
      }

      setIsGenerating(true);
      const prompt = `Enhance this professional resume summary:\n${data}`;

      const response = await endPoint.post(
        "/api/ai/enhance/professional-summary",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const enhanced = response?.data?.result;
      if (!enhanced) {
        toast.error("No content returned from AI");
        return;
      }

      onChange(enhanced);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Professional Summary
          </h3>
          <p className="text-[11px] sm:text-sm text-slate-500 max-w-xs font-medium">
            Summarize your career highlights in 3-4 sentences.
          </p>
        </div>

        {/* AI Enhance Button */}
        <button
          onClick={handleAIEnhance}
          disabled={isGenerating}
          className={`group relative flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl transition-all duration-300 shadow-md active:scale-95 overflow-hidden border
            ${isGenerating 
              ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed" 
              : "bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:shadow-emerald-500/20"}`}
        >
          {/* Shimmering background when generating */}
          {isGenerating && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          )}

          {isGenerating ? (
            <Loader2 className="size-4 animate-spin text-indigo-500" />
          ) : (
            <Wand2 className="size-3.5 sm:size-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          )}

          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
            {isGenerating ? "Rewriting..." : "AI Enhance"}
          </span>
        </button>
      </div>

      {/* Editor Section */}
      <div className="relative group">
        {/* Animated Glow Border - Turns Emerald when generating */}
        <div className={`absolute -inset-0.5 rounded-2xl blur opacity-20 transition duration-1000 
          ${isGenerating ? "bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500 animate-pulse opacity-40" : "bg-slate-200 group-focus-within:opacity-40"}`} 
        />

        <div className="relative">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={isGenerating}
            rows={7}
            placeholder="e.g. Passionate Full-Stack Developer with 5+ years of experience..."
            className={`w-full p-4 sm:p-5 bg-white border rounded-2xl text-sm leading-relaxed outline-none transition-all shadow-sm selection:bg-emerald-100
              ${isGenerating 
                ? "border-transparent text-slate-300 transition-opacity opacity-50" 
                : "border-slate-200 text-slate-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5"}`}
          />

          {/* AI Loading Skeleton Overlay */}
          {isGenerating && (
            <div className="absolute inset-0 flex flex-col gap-3 p-5 pointer-events-none">
              <div className="h-4 w-[90%] bg-slate-100 rounded-full animate-pulse" />
              <div className="h-4 w-[75%] bg-slate-100 rounded-full animate-pulse delay-75" />
              <div className="h-4 w-[85%] bg-slate-100 rounded-full animate-pulse delay-150" />
            </div>
          )}

          {/* Character Count */}
          {!isGenerating && (
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 animate-in fade-in duration-300">
              <div className="px-2 py-1 bg-slate-50/80 backdrop-blur-sm rounded-md border border-slate-100">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {data?.length || 0} Chars
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern Tip Card */}
      <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 flex gap-3">
        <div className="mt-0.5 size-7 rounded-lg bg-white border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
          <Info className="size-3.5 text-indigo-600" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-indigo-900 uppercase tracking-wider">
            Pro Tip
          </p>
          <p className="text-[11px] sm:text-xs text-indigo-700/80 leading-relaxed font-medium">
            Quantify your achievements. Try{" "}
            <span className="text-emerald-700 font-bold italic">
              "Increased sales by 25%"
            </span>{" "}
            instead of "Improved sales."
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;