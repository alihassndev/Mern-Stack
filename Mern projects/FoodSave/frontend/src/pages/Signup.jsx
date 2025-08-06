import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    DOB: "",
    role: "donor",
  });
  const [formError, setFormError] = useState("");
  const { register, error } = useAuth();
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
      await register(formData);
      navigate("/signin");
    } catch (err) {
      setFormError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary-700">
          Join FoodSave
        </h2>

        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {formError || error}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          className="input-field mb-4"
          required
        />

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
          className="input-field mb-4"
          required
        />

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">I am a:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="donor">Food Donor</option>
            <option value="ngo">NGO / Food Bank</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mb-4">
          Register
        </button>

        <div className="text-center">
          <p className="text-gray-600 mb-2">Already have an account?</p>
          <Link
            to="/signin"
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
