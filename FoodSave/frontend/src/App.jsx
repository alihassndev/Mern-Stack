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

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route 
          path="/donations" 
          element={
            <ProtectedRoute>
              <DonationsList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/donations/new" 
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <CreateDonation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pickups" 
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <PickupRequests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/guidelines" 
          element={<Guidelines />} 
        />
      </Routes>
    </>
  );
}

export default App;
