import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const EditDonation = ({ showToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    category: "meals",
    expiryDate: "",
    pickupLocation: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await api.get(`/donations/${id}`);
        const donation = response.data.data;
        
        // Check if user is the donor
        if (donation.donor !== user._id) {
          showToast("You can only edit your own donations", "error");
          navigate("/pickup-requests");
          return;
        }
        
        setFormData({
          title: donation.title,
          description: donation.description,
          quantity: donation.quantity,
          category: donation.category,
          expiryDate: donation.expiryDate?.split('T')[0],
          pickupLocation: donation.location?.address || "",
        });
      } catch (err) {
        showToast("Failed to load donation details", "error");
        navigate("/pickup-requests");
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, user._id, navigate, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/donations/${id}`, formData);
      showToast("Donation updated successfully!", "success");
      navigate("/pickup-requests");
    } catch (err) {
      showToast("Failed to update donation", "error");
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-20 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Donation</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields similar to CreateDonation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          
          {/* Add other form fields */}
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Update Donation
            </button>
            <button
              type="button"
              onClick={() => navigate("/pickup-requests")}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonation;