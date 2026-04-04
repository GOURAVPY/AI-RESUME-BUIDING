import { Check, Layers, ChevronDown, Layout, Columns, Type, Sparkles } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Updated icons to match standard Lucide naming (Capitalized)
  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "Traditional & Professional",
      icon: <Type size={14} />,
    },
    {
      id: "modern",
      name: "Modern",
      description: "Sleek & Two-Column",
      icon: <Columns size={14} />,
    },
    {
      id: "minimal-image",
      name: "Creative",
      description: "Visual with Photo",
      icon: <Sparkles size={14} />,
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean & Content-First",
      icon: <Layout size={14} />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* TRIGGER BUTTON - Modern UI */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
          isOpen
            ? "bg-slate-900 border-slate-900 text-white shadow-lg"
            : "bg-white border-slate-200 text-slate-700 hover:border-blue-400 shadow-sm"
        }`}
      >
        <Layers size={16} className={isOpen ? "text-blue-400" : "text-blue-600"} />
        <span className="text-xs font-bold uppercase tracking-widest">Template</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* DROPDOWN - Premium UI */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 p-2 z-[100] bg-white rounded-[1.5rem] border border-slate-200 shadow-2xl w-[280px] animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          <div className="px-3 py-2 mb-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Select Layout</h4>
          </div>

          <div className="space-y-1">
            {templates.map((t) => {
              const isSelected = selectedTemplate === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    onChange(t.id);
                    setIsOpen(false);
                  }}
                  className={`group relative flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {/* Icon Box */}
                  <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm"
                  }`}>
                    {t.icon}
                  </div>

                  <div className="flex-1">
                    <h5 className="font-bold text-sm leading-none mb-1">
                      {t.name}
                    </h5>
                    <p className="text-[10px] text-slate-500 font-medium opacity-80">
                      {t.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="size-5 bg-blue-600 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                      <Check className="size-3 text-white" strokeWidth={4} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;