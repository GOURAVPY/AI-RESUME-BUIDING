import { Folder, Plus, Sparkles, Trash2 } from "lucide-react";
import { newProject } from "../constent";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    onChange([
      ...data,
      { ...newProject }, // internal only
    ]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-1 text-sm text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:ring px-3 py-2 rounded-lg"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p>Click 'Add Project' to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={project._id || index} // use internally only
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              {/* Title + Delete */}
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>

                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="Project Name"
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="text"
                />

                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  placeholder="Project Type (Web App, Mobile App...)"
                  className="px-3 py-2 text-sm rounded-lg border"
                  type="text"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-rose-600 bg-gradient-to-br from-rose-50 to-rose-100 hover:ring px-3 py-2 rounded-lg"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg border resize-none"
                  placeholder="Describe your project..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
