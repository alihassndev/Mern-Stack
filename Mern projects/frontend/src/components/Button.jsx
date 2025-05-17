import React from "react";

const Button = ({ children }) => {
  return (
    <button className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
      {children}
    </button>
  );
};

export default Button;
