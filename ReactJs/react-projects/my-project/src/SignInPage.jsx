import React from "react";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-green-600 font-bold text-2xl mb-1">greenFeather</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="jig@goxedints.com"
            defaultValue="jig@goxedints.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <a href="#" className="text-sm text-green-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-6">
          Sign In
        </button>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-green-600 hover:underline">
            Create your account
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-gray-500">
        UXedints
      </div>
    </div>
  );
};

export default SignInPage;