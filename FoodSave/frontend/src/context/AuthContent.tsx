import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  location: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    location: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authAPI.refreshToken("");
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await authAPI.login(email, password);
      setUser(data.user);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    location: string;
  }) => {
    try {
      const { data } = await authAPI.register(userData);
      setUser(data.user);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
