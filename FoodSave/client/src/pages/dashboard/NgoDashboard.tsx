import AvailableDonations from "../../components/ngo/AvailableDonations";
import RequestHistory from "../../components/ngo/RequestHistory";
import DashboardCard from "../../components/ui/DashboardCard";

export default function NgoDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">NGO Dashboard</h1>

      <DashboardCard title="Available Donations">
        <AvailableDonations />
      </DashboardCard>

      <DashboardCard title="Your Requests">
        <RequestHistory />
      </DashboardCard>
    </div>
  );
}
