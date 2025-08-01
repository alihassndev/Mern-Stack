import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setFormError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary-700">Login to FoodSave</h2>
        
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {formError || error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="input-field mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="input-field mb-6"
          required
        />

        <button 
          type="submit"
          className="btn btn-primary w-full mb-4"
        >
          Login
        </button>

        <div className="text-center">
          <p className="text-gray-600 mb-2">Don't have an account?</p>
          <Link to="/signup" className="text-primary-600 hover:text-primary-800 font-medium">
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
