import React, { useState } from "react";

const ToggleBackgroundColor = () => {
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        isDark ? "bg-[#1b1b1b] text-white" : "bg-white text-[#1b1b1b]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Toggle Background Color</h1>

      <button
        onClick={handleClick}
        className={`py-2 px-6 border-2 rounded-lg font-semibold transition-all duration-300 ${
          isDark
            ? "bg-white text-[#1b1b1b] border-white hover:bg-gray-100"
            : "bg-[#1b1b1b] text-white border-[#1b1b1b] hover:bg-[#2c2c2c]"
        }`}
      >
        {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
    </div>
  );
};

export default ToggleBackgroundColor;
