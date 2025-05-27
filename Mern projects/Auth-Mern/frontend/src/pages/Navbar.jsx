import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex w-full px-16 justify-between items-center h-16 bg-blue-950 text-white mx-auto">
        <div className="font-bold text-lg">
          <Link to={"/"}>Auth</Link>
        </div>

        <div className="flex gap-5">
          <div className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
            <Link to={"/signup"}>Register</Link>
          </div>
          <div className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
            <Link to={"/signin"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
