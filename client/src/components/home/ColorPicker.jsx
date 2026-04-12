import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Palette, ChevronDown, Pipette } from "lucide-react";

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
      {/* Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full border transition-all duration-500 ${
          isOpen
            ? "bg-slate-900 border-slate-900 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
            : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 shadow-sm"
        }`}
      >
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Palette size={16} className={isOpen ? "text-green-400" : "text-indigo-500"} />
        </motion.div>
        
        <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.15em]">
          Theme
        </span>
        
        <div 
          className="size-4 md:size-5 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 transition-transform" 
          style={{ backgroundColor: selectedColor }} 
        />

        <ChevronDown 
          size={14} 
          className={`hidden md:block opacity-40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} 
        />
      </motion.button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 mt-4 p-6 z-[100] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200/60 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] w-[280px] origin-top"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 px-1">
               <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">System Palette</h4>
               <div className="px-2 py-0.5 rounded-md bg-slate-100 text-[9px] font-mono font-bold text-slate-500">
                 {selectedColor.toUpperCase()}
               </div>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {colors.map((color, i) => (
                <motion.button
                  key={color.value}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onChange(color.value);
                    setIsOpen(false);
                  }}
                  className="relative size-10 rounded-xl flex items-center justify-center overflow-hidden shadow-sm"
                  style={{ backgroundColor: color.value }}
                >
                  <div className="absolute inset-0 border-2 border-white/30 rounded-xl" />
                  {selectedColor.toLowerCase() === color.value.toLowerCase() && (
                    <motion.div 
                      layoutId="check"
                      className="bg-white/20 backdrop-blur-[2px] size-full flex items-center justify-center"
                    >
                      <Check className="size-5 text-white" strokeWidth={4} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Custom Color Footer */}
            <div className="pt-5 border-t border-slate-100">
              <motion.div 
                whileHover={{ backgroundColor: "rgba(241, 245, 249, 1)" }}
                className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-[1.5rem] border border-slate-100 transition-colors relative"
              >
                  <div className="relative size-10 shrink-0">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => onChange(e.target.value)}
                      className="absolute inset-0 opacity-0 size-full cursor-pointer z-20"
                    />
                    <motion.div 
                      animate={{ backgroundColor: selectedColor }}
                      className="size-full rounded-xl border-2 border-white shadow-md flex items-center justify-center"
                    >
                      <Pipette size={16} className="text-white mix-blend-difference" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Eyedropper</span>
                    <span className="text-xs font-bold text-slate-700">Custom Hue</span>
                  </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;