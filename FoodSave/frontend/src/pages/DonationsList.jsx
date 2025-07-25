import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const DonationsList = ({ showToast }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [pickupModal, setPickupModal] = useState({
    open: false,
    donationId: null,
  });
  const [pickupTime, setPickupTime] = useState("");
  const [pickupMsg, setPickupMsg] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await api.get("/foodDonations");
        setDonations(response.data.data);
      } catch (err) {
        setError("Failed to load donations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleRequestPickup = async () => {
    if (!pickupTime) {
      showToast("Pickup time is required.", "error");
      return;
    }
    try {
      await api.post("/pickups", {
        donationId: pickupModal.donationId,
        proposedPickupTime: pickupTime,
        message: pickupMsg,
      });
      showToast("Pickup request sent!", "success");
      setPickupModal({ open: false, donationId: null });
      setPickupTime("");
      setPickupMsg("");
      // Optionally, refresh donations list
      setLoading(true);
      const response = await api.get("/foodDonations");
      setDonations(response.data.data);
      setLoading(false);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to send request.",
        "error"
      );
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
        {/* Pickup Modal */}
        {pickupModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Request Pickup</h2>
              <label className="block mb-2 font-medium">
                Proposed Pickup Time
              </label>
              <input
                type="datetime-local"
                className="w-full border rounded px-3 py-2 mb-4"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
              <label className="block mb-2 font-medium">
                Message (optional)
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 mb-4"
                value={pickupMsg}
                onChange={(e) => setPickupMsg(e.target.value)}
                placeholder="Any instructions or notes for the donor"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="btn"
                  onClick={() =>
                    setPickupModal({ open: false, donationId: null })
                  }
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleRequestPickup}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Available Donations
          </h1>
          {user?.role === "donor" && (
            <Link to="/donations/new" className="btn btn-primary">
              Create Donation
            </Link>
          )}
        </div>

        {donations.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No donations available
            </h3>
            <p className="text-gray-600">
              {user?.role === "donor"
                ? "Create your first donation to help those in need."
                : "Check back later for available donations."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {donation.images && donation.images.length > 0 && (
                  <img
                    src={donation.images[0]}
                    alt={donation.foodName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {donation.foodName}
                  </h3>
                  <p className="text-gray-600 mb-2">{donation.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Quantity: {donation.quantity}</span>
                    <span>
                      Expires:{" "}
                      {new Date(donation.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        donation.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status.charAt(0).toUpperCase() +
                        donation.status.slice(1)}
                    </span>
                    {user?.role === "ngo" &&
                      donation.status === "available" && (
                        <button
                          className="btn btn-primary text-sm"
                          onClick={() =>
                            setPickupModal({
                              open: true,
                              donationId: donation._id,
                            })
                          }
                        >
                          Request Pickup
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsList;
