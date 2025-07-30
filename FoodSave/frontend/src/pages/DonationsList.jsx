import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import MapComponent from "../components/MapComponent";

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

// Enhanced donation card component
const DonationCard = ({ donation, onRequestPickup, user }) => {
  const [showMap, setShowMap] = useState(false);
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
      reserved: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
      collected: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '📦' },
      expired: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
      delivered: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🚚' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className="mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      fruits: '🍎',
      vegetables: '🥕',
      bakery: '🍞',
      meals: '🍽️',
      dairy: '🥛',
      other: '📦'
    };
    return icons[category] || icons.other;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {donation.images && donation.images.length > 0 ? (
          <img
            src={donation.images[0]}
            alt={donation.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-6xl">{getCategoryIcon(donation.category)}</span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(donation.status)}
        </div>
        
        {/* Pickup Request Badge */}
        {donation.hasActivePickupRequest && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            📋 Request Pending
          </div>
        )}
        
        {/* Expiry Warning */}
        {new Date(donation.expiryDate) < new Date() && (
          <div className="absolute top-12 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Expired
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
            {donation.title}
          </h3>
          <span className="ml-2 text-2xl">{getCategoryIcon(donation.category)}</span>
        </div>

        {/* Description */}
        {donation.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {donation.description}
          </p>
        )}
        
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📊</span>
            <span className="font-medium">Quantity:</span>
            <span className="ml-1 font-semibold text-gray-900">{donation.quantity}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">⏰</span>
            <span className="font-medium">Expires:</span>
            <span className={`ml-1 font-semibold ${
              new Date(donation.expiryDate) < new Date()
                ? "text-red-600"
                : "text-gray-900"
            }`}>
              {new Date(donation.expiryDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Location */}
        {donation.location?.address && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="mr-2">📍</span>
            <span className="font-medium">Location:</span>
            <span className="ml-1 text-gray-900">{donation.location.address}</span>
          </div>
        )}

        {/* Donor Info */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="mr-2">👤</span>
          <span>By: <span className="font-medium text-gray-900">{donation.donor?.username || 'Anonymous'}</span></span>
        </div>
        
        {/* Enhanced Pickup Request Info */}
        {donation.hasActivePickupRequest && donation.pickupRequests && donation.pickupRequests.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
            <div className="flex items-center text-sm text-orange-800 mb-2">
              <span className="mr-2">📋</span>
              <span className="font-medium">Pickup Request Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">NGO:</span>
                <span className="font-medium text-orange-700">
                  {donation.pickupRequests[0]?.ngo?.username || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-orange-600">
                  {donation.pickupRequests[0]?.status || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Time:</span>
                <span className="font-medium text-gray-900">
                  {donation.pickupRequests[0]?.proposedPickupTime 
                    ? new Date(donation.pickupRequests[0].proposedPickupTime).toLocaleString()
                    : 'N/A'
                  }
                </span>
              </div>
              {donation.pickupRequests[0]?.driver?.name && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Driver:</span>
                    <span className="font-medium text-gray-900">
                      {donation.pickupRequests[0].driver.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium text-gray-900">
                      {donation.pickupRequests[0].driver.contact}
                    </span>
                  </div>
                </>
              )}
              {donation.pickupRequests[0].message && (
                <div className="mt-2 pt-2 border-t border-orange-200">
                  <span className="text-gray-600 text-xs">Message:</span>
                  <p className="text-gray-800 text-xs mt-1">
                    {donation.pickupRequests[0].message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Map Toggle Button */}
        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full mb-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">🗺️</span>
          {showMap ? 'Hide Map' : 'Show Location on Map'}
        </button>

        {/* Map Component */}
        {showMap && (
          <MapComponent 
            location={donation.location}
            donorName={donation.donor?.username}
            foodTitle={donation.title}
          />
        )}
        
        {/* Action Button */}
        {user?.role === 'ngo' && donation.status === 'available' && (
          <>
            {!donation.hasActivePickupRequest ? (
              <button
                onClick={() => onRequestPickup(donation._id)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
              >
                🚚 Request Pickup
              </button>
            ) : (
              <div className="w-full bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-medium text-center">
                📋 Pickup Request Already Sent
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Main DonationsList component
const DonationsList = ({ showToast }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "", category: "" });
  const [pickupModal, setPickupModal] = useState({ open: false, donationId: null });
  const [pickupTime, setPickupTime] = useState("");
  const [pickupMsg, setPickupMsg] = useState("");
  // ADD THESE TWO MISSING STATE VARIABLES:
  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const { user } = useAuth();
  
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

      // Apply search filter
      if (debouncedSearchTerm) {
        filteredDonations = filteredDonations.filter(
          (donation) =>
            donation.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            donation.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            donation.location?.address?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      }

      setDonations(filteredDonations);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch donations");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPickup = async () => {
    if (!pickupTime || !pickupMsg || !driverName || !driverContact) {
      showToast("Please fill in all fields including driver details", "error");
      return;
    }

    // Find the current donation to get expiry date
    const currentDonation = donations.find(d => d._id === pickupModal.donationId);
    if (!currentDonation) {
      showToast("Donation not found", "error");
      return;
    }

    // Validate pickup time against expiry date
    const pickupDate = new Date(pickupTime);
    const expiryDate = new Date(currentDonation.expiryDate);
    const currentDate = new Date();

    if (pickupDate > expiryDate) {
      showToast(`Pickup time cannot be after the food expiry date (${expiryDate.toLocaleDateString()})`, "error");
      return;
    }

    if (pickupDate < currentDate) {
      showToast("Pickup time cannot be in the past", "error");
      return;
    }

    try {
      await api.post("/pickups", {
        donationId: pickupModal.donationId,
        proposedPickupTime: pickupTime,
        message: pickupMsg,
        driverName: driverName,
        driverContact: driverContact
      });

      showToast("Pickup request sent successfully!", "success");
      setPickupModal({ open: false, donationId: null });
      setPickupTime("");
      setPickupMsg("");
      setDriverName("");
      setDriverContact("");
      
      // Update the specific donation's hasActivePickupRequest immediately
      setDonations(prevDonations => 
        prevDonations.map(donation => 
          donation._id === pickupModal.donationId 
            ? { ...donation, hasActivePickupRequest: true }
            : donation
        )
      );
      
      // Fetch updated data after a short delay
      setTimeout(() => {
        fetchDonations();
      }, 500);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send pickup request", "error");
    }
  };

  const updateStatus = async (donationId, newStatus) => {
    try {
      await api.patch(`/donations/status/${donationId}`, { status: newStatus });
      showToast("Donation status updated to delivered!", "success");
      fetchDonations();
    } catch (err) {
      showToast("Failed to update donation status", "error");
    }
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
        {pickupModal.open && (() => {
          const currentDonation = donations.find(d => d._id === pickupModal.donationId);
          const maxDate = currentDonation ? new Date(currentDonation.expiryDate).toISOString().slice(0, 16) : "";
          
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Request Pickup
                    </h2>
                    <button
                      onClick={() => setPickupModal({ open: false, donationId: null })}
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

                  {/* Show expiry date warning */}
                  {currentDonation && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ <strong>Food expires on:</strong> {new Date(currentDonation.expiryDate).toLocaleDateString()}
                        <br />
                        Pickup must be scheduled before this date.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Time
                      </label>
                      <input
                        type="datetime-local"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        max={maxDate} // Prevent selecting dates after expiry
                        min={new Date().toISOString().slice(0, 16)} // Prevent past dates
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={pickupMsg}
                        onChange={(e) => setPickupMsg(e.target.value)}
                        placeholder="Additional message for the donor..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="3"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Name
                      </label>
                      <input
                        type="text"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="Driver's full name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Contact
                      </label>
                      <input
                        type="tel"
                        value={driverContact}
                        onChange={(e) => setDriverContact(e.target.value)}
                        placeholder="Driver's phone number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setPickupModal({ open: false, donationId: null })}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRequestPickup}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

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

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Search & Filter</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Donations
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">All Statuses</option>
                  <option value="available">✅ Available</option>
                  <option value="reserved">⏳ Reserved</option>
                  <option value="collected">📦 Collected</option>
                  <option value="expired">❌ Expired</option>
                  <option value="delivered">🚚 Delivered</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">All Categories</option>
                  <option value="fruits">🍎 Fruits</option>
                  <option value="vegetables">🥕 Vegetables</option>
                  <option value="bakery">🍞 Bakery</option>
                  <option value="meals">🍽️ Meals</option>
                  <option value="dairy">🥛 Dairy</option>
                  <option value="other">📦 Other</option>
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
              <DonationCard
                key={donation._id}
                donation={donation}
                onRequestPickup={(donationId) => setPickupModal({ open: true, donationId })}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationsList;
