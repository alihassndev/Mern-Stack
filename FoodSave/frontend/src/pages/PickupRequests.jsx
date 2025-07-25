import { useState, useEffect } from "react";
import api from "../utils/axios";

const PickupRequests = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const response = await api.get("/pickups");
        setPickups(response.data.data);
      } catch (err) {
        setError("Failed to load pickup requests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPickups();
  }, []);

  const updatePickupStatus = async (pickupId, status) => {
    try {
      await api.patch(`/pickups/${pickupId}/status`, { status });
      
      // Update local state
      setPickups(pickups.map(pickup => 
        pickup._id === pickupId ? { ...pickup, status } : pickup
      ));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto bg-red-100 p-4 rounded-md text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Pickup Requests</h1>

        {pickups.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No pickup requests yet</h3>
            <p className="text-gray-600">
              Browse available donations to request pickups.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pickups.map((pickup) => (
              <div key={pickup._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{pickup.foodDonation?.foodName || "Food Donation"}</h3>
                    <p className="text-gray-600">{pickup.foodDonation?.description}</p>
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-md">
                    <p className="text-sm font-medium">Status: 
                      <span className={`ml-2 ${getStatusColor(pickup.status)}`}>
                        {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location:</p>
                    <p className="font-medium">{pickup.foodDonation?.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Requested on:</p>
                    <p className="font-medium">{new Date(pickup.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {pickup.status === "pending" && (
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => updatePickupStatus(pickup._id, "cancelled")}
                      className="btn btn-secondary text-sm"
                    >
                      Cancel Request
                    </button>
                  </div>
                )}
                
                {pickup.status === "accepted" && (
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => updatePickupStatus(pickup._id, "completed")}
                      className="btn btn-primary text-sm"
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600";
    case "accepted":
      return "text-blue-600";
    case "completed":
      return "text-green-600";
    case "cancelled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default PickupRequests;