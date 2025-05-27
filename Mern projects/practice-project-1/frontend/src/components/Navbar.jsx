// import React, { useState } from "react";

import Button from "./Button"; // Adjust path if needed
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [colorMode, setColorMode] = useState("light");
  // const useColorMode = () => {
  //   colorMode === "light" ? setColorMode("dark") : setColorMode("light");
  // };
  return (
    <div className="w-full absolute top-0 left-0 flex items-center justify-between px-10 py-4 bg-gray-100 shadow">
      {/* Logo Section */}
      <div className="text-xl font-bold text-blue-600">
        <a href="/">MyLogo</a>
      </div>

      {/* Buttons Section */}
      <div className="flex gap-4">
        <Link to="/create">
          <Button>Add Product</Button>
        </Link>
        {/* <div onClick={useColorMode}>
          <Button>{colorMode === "light" ? "Dark" : "Light"}</Button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
