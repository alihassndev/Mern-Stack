import { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await api.post("/users/login", credentials);
      setUser(res.data.data.user);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await api.post("/users/register", userData);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Add refresh token functionality
  const refreshToken = async () => {
    try {
      const res = await api.post("/users/refresh-token");
      setUser(res.data.data.user || res.data.data);
      return res.data;
    } catch (err) {
      console.error("Token refresh failed:", err);
      setUser(null);
      throw err;
    }
  };

  // Update axios interceptor
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await refreshToken();
            return api(originalRequest);
          } catch (refreshError) {
            setUser(null);
            window.location.href = '/signin';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        refreshToken, // Add this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
