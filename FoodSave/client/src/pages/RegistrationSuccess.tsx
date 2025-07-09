import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";

export default function RegistrationSuccess() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/register");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
        <p className="mb-6 text-gray-600">
          Welcome, {user.name}! Your {user.role === "donor" ? "donor" : "NGO"}{" "}
          account is ready.
        </p>
        <Button onClick={() => navigate("/dashboard")} className="w-full">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
