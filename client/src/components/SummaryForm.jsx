import { Sparkles } from "lucide-react";
import React from "react";

const SummaryForm = ({ data, onChange, setResumeData }) => {
  const handleAIEnhance = () => {
    // basic placeholder (you can replace with API later)
    if (!data) return;

    const improved = data + " (Improved with AI ✨)";
    onChange(improved);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add a summary for your resume here
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleAIEnhance}
          className=" flex items-center gap-1 text-sm text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 ring-emerald-300 hover:ring transition-all px-3 py-2 rounded-lg "
        >
          <Sparkles className="size-4 text-green-500" />
          AI Enhance
        </button>
      </div>

      {/* Textarea */}
      <div>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          className="w-full p-3 px-4 selection:bg-green-300 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
        />

        {/* Tip */}
        <p className="text-xs text-gray-500 mt-2">
          Tip: Keep it concise (3–4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
