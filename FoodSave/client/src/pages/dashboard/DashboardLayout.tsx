import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/ui/DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="container mx-auto py-8 px-4">
        <Outlet /> {/* This renders the nested routes */}
      </main>
    </div>
  );
}
