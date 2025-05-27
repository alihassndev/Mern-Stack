import React from "react";

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="submit"
          value="Login"
          className="w-full bg-indigo-600 text-white py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition"
        />
      </form>
    </div>
  );
};

export default Signin;
