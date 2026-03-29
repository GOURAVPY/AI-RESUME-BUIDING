// GPA NEED TO DEBUGE FILDS

import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">Add your academic details</p>
        </div>

        <button
          type="button"
          onClick={addEduction}
          className="flex items-center gap-1 text-sm text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:ring px-3 py-2 rounded-lg"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p>Click 'Add Education' to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((eduction, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Education #{index + 1}</h4>

                <button
                  type="button"
                  onClick={() => removeEduction(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={eduction.institution || ""}
                  onChange={(e) =>
                    updateEduction(index, "institution", e.target.value)
                  }
                  placeholder="Institution"
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="text"
                />

                <input
                  value={eduction.degree || ""}
                  onChange={(e) =>
                    updateEduction(index, "degree", e.target.value)
                  }
                  placeholder="Degree"
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="text"
                />

                <input
                  value={eduction.field || ""}
                  onChange={(e) =>
                    updateEduction(index, "field", e.target.value)
                  }
                  placeholder="Field of Study"
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="text"
                />

                <input
                  value={eduction.graduation_date || ""}
                  onChange={(e) =>
                    updateEduction(index, "graduation_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="month"
                />

                <input
                  value={eduction.gpa || ""}
                  onChange={(e) => updateEduction(index, "gpa", e.target.value)}
                  placeholder="GPA"
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EductionForm;
