import { Link } from "react-router-dom";

export default function DonorDashboard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Donor Dashboard</h1>
      <p>
        Welcome to your donor dashboard. Here you can manage food donations.
      </p>

      {/* Add your dashboard content here */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/donate"
            className="bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <h3 className="font-medium">Donate Food</h3>
            <p className="text-sm text-gray-600">
              Post available food donations
            </p>
          </Link>
          <Link
            to="/dashboard/history"
            className="bg-green-100 p-4 rounded-lg hover:bg-green-200 transition-colors"
          >
            <h3 className="font-medium">Donation History</h3>
            <p className="text-sm text-gray-600">View your past donations</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
