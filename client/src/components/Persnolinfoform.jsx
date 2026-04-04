import React, { useEffect, useState } from "react";
import { User, Camera, Sparkles, Check } from "lucide-react";
import { fields } from "../constent";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Personal Information
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          This information will be the first thing employers see.
        </p>
      </div>

      {/* Profile Photo & AI Actions */}
      <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="relative group">
          <label className="cursor-pointer block">
            <div className="relative size-24 rounded-full overflow-hidden ring-4 ring-white shadow-md transition-transform group-hover:scale-105">
              {preview ? (
                <img
                  src={preview}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                  <User className="size-10 text-slate-400" />
                </div>
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white size-6" />
              </div>
            </div>
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
        </div>

        <div className="flex-1 min-w-[200px] space-y-3">
            <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Profile Photo</span>
                <span className="text-xs text-slate-500">JPG or PNG. Max 2MB.</span>
            </div>
          
          {/* AI Remove Background Toggle */}
          {typeof data?.image === "object" && (
            <div 
              onClick={() => setRemoveBackground(!removeBackground)}
              className={`flex items-center justify-between gap-4 p-2 pl-3 rounded-xl border cursor-pointer transition-all ${
                removeBackground 
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100" 
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className={`size-3.5 ${removeBackground ? "text-white" : "text-indigo-500"}`} />
                <span className="text-[11px] font-bold uppercase tracking-wider">Remove Background</span>
              </div>
              
              <div className={`size-5 rounded-full flex items-center justify-center transition-colors ${
                removeBackground ? "bg-white/20" : "bg-slate-100"
              }`}>
                 {removeBackground && <Check className="size-3 text-white" strokeWidth={4} />}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                <Icon className="size-3.5 text-slate-400" />
                {field.label}
                {field.required && <span className="text-rose-500">*</span>}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`e.g. ${field.label === "Email" ? "alex@example.com" : field.label}`}
                required={field.required}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;