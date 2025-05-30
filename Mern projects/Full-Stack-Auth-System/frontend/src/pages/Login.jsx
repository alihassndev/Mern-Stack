import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [mode, setMode] = useState("Sign Up"); // "Sign Up" | "Login"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* helper to clear inputs after success */
  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // ---------- SIGN-UP ----------
      if (mode === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/v1/users/register`,
          { username, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success("Account created successfully");
          setIsLoggedin(true);
          resetFields();
          getUserData();
          setMode("Login");
          navigate("/login"); // or wherever you like
        } else {
          toast.error(data.message);
        }

        // ---------- LOGIN ----------
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/v1/users/login`,
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success("Logged in successfully");
          setIsLoggedin(true);
          resetFields();
          getUserData();
          navigate("/"); // change to your desired route
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 px-4">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-10 w-full max-w-md">
        {/* ---------- Heading ---------- */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            {mode === "Sign Up" ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {mode === "Sign Up"
              ? "Start your journey with us"
              : "Login to continue"}
          </p>
        </div>

        {/* ---------- Form ---------- */}
        <form onSubmit={onSubmitHandler} className="space-y-5">
          {mode === "Sign Up" && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200"
          >
            {mode === "Sign Up" ? "Register" : "Login"}
          </button>
        </form>

        {/* ---------- Switch mode ---------- */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          {mode === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setMode("Login")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("Sign Up")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
