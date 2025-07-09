import UserManagement from "../../components/admin/UserManagement";
import SystemStats from "../../components/admin/SystemStats";
import DashboardCard from "../../components/ui/DashboardCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <DashboardCard title="User Management">
        <UserManagement />
      </DashboardCard>

      <DashboardCard title="System Statistics">
        <SystemStats />
      </DashboardCard>
    </div>
  );
}
