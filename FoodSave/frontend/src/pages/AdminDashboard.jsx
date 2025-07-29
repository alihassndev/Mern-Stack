import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Add this import
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = ({ showToast }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation(); // Add this hook
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Data states
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [currentSection, setCurrentSection] = useState("users"); // Add state for current section

  // Form states
  const [showGuidelineForm, setShowGuidelineForm] = useState(false);
  const [editingGuideline, setEditingGuideline] = useState(null);
  const [guidelineForm, setGuidelineForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  // Get current section from URL
  const getCurrentSection = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("tab") || "users";
  };

  // Add useEffect to listen for URL changes
  useEffect(() => {
    const newSection = getCurrentSection();
    setCurrentSection(newSection);
  }, [location.search]); // Listen for search parameter changes

  // Only fetch data once when user is authenticated and is admin
  useEffect(() => {
    if (!authLoading && user?.role === "admin" && !dataLoaded) {
      setLoading(true);
      const fetchAll = async () => {
        try {
          const [usersRes, donationsRes, pickupsRes, guidelinesRes] =
            await Promise.all([
              api.get("/users"),
              api.get("/donations"),
              api.get("/pickups"),
              api.get("/guidelines"),
            ]);
          setUsers(usersRes.data.data || []);
          setDonations(donationsRes.data.data || []);
          setPickups(pickupsRes.data.data?.requests || []);
          setGuidelines(guidelinesRes.data.data || []);
          setDataLoaded(true);
        } catch (error) {
          console.error("Failed to load admin data:", error);
          showToast("Failed to load admin data", "error");
        } finally {
          setLoading(false);
        }
      };
      fetchAll();
    }
  }, [user, authLoading, dataLoaded, showToast]);

  const handleDelete = async (type, id) => {
    try {
      if (type === "user") {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
        showToast("User deleted!", "success");
      } else if (type === "donation") {
        await api.delete(`/donations/${id}`);
        setDonations(donations.filter((d) => d._id !== id));
        showToast("Donation deleted!", "success");
      } else if (type === "pickup") {
        await api.delete(`/pickups/${id}`);
        setPickups(pickups.filter((p) => p._id !== id));
        showToast("Pickup deleted!", "success");
      } else if (type === "guideline") {
        await api.delete(`/guidelines/${id}`);
        setGuidelines(guidelines.filter((g) => g._id !== id));
        showToast("Guideline deleted!", "success");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      showToast("Failed to delete item", "error");
    }
  };

  const handleGuidelineSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGuideline) {
        const response = await api.put(
          `/guidelines/${editingGuideline._id}`,
          guidelineForm
        );
        setGuidelines(
          guidelines.map((g) =>
            g._id === editingGuideline._id ? response.data.data : g
          )
        );
        showToast("Guideline updated!", "success");
      } else {
        const response = await api.post("/guidelines", guidelineForm);
        setGuidelines([response.data.data, ...guidelines]);
        showToast("Guideline created!", "success");
      }
      resetGuidelineForm();
    } catch (err) {
      console.error("Guideline save failed:", err);
      showToast(
        err.response?.data?.message || "Failed to save guideline",
        "error"
      );
    }
  };

  const resetGuidelineForm = () => {
    setGuidelineForm({ title: "", content: "", category: "", isActive: true });
    setEditingGuideline(null);
    setShowGuidelineForm(false);
  };

  const startEditGuideline = (guideline) => {
    setGuidelineForm({
      title: guideline.title,
      content: guideline.content,
      category: guideline.category || "",
      isActive: guideline.isActive,
    });
    setEditingGuideline(guideline);
    setShowGuidelineForm(true);
  };

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Get section title and description
  const getSectionInfo = () => {
    switch (currentSection) {
      case "users":
        return {
          title: "👥 Users Management",
          description: "Manage all registered users in the system",
          count: users.length,
        };
      case "donations":
        return {
          title: "🍽️ Donations Management",
          description: "Monitor and manage food donations",
          count: donations.length,
        };
      case "pickups":
        return {
          title: "🚚 Pickups Management",
          description: "Monitor pickup requests and deliveries",
          count: pickups.length,
        };
      case "guidelines":
        return {
          title: "📋 Guidelines Management",
          description: "Create and manage food safety guidelines",
          count: guidelines.length,
        };
      default:
        return {
          title: "📊 Admin Dashboard",
          description: "Welcome to the admin dashboard",
          count: 0,
        };
    }
  };

  const sectionInfo = getSectionInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Content Area with proper top margin */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {sectionInfo.title}
              </h1>
              <p className="text-gray-600 mb-4">{sectionInfo.description}</p>
              <div className="flex items-center space-x-4">
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  Total: {sectionInfo.count}
                </span>
                <span className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Users Section */}
          {currentSection === "users" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-primary-700 font-medium">
                                  {user.username?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.username}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-700"
                                  : user.role === "ngo"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDelete("user", user._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Donations Section */}
          {currentSection === "donations" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="grid gap-6">
                  {donations.map((donation) => (
                    <div
                      key={donation._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {donation.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {donation.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {donation.category}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                donation.status === "available"
                                  ? "bg-green-100 text-green-700"
                                  : donation.status === "reserved"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {donation.status}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              Qty: {donation.quantity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Expires:{" "}
                            {new Date(donation.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete("donation", donation._id)}
                          className="ml-4 text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pickups Section */}
          {currentSection === "pickups" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="grid gap-6">
                  {pickups.map((pickup) => (
                    <div
                      key={pickup._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Pickup Request #{pickup._id.slice(-6)}
                          </h3>
                          <p className="text-gray-600 mb-3">{pickup.message}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                pickup.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : pickup.status === "accepted"
                                  ? "bg-green-100 text-green-700"
                                  : pickup.status === "completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {pickup.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Proposed Time:{" "}
                            {new Date(
                              pickup.proposedPickupTime
                            ).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete("pickup", pickup._id)}
                          className="ml-4 text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Guidelines Section */}
          {currentSection === "guidelines" && (
            <div className="space-y-6">
              {/* Add Guideline Button */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <button
                  onClick={() => setShowGuidelineForm(true)}
                  className="btn btn-primary"
                >
                  + Add New Guideline
                </button>
              </div>

              {/* Guidelines List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="grid gap-6">
                    {guidelines.map((guideline) => (
                      <div
                        key={guideline._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {guideline.title}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {guideline.content}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {guideline.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => startEditGuideline(guideline)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete("guideline", guideline._id)
                              }
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guideline Form Modal */}
              {showGuidelineForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingGuideline
                        ? "Edit Guideline"
                        : "Add New Guideline"}
                    </h3>
                    <form onSubmit={handleGuidelineSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={guidelineForm.title}
                          onChange={(e) =>
                            setGuidelineForm({
                              ...guidelineForm,
                              title: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content
                        </label>
                        <textarea
                          value={guidelineForm.content}
                          onChange={(e) =>
                            setGuidelineForm({
                              ...guidelineForm,
                              content: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows={4}
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          value={guidelineForm.category}
                          onChange={(e) =>
                            setGuidelineForm({
                              ...guidelineForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="safety">Safety</option>
                          <option value="storage">Storage</option>
                          <option value="packaging">Packaging</option>
                          <option value="compliance">Compliance</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={resetGuidelineForm}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingGuideline ? "Update" : "Create"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
