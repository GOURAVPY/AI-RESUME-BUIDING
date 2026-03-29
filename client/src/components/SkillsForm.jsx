import { Plus, Sparkles, X } from "lucide-react";
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
    <div className="space-y-5">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Skills
      </h3>
      <p className="text-sm text-gray-500">
        Showcase your strengths
      </p>
    </div>

    <Sparkles className="w-5 h-5 text-emerald-500" />
  </div>

  {/* Input Card */}
  <div className="flex gap-2 bg-gray-50 p-2 rounded-xl border">
    <input
      type="text"
      value={newSkill}
      onChange={(e) => setNewSkill(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder="Type a skill and press Enter..."
      className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
    />

    <button
      onClick={addSkill}
      disabled={!newSkill.trim()}
      className="flex items-center gap-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-all disabled:opacity-40"
    >
      <Plus className="w-4 h-4" />
      Add
    </button>
  </div>

  {/* Skills List */}
  {data.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {data.map((skill, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-full text-sm shadow-sm hover:shadow transition-all"
        >
          <span className="text-gray-700">{skill}</span>

          <button
            onClick={() => removeSkill(index)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-xl text-gray-400">
      <Sparkles className="w-6 h-6 mb-2" />
      <p className="text-sm">No skills added yet</p>
      <p className="text-xs">Start by adding your top skills</p>
    </div>
  )}

  {/* Tip */}
  <div className="flex items-start gap-2 text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border">
    <Sparkles className="w-4 h-4 mt-0.5 text-emerald-500" />
    <p>
      <strong>Tip:</strong> Add 8–10 relevant skills. Include both technical
      (React, Node.js) and soft skills (communication, leadership).
    </p>
  </div>
</div>
  );
};

export default SkillsForm;