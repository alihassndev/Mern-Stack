import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

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
          type="date"
          name="DOB"
          placeholder="Date of birth"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          name="role"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="Student">Student</option>
          <option value="Professional">Professional</option>
        </select>

        <input
          type="submit"
          value="Register"
          className="w-full bg-indigo-600 text-white py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition"
        />
      </form>
    </div>
  );
};

export default Signup;
