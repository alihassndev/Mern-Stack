import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import RegistrationSuccess from "./pages/RegistrationSuccess";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import NgoDashboard from "./pages/dashboard/NgoDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard nested routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DonorDashboard />} />
            <Route path="ngo" element={<NgoDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
