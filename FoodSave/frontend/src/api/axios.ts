import axios from "axios";
import { getCookie } from "../utils/cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        );

        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; secure; samesite=strict`;
        document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; secure; samesite=strict`;

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        window.location.href = "/signin";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
