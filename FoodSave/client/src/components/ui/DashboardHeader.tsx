import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          FoodSave
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Hello, {user?.name}</span>
          <Button onClick={logout} variant="secondary" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
