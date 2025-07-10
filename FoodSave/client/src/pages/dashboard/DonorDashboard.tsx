import AvailableDonations from "../../components/ngo/AvailableDonations";
import RequestHistory from "../../components/ngo/RequestHistory";
import DashboardCard from "../../components/ui/DashboardCard";
import { useState } from "react";

export default function NgoDashboard() {
  const [activeTab, setActiveTab] = useState<"available" | "history">(
    "available"
  );

  return (
    <div className="space-y-6">
      <div className="flex border-b">
        <button
          className={`pb-2 px-4 ${activeTab === "available" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("available")}
        >
          Available Donations
        </button>
        <button
          className={`pb-2 px-4 ${activeTab === "history" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("history")}
        >
          Request History
        </button>
      </div>

      <DashboardCard>
        {activeTab === "available" ? (
          <AvailableDonations />
        ) : (
          <RequestHistory />
        )}
      </DashboardCard>
    </div>
  );
}
