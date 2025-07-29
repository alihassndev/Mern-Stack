// import { useState, useEffect } from "react";
// import api from "../utils/axios";

// const PickupRequests = ({ showToast }) => {
//   const [pickups, setPickups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [feedbackModal, setFeedbackModal] = useState({
//     open: false,
//     pickupId: null,
//   });
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     const fetchPickups = async () => {
//       try {
//         const response = await api.get("/pickups");
//         setPickups(response.data.data);
//       } catch (err) {
//         setError("Failed to load pickup requests");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPickups();
//   }, []);

//   const updatePickupStatus = async (pickupId, status) => {
//     try {
//       await api.patch(`/pickups/${pickupId}/status`, { status });
//       setPickups(
//         pickups.map((pickup) =>
//           pickup._id === pickupId ? { ...pickup, status } : pickup
//         )
//       );
//       if (status === "completed") {
//         setFeedbackModal({ open: true, pickupId });
//       }
//     } catch (err) {
//       console.error("Failed to update status:", err);
//     }
//   };

//   const handleSubmitFeedback = async () => {
//     if (!rating) {
//       showToast("Rating is required.", "error");
//       return;
//     }
//     try {
//       await api.post("/feedback", {
//         pickupRequest: feedbackModal.pickupId,
//         rating,
//         comment,
//       });
//       showToast("Feedback submitted!", "success");
//       setFeedbackModal({ open: false, pickupId: null });
//       setRating(5);
//       setComment("");
//     } catch (err) {
//       showToast(
//         err.response?.data?.message || "Failed to submit feedback.",
//         "error"
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen pt-20 px-4">
//         <div className="max-w-4xl mx-auto bg-red-100 p-4 rounded-md text-red-700">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 px-4 pb-10">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           My Pickup Requests
//         </h1>
//         {/* Feedback Modal */}
//         {feedbackModal.open && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//               <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
//               <label className="block mb-2 font-medium">Rating</label>
//               <select
//                 className="w-full border rounded px-3 py-2 mb-4"
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//               >
//                 {[5, 4, 3, 2, 1].map((val) => (
//                   <option key={val} value={val}>
//                     {val}
//                   </option>
//                 ))}
//               </select>
//               <label className="block mb-2 font-medium">
//                 Comment (optional)
//               </label>
//               <textarea
//                 className="w-full border rounded px-3 py-2 mb-4"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Share your experience or suggestions"
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   className="btn"
//                   onClick={() =>
//                     setFeedbackModal({ open: false, pickupId: null })
//                   }
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSubmitFeedback}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {pickups.length === 0 ? (
//           <div className="bg-gray-50 rounded-lg p-8 text-center">
//             <h3 className="text-xl font-medium text-gray-700 mb-2">
//               No pickup requests yet
//             </h3>
//             <p className="text-gray-600">
//               Browse available donations to request pickups.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {pickups.map((pickup) => (
//               <div
//                 key={pickup._id}
//                 className="bg-white rounded-lg shadow-md p-6"
//               >
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
//                   <div>
//                     <h3 className="text-xl font-semibold">
//                       {pickup.foodDonation?.foodName || "Food Donation"}
//                     </h3>
//                     <p className="text-gray-600">
//                       {pickup.foodDonation?.description}
//                     </p>
//                   </div>
//                   <div className="bg-gray-100 px-4 py-2 rounded-md">
//                     <p className="text-sm font-medium">
//                       Status:
//                       <span className={`ml-2 ${getStatusColor(pickup.status)}`}>
//                         {pickup.status.charAt(0).toUpperCase() +
//                           pickup.status.slice(1)}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Pickup Location:</p>
//                     <p className="font-medium">
//                       {pickup.foodDonation?.pickupLocation}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Requested on:</p>
//                     <p className="font-medium">
//                       {new Date(pickup.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 {pickup.status === "pending" && (
//                   <div className="flex justify-end gap-3">
//                     <button
//                       onClick={() =>
//                         updatePickupStatus(pickup._id, "cancelled")
//                       }
//                       className="btn btn-secondary text-sm"
//                     >
//                       Cancel Request
//                     </button>
//                   </div>
//                 )}

//                 {pickup.status === "accepted" && (
//                   <div className="flex justify-end gap-3">
//                     <button
//                       onClick={() =>
//                         updatePickupStatus(pickup._id, "completed")
//                       }
//                       className="btn btn-primary text-sm"
//                     >
//                       Mark as Completed
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Helper function for status colors
// const getStatusColor = (status) => {
//   switch (status) {
//     case "pending":
//       return "text-yellow-600";
//     case "accepted":
//       return "text-blue-600";
//     case "completed":
//       return "text-green-600";
//     case "cancelled":
//       return "text-red-600";
//     default:
//       return "text-gray-600";
//   }
// };

// export default PickupRequests;

import { useState, useEffect } from "react";
import api from "../utils/axios";

const PickupRequests = ({ showToast }) => {
  const [pickups, setPickups] = useState([]); // Ensure this is initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    pickupId: null,
  });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // const fetchPickups = async () => {
    //   try {
    //     const response = await api.get("/pickups");

    //     // Ensure response.data.data is an array
    //     const data = response.data?.data;
    //     if (Array.isArray(data)) {
    //       setPickups(data); // Set pickups only if it's an array
    //     } else {
    //       throw new Error("Invalid data format");
    //     }
    //   } catch (err) {
    //     setError("Failed to load pickup requests");
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchPickups = async () => {
  try {
    const response = await api.get("/pickups");

    // Log the response to check the data structure
    console.log(response.data);

    // Ensure response.data.data.requests is an array before setting state
    const requests = response.data?.data?.requests;
    if (Array.isArray(requests)) {
      setPickups(requests); // Set pickups only if it's an array
    } else {
      throw new Error("Invalid data format: Expected an array in response.data.data.requests");
    }
  } catch (err) {
    setError("Failed to load pickup requests");
    console.error("Error fetching pickups:", err);
  } finally {
    setLoading(false);
  }
};


    fetchPickups();
  }, []);

  const updatePickupStatus = async (pickupId, status) => {
    try {
      await api.patch(`/pickups/${pickupId}/status`, { status });
      setPickups(
        pickups.map((pickup) =>
          pickup._id === pickupId ? { ...pickup, status } : pickup
        )
      );
      if (status === "completed") {
        setFeedbackModal({ open: true, pickupId });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!rating) {
      showToast("Rating is required.", "error");
      return;
    }
    try {
      await api.post("/feedback", {
        pickupRequest: feedbackModal.pickupId,
        rating,
        comment,
      });
      showToast("Feedback submitted!", "success");
      setFeedbackModal({ open: false, pickupId: null });
      setRating(5);
      setComment("");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to submit feedback.",
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Pickup Requests
        </h1>
        {/* Feedback Modal */}
        {feedbackModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
              <label className="block mb-2 font-medium">Rating</label>
              <select
                className="w-full border rounded px-3 py-2 mb-4"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <label className="block mb-2 font-medium">
                Comment (optional)
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 mb-4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience or suggestions"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="btn"
                  onClick={() =>
                    setFeedbackModal({ open: false, pickupId: null })
                  }
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitFeedback}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {pickups.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No pickup requests yet
            </h3>
            <p className="text-gray-600">
              Browse available donations to request pickups.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pickups.map((pickup) => (
              <div
                key={pickup._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {pickup.foodDonation?.foodName || "Food Donation"}
                    </h3>
                    <p className="text-gray-600">
                      {pickup.foodDonation?.description}
                    </p>
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-md">
                    <p className="text-sm font-medium">
                      Status:
                      <span className={`ml-2 ${getStatusColor(pickup.status)}`}>
                        {pickup.status.charAt(0).toUpperCase() +
                          pickup.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location:</p>
                    <p className="font-medium">
                      {pickup.foodDonation?.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Requested on:</p>
                    <p className="font-medium">
                      {new Date(pickup.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {pickup.status === "pending" && (
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        updatePickupStatus(pickup._id, "completed")
                      }
                      className="btn btn-primary text-sm"
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}
                {pickup.status === "pending" && (
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        updatePickupStatus(pickup._id, "rejected")
                      }
                      className="btn btn-secondary text-sm"
                    >
                      Cancel Request
                    </button>
                  </div>
                )}

                {pickup.status === "accepted" && (
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        updatePickupStatus(pickup._id, "completed")
                      }
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

// Enhanced pickup request card
const PickupRequestCard = ({ pickup, onStatusUpdate, onSubmitFeedback }) => {
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: 'bg-yellow-50 border-yellow-200',
        badge: 'bg-yellow-100 text-yellow-800',
        icon: '⏳',
        color: 'text-yellow-700'
      },
      accepted: {
        bg: 'bg-green-50 border-green-200',
        badge: 'bg-green-100 text-green-800',
        icon: '✅',
        color: 'text-green-700'
      },
      rejected: {
        bg: 'bg-red-50 border-red-200',
        badge: 'bg-red-100 text-red-800',
        icon: '❌',
        color: 'text-red-700'
      },
      completed: {
        bg: 'bg-blue-50 border-blue-200',
        badge: 'bg-blue-100 text-blue-800',
        icon: '🎉',
        color: 'text-blue-700'
      }
    };
    return configs[status] || configs.pending;
  };
  
  const statusConfig = getStatusConfig(pickup.status);
  
  return (
    <div className={`rounded-xl border-2 ${statusConfig.bg} p-6 transition-all duration-300 hover:shadow-lg`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {pickup.donation?.title || 'Food Pickup Request'}
          </h3>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.badge}`}>
              <span className="mr-1">{statusConfig.icon}</span>
              {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              Requested {new Date(pickup.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <span className="mr-2">📅</span>
            <span className="font-medium text-gray-700">Proposed Time:</span>
            <span className="ml-2 text-gray-900">
              {new Date(pickup.proposedPickupTime).toLocaleString()}
            </span>
          </div>
          
          {pickup.donation?.quantity && (
            <div className="flex items-center text-sm">
              <span className="mr-2">📊</span>
              <span className="font-medium text-gray-700">Quantity:</span>
              <span className="ml-2 text-gray-900">{pickup.donation.quantity}</span>
            </div>
          )}
          
          {pickup.donation?.category && (
            <div className="flex items-center text-sm">
              <span className="mr-2">🏷️</span>
              <span className="font-medium text-gray-700">Category:</span>
              <span className="ml-2 text-gray-900 capitalize">{pickup.donation.category}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {pickup.driver?.name && (
            <div className="flex items-center text-sm">
              <span className="mr-2">🚚</span>
              <span className="font-medium text-gray-700">Driver:</span>
              <span className="ml-2 text-gray-900">{pickup.driver.name}</span>
            </div>
          )}
          
          {pickup.driver?.contact && (
            <div className="flex items-center text-sm">
              <span className="mr-2">📞</span>
              <span className="font-medium text-gray-700">Contact:</span>
              <span className="ml-2 text-gray-900">{pickup.driver.contact}</span>
            </div>
          )}
          
          {pickup.completionTime && (
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
      
      {/* Message */}
      {pickup.message && (
        <div className="bg-white/50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Message:</span> {pickup.message}
          </p>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        {pickup.status === 'accepted' && (
          <button
            onClick={() => onStatusUpdate(pickup._id, 'completed')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95"
          >
            ✅ Mark as Completed
          </button>
        )}
        
        {pickup.status === 'completed' && (
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
