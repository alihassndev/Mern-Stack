import { useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const PickupRequests = ({ showToast }) => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    pickupId: null,
  });
  const [feedback, setFeedback] = useState({ rating: 5, comment: "" });
  const { user } = useAuth();

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      setLoading(true);
      const response = await api.get("/pickups");
      setPickups(response.data.data.requests); // Changed from response.data.data to response.data.data.requests
    } catch (err) {
      console.error("Failed to fetch pickups:", err);
      setError("Failed to load pickup requests");
      showToast("Failed to load pickup requests", "error");
    } finally {
      setLoading(false);
    }
  };

  // Simplified function to handle donor status updates (accept/reject only)
  const updatePickupStatus = async (pickupId, status) => {
    try {
      await api.patch(`/pickups/${pickupId}/status`, {
        status,
      });
      setPickups(
        pickups.map((pickup) =>
          pickup._id === pickupId ? { ...pickup, status } : pickup
        )
      );
      showToast(`Pickup request ${status} successfully!`, "success");
    } catch (err) {
      console.error("Failed to update pickup status:", err);
      showToast("Failed to update pickup status. Please try again.", "error");
    }
  };

  // For both NGO and donor to complete pickup requests
  const completePickupRequest = async (pickupId) => {
    try {
      // Changed from pickupId to requestId to match backend
      await api.patch(`/pickups/${pickupId}/complete`);
      setPickups(
        pickups.map((pickup) =>
          pickup._id === pickupId
            ? { ...pickup, status: "completed", completedAt: new Date() }
            : pickup
        )
      );
      showToast("Pickup marked as completed successfully!", "success");
    } catch (err) {
      console.error("Failed to complete pickup:", err);
      console.error("Error response:", err.response?.data);
      showToast(
        err.response?.data?.message || "Failed to complete pickup. Please try again.", 
        "error"
      );
    }
  };

  // Only NGO can cancel pickup requests
  const cancelPickupRequest = async (pickupId) => {
    try {
      // The endpoint is correct, pickupId maps to requestId parameter
      await api.delete(`/pickups/${pickupId}`);
      setPickups(pickups.filter((pickup) => pickup._id !== pickupId));
      showToast("Pickup request cancelled successfully!", "success");
    } catch (err) {
      console.error("Failed to cancel pickup:", err);
      console.error("Error response:", err.response?.data); // Add detailed error logging
      showToast(
        err.response?.data?.message || "Failed to cancel pickup. Please try again.", 
        "error"
      );
    }
  };

  const submitFeedback = async () => {
    try {
      await api.post(`/pickups/${feedbackModal.pickupId}/feedback`, feedback);
      showToast("Feedback submitted successfully!", "success");
      setFeedbackModal({ open: false, pickupId: null });
      setFeedback({ rating: 5, comment: "" });
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      showToast("Failed to submit feedback. Please try again.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pickup requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPickups}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-10 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pickup Requests
          </h1>
          <p className="text-gray-600">
            {user?.role === "donor"
              ? "Manage pickup requests for your donations"
              : "View and manage your pickup requests"}
          </p>
        </div>

        {pickups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No pickup requests found
            </h3>
            <p className="text-gray-600">
              {user?.role === "donor"
                ? "No one has requested to pick up your donations yet."
                : "You haven't made any pickup requests yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pickups.map((pickup) => (
              <PickupRequestCard
                key={pickup._id}
                pickup={pickup}
                user={user}
                onStatusUpdate={updatePickupStatus}
                onCompletePickup={completePickupRequest}
                onCancelPickup={cancelPickupRequest}
                onSubmitFeedback={() =>
                  setFeedbackModal({ open: true, pickupId: pickup._id })
                }
              />
            ))}
          </div>
        )}

        {/* Feedback Modal */}
        {feedbackModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Leave Feedback
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <select
                      value={feedback.rating}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          rating: Number(e.target.value),
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={feedback.comment}
                      onChange={(e) =>
                        setFeedback({ ...feedback, comment: e.target.value })
                      }
                      placeholder="Share your experience..."
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={submitFeedback}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Submit Feedback
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackModal({ open: false, pickupId: null });
                      setFeedback({ rating: 5, comment: "" });
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600";
    case "accepted":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "completed":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

// Simplified pickup request card
const PickupRequestCard = ({
  pickup,
  user,
  onStatusUpdate,
  onCompletePickup,
  onCancelPickup,
  onSubmitFeedback,
}) => {
  const isDonor = user?.role === "donor";
  const isNGO = user?.role === "ngo";

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: "bg-yellow-50 border-yellow-200",
        badge: "bg-yellow-100 text-yellow-800",
        icon: "⏳",
        color: "text-yellow-700",
      },
      accepted: {
        bg: "bg-green-50 border-green-200",
        badge: "bg-green-100 text-green-800",
        icon: "✅",
        color: "text-green-700",
      },
      rejected: {
        bg: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-800",
        icon: "❌",
        color: "text-red-700",
      },
      completed: {
        bg: "bg-blue-50 border-blue-200",
        badge: "bg-blue-100 text-blue-800",
        icon: "🎉",
        color: "text-blue-700",
      },
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(pickup.status);

  return (
    <div
      className={`border-2 rounded-xl p-6 ${statusConfig.bg} transition-all duration-200 hover:shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{statusConfig.icon}</span>
            <h3 className="text-xl font-bold text-gray-900">
              {pickup.donation?.title || "Food Donation"}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.badge}`}
            >
              {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Request ID: {pickup._id.slice(-8)}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <span className="mr-2">👤</span>
            <span className="font-medium text-gray-700">
              {isDonor ? "NGO:" : "Donor:"}
            </span>
            <span className="ml-2 text-gray-900">
              {isDonor
                ? pickup.ngo?.username
                : pickup.donation?.donor?.username}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <span className="mr-2">📅</span>
            <span className="font-medium text-gray-700">Pickup Time:</span>
            <span className="ml-2 text-gray-900">
              {new Date(pickup.proposedPickupTime).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <span className="mr-2">🕒</span>
            <span className="font-medium text-gray-700">Requested:</span>
            <span className="ml-2 text-gray-900">
              {new Date(pickup.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Right Column - Donation Details */}
        <div className="space-y-3">
          {pickup.donation?.quantity && (
            <div className="flex items-center text-sm">
              <span className="mr-2">📊</span>
              <span className="font-medium text-gray-700">Quantity:</span>
              <span className="ml-2 text-gray-900">
                {pickup.donation.quantity}
              </span>
            </div>
          )}

          {pickup.donation?.category && (
            <div className="flex items-center text-sm">
              <span className="mr-2">🏷️</span>
              <span className="font-medium text-gray-700">Category:</span>
              <span className="ml-2 text-gray-900 capitalize">
                {pickup.donation.category}
              </span>
            </div>
          )}

          {pickup.status === "completed" && pickup.completionTime && (
            <div className="flex items-center text-sm">
              <span className="mr-2">✅</span>
              <span className="font-medium text-gray-700">Completed:</span>
              <span className="ml-2 text-gray-900">
                {new Date(pickup.completionTime).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Driver Information */}
      {pickup.driver?.name && (
        <div className="mb-4 p-3 bg-white/50 rounded-lg">
          <div className="flex items-center text-sm mb-2">
            <span className="mr-2">🚗</span>
            <span className="font-medium text-gray-700">
              Driver Information
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">{pickup.driver.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Contact:</span>
              <span className="ml-2 font-medium">{pickup.driver.contact}</span>
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      {pickup.message && (
        <div className="mb-4 p-3 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Message:</span> {pickup.message}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        {/* Donor-specific actions - simplified */}
        {isDonor && pickup.status === "pending" && (
          <>
            <button
              onClick={() => onStatusUpdate(pickup._id, "accepted")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
            >
              ✅ Accept Request
            </button>
            <button
              onClick={() => onStatusUpdate(pickup._id, "rejected")}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
            >
              ❌ Reject Request
            </button>
          </>
        )}

        {/* Only show complete button for accepted requests */}
        {pickup.status === "accepted" && (
          <button
            onClick={() => onCompletePickup(pickup._id)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
          >
            ✅ Mark as Completed
          </button>
        )}

        {/* Only NGO can cancel requests - removed for donors */}
        {isNGO && pickup.status !== "completed" && (
          <button
            onClick={() => onCancelPickup(pickup._id)}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
          >
            🗑️ Cancel Request
          </button>
        )}

        {/* NGO feedback for completed requests */}
        {isNGO && pickup.status === "completed" && (
          <button
            onClick={() => onSubmitFeedback(pickup._id)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
          >
            ⭐ Leave Feedback
          </button>
        )}
      </div>
    </div>
  );
};

export default PickupRequests;
