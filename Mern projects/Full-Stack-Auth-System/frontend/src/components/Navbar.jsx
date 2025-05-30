import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //   const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md fixed top-0 left-0 w-full">
      <div className="max-w-[90%] mx-auto flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-wide">Auth</h1>
        </Link>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200">
              Login
            </button>
          </Link>
          {/* <Link to="/register">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-200">
              Register
            </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
