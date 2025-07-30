import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { MapsProvider } from "./context/MapsContext";
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
import NotificationBell from "./components/NotificationBell";

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
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  return (
    <MapsProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        {/* Remove this line: <NotificationBell /> */}
        <main className="flex-grow">
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
                <ProtectedRoute allowedRoles={["ngo", "donor"]}>
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
        </main>
        <Footer />
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: "", type: "" })}
          />
        )}
      </div>
    </MapsProvider>
  );
}

export default App;

// In your header/navigation component:
<div className="flex items-center space-x-4">
  {/* Other header items */}
  {/* User menu, etc. */}
</div>
{/* Remove this line: <NotificationBell /> */}
