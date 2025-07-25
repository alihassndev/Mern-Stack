import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = ({ showToast }) => {
  const { user } = useAuth();
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") return;
    setLoading(true);
    const fetchAll = async () => {
      try {
        const [usersRes, donationsRes, feedbacksRes] = await Promise.all([
          api.get("/users"),
          api.get("/foodDonations"),
          api.get("/feedback"),
        ]);
        setUsers(usersRes.data.data);
        setDonations(donationsRes.data.data);
        setFeedbacks(feedbacksRes.data.data);
      } catch {
        showToast("Failed to load admin data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [user, showToast]);

  const handleDelete = async (type, id) => {
    try {
      if (type === "user") {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
        showToast("User deleted!", "success");
      } else if (type === "donation") {
        await api.delete(`/foodDonations/${id}`);
        setDonations(donations.filter((d) => d._id !== id));
        showToast("Donation deleted!", "success");
      } else if (type === "feedback") {
        await api.delete(`/feedback/${id}`);
        setFeedbacks(feedbacks.filter((f) => f._id !== id));
        showToast("Feedback deleted!", "success");
      }
    } catch {
      showToast("Delete failed", "error");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Access denied
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>
        <div className="flex gap-4 mb-6">
          <button
            className={`btn ${
              tab === "users" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setTab("users")}
          >
            Users
          </button>
          <button
            className={`btn ${
              tab === "donations" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setTab("donations")}
          >
            Donations
          </button>
          <button
            className={`btn ${
              tab === "feedback" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setTab("feedback")}
          >
            Feedback
          </button>
        </div>
        {tab === "users" && (
          <div>
            <h2 className="text-lg font-bold mb-2">All Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Username</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">DOB</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="p-2 border">{u.username}</td>
                      <td className="p-2 border">{u.email}</td>
                      <td className="p-2 border">{u.role}</td>
                      <td className="p-2 border">
                        {u.DOB ? u.DOB.slice(0, 10) : ""}
                      </td>
                      <td className="p-2 border">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete("user", u._id)}
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
        )}
        {tab === "donations" && (
          <div>
            <h2 className="text-lg font-bold mb-2">All Donations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">Donor</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d) => (
                    <tr key={d._id}>
                      <td className="p-2 border">{d.title || d.foodName}</td>
                      <td className="p-2 border">
                        {d.donor?.username || d.donor}
                      </td>
                      <td className="p-2 border">{d.quantity}</td>
                      <td className="p-2 border">{d.status}</td>
                      <td className="p-2 border">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete("donation", d._id)}
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
        )}
        {tab === "feedback" && (
          <div>
            <h2 className="text-lg font-bold mb-2">All Feedback</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">NGO</th>
                    <th className="p-2 border">Rating</th>
                    <th className="p-2 border">Comment</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f) => (
                    <tr key={f._id}>
                      <td className="p-2 border">{f.ngo?.username || f.ngo}</td>
                      <td className="p-2 border">{f.rating}</td>
                      <td className="p-2 border">{f.comment}</td>
                      <td className="p-2 border">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete("feedback", f._id)}
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
