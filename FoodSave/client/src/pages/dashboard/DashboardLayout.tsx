import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/ui/DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardSidebar role={user?.role || "donor"} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
