import React from "react";

const Button = ({ children }) => {
  return (
    <button className="cursor-pointer px-4 py-2 hover:bg-blue-600 border rounded-lg hover:text-white transition duration-200">
      {children}
    </button>
  );
};

export default Button;
