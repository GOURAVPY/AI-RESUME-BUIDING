import { Check, Palette, ChevronDown, Pipette } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const colors = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Green", value: "#22c55e" },
    { name: "Lime", value: "#84cc16" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Orange", value: "#f97316" },
    { name: "Red", value: "#ef4444" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Pink", value: "#ec4899" },
    { name: "Purple", value: "#a855f7" },
    { name: "Gray", value: "#6b7280" },
    { name: "Slate", value: "#475569" },
    { name: "Black", value: "#111827" },
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
      
      {/* Main Trigger Button - Responsive Text */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full border transition-all duration-300 ${
          isOpen 
          ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
          : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 shadow-sm"
        }`}
      >
        <Palette size={16} className={isOpen ? "animate-pulse" : "text-indigo-500"} />
        
        {/* Hidden on Mobile/Tablet (below 768px) */}
        <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Theme</span>
        
        {/* Dynamic Color Circle */}
        <div 
          className="size-4 md:size-5 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-110" 
          style={{ backgroundColor: selectedColor }} 
        />

        <ChevronDown size={14} className={`hidden md:block transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Popover - Center aligned on mobile */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 mt-3 p-5 z-[100] bg-white/95 backdrop-blur-xl rounded-[2rem] border border-slate-200 shadow-2xl w-[260px] md:w-[280px] animate-in fade-in zoom-in-95 duration-200 origin-top">
          
          <div className="flex items-center justify-between mb-4 px-1">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Presets</h4>
             <span className="text-[10px] font-mono text-slate-400">{selectedColor.toUpperCase()}</span>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-3 mb-6">
            {colors.map((color) => (
              <button
                key={color.value}
                title={color.name}
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
                className="relative group size-9 md:size-10 rounded-xl transition-all duration-300 hover:scale-110 active:scale-90 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: color.value }}
              >
                <div className="absolute inset-0 border-2 border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {selectedColor.toLowerCase() === color.value.toLowerCase() && (
                  <div className="bg-white/20 backdrop-blur-sm size-full flex items-center justify-center animate-in zoom-in duration-300">
                    <Check className="size-4 md:size-5 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Custom Color Selection */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 group focus-within:border-indigo-300 transition-all">
                <div className="relative size-9 md:size-10 shrink-0">
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 opacity-0 size-full cursor-pointer z-10"
                    />
                    <div 
                        className="size-full rounded-xl border-2 border-white shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: selectedColor }}
                    >
                        <Pipette size={14} className="text-white mix-blend-difference" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Custom</span>
                    <span className="text-[11px] font-bold text-slate-700">Pick color...</span>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;