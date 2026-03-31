import { Check, Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#22c55e" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#eab308" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Lime", value: "#84cc16" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#111827" },
  ];

  return (
    <div className="relative inline-block">
      
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-1 ring-purple-200 hover:ring-purple-400 transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span>Accent</span>

        {/* Selected color preview */}
        <span
          className="w-4 h-4 rounded-full border"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="grid grid-cols-4 w-64 gap-3 absolute top-full left-0 mt-2 p-3 z-50 bg-white rounded-xl border border-gray-200 shadow-lg">
          
          {/* Preset Colors */}
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer flex flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  selectedColor === color.value
                    ? "border-black scale-105"
                    : "border-transparent hover:border-black/30"
                }`}
                style={{ backgroundColor: color.value }}
              />

              {/* Check Icon */}
              {selectedColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="size-5 text-white drop-shadow" />
                </div>
              )}

              <p className="text-xs mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}

          {/* Divider */}
          <div className="col-span-4 border-t pt-2 mt-1 text-xs text-gray-500">
            Custom Color
          </div>

          {/* Custom Color Picker */}
          <div className="col-span-4">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              className="w-full h-10 cursor-pointer border rounded-md"
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default ColorPicker;