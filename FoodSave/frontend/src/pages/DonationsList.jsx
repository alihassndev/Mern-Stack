import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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

  // Filter states
  const [filters, setFilters] = useState({
    status: "available",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchDonations();
  }, [filters.status, filters.category, debouncedSearchTerm]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.status) params.append("status", filters.status);
      if (filters.category) params.append("category", filters.category);

      const response = await api.get(`/donations?${params.toString()}`);
      let filteredDonations = response.data.data;

      // Client-side search filter
      if (debouncedSearchTerm) {
        filteredDonations = filteredDonations.filter(
          (donation) =>
            donation.title
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            donation.foodName
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            donation.description
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
        );
      }

      setDonations(filteredDonations);
    } catch (err) {
      setError("Failed to load donations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      fetchDonations();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to send request.",
        "error"
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-50 text-green-700 border-green-100";
      case "expired":
        return "bg-red-50 text-red-700 border-red-100";
      case "reserved":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      case "collected":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
            Error loading donations
          </h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={fetchDonations}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Pickup Modal */}
        {pickupModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Request Pickup
                  </h2>
                  <button
                    onClick={() =>
                      setPickupModal({ open: false, donationId: null })
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Time *
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="3"
                      value={pickupMsg}
                      onChange={(e) => setPickupMsg(e.target.value)}
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() =>
                      setPickupModal({ open: false, donationId: null })
                    }
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestPickup}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Food Donations
              </h1>
              <p className="text-gray-600">
                {filters.status === "available"
                  ? "Available donations ready for pickup"
                  : filters.status === "expired"
                  ? "Expired donations"
                  : "All donations"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {user?.role === "donor" && (
                <Link
                  to="/donations/new"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  New Donation
                </Link>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Search donations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="available">Available</option>
                  <option value="expired">Expired</option>
                  <option value="reserved">Reserved</option>
                  <option value="collected">Collected</option>
                  <option value="">All Statuses</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  <option value="">All Categories</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="bakery">Bakery</option>
                  <option value="meals">Meals</option>
                  <option value="dairy">Dairy</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Grid */}
        {donations.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No donations found
            </h3>
            <p className="text-gray-600 mb-6">
              {user?.role === "donor"
                ? "Create your first donation to help those in need"
                : "Try adjusting your filters or check back later"}
            </p>
            {user?.role === "donor" && (
              <Link
                to="/donations/new"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Donation
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                {donation.images?.[0] && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={donation.images[0]}
                      alt={donation.title || donation.foodName}
                      className="w-full h-full object-cover"
                    />
                    {isExpired(donation.expiryDate) && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Expired
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {donation.title || donation.foodName}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        donation.status
                      )}`}
                    >
                      {donation.status.charAt(0).toUpperCase() +
                        donation.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {donation.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="font-medium">{donation.quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Expires:</span>
                      <span
                        className={`font-medium ${
                          isExpired(donation.expiryDate)
                            ? "text-red-600"
                            : "text-gray-900"
                        }`}
                      >
                        {new Date(donation.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    {donation.category && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium capitalize">
                          {donation.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {user?.role === "ngo" && donation.status === "available" && (
                    <button
                      onClick={() =>
                        setPickupModal({ open: true, donationId: donation._id })
                      }
                      className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Request Pickup
                    </button>
                  )}
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
