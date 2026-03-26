import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { fields } from "../constent";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Handle image preview safely
  useEffect(() => {
    if (!data?.image) {
      setPreview(null);
      return;
    }

    if (typeof data.image === "string") {
      setPreview(data.image);
    } else {
      const objectUrl = URL.createObjectURL(data.image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [data?.image]);

  return (
    <div>
      {/* Heading */}
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>

      <p className="text-sm text-gray-600">
        Get started with your personal information
      </p>

      {/* Image + Toggle */}
      <div className="flex items-center gap-4 mt-4">
        {/* Image Upload */}
        <label className="cursor-pointer flex items-center gap-3">
          {preview ? (
            <img
              src={preview}
              alt="user"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <>
              <div className="w-16 h-16 flex items-center justify-center border rounded-full">
                <User className="size-8 text-gray-500" />
              </div>

              {/* KEEP TEXT */}
              <span className="text-sm text-gray-600">Upload user image</span>
            </>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleChange("image", file);
            }}
          />
        </label>

        {/* Toggle */}
        {typeof data?.image === "object" && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Remove Background</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground((prev) => !prev)}
              />

              {/* Track */}
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition"></div>

              {/* Thumb */}
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        )}
      </div>

      {/* Dynamic Fields */}
      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
