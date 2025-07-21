import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        action={"/api/v1/users/register"}
        method="POST"
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
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

        <Link to={"/signin"}>
          <input
            type="submit"
            value="Register"
            className="w-full bg-indigo-600 text-white py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition"
          />
        </Link>

        <Link to={"/signin"}>
          <div className="w-full my-5 border rounded-md p-3 border-gray-400 text-center hover:bg-blue-100 transition-all duration-300">
            Already have account <span className="text-blue-600">Sign In</span>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
