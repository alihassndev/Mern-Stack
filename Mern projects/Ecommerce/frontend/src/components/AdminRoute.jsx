import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated && user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
