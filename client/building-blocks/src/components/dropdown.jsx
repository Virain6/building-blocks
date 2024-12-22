import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const CustomDropdown = ({ value, onChange, options, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col min-w-[200px]" ref={dropdownRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          className="w-full border bg-gray-100 border-gray-400 rounded-lg px-4 py-2 shadow-sm text-left text-gray-900 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber-500"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <FiChevronDown className="ml-2 text-gray-500" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false); // Close dropdown on selection
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
