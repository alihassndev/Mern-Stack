import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Zod schema for user registration
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  userType: z.enum(["donor", "ngo"]),
});

type UserRole = "donor" | "ngo" | "admin";
type RegisterData = z.infer<typeof registerSchema>;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: "1",
        name: "Test User",
        email,
        role: "donor",
        token: "mock-token",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Invalid email or password");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      // Validate data
      registerSchema.parse(data);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.userType,
        token: "mock-token",
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (err) {
      setError(
        err instanceof z.ZodError
          ? err.errors[0].message
          : "Registration failed. Email may exist."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
