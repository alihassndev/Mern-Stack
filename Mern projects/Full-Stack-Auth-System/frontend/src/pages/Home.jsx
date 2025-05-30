import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl text-center">
        <Header />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is your starting point. Explore our features and get started with
          your journey.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
          >
            Login
          </Link>
          {/* <a
            href="/register"
            className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition"
          >
            Register
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
