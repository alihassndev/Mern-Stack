import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const HiddenSearchBar = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      onClick={() => setShow(true)}
    >
      <div className="">
        {show ? (
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 shadow-md transition-all duration-300"
          />
        ) : (
          <FaSearch className="text-gray-500 cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default HiddenSearchBar;
