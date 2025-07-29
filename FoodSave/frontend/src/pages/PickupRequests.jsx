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
