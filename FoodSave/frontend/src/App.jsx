import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DonationsList from "./pages/DonationsList";
import CreateDonation from "./pages/CreateDonation";
import PickupRequests from "./pages/PickupRequests";
import Guidelines from "./pages/Guidelines";
import Profile from "./pages/Profile";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import { useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [toast, setToast] = useState({ message: "", type: "info" });
  const showToast = (message, type = "info") => setToast({ message, type });
  return (
    <div className="flex flex-col min-h-screen"> {/* Added flex and min-h-screen */}
      <Navbar />
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
      <div className="flex-grow"> {/* Added flex-grow to push footer to bottom */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup showToast={showToast} />} />
          <Route path="/signin" element={<Signin showToast={showToast} />} />
          <Route
            path="/donations"
            element={
              <ProtectedRoute>
                <DonationsList showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donations/new"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <CreateDonation showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pickups"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <PickupRequests showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guidelines"
            element={<Guidelines showToast={showToast} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard showToast={showToast} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer /> {/* Added Footer component */}
    </div>
  );
}

export default App;
