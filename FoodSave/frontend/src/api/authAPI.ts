import api from "./axios";

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  location: string;
}

export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }, { withCredentials: true }),

  register: (userData: UserData) =>
    api.post("/auth/register", userData, { withCredentials: true }),

  logout: () => api.post("/auth/logout", {}, { withCredentials: true }),

  refreshToken: (refreshToken: string) =>
    api.post(
      "/auth/refresh-token",
      { refreshToken },
      { withCredentials: true }
    ),

  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.post("/auth/change-password", data),
  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),
  resetPassword: (token: string, password: string) =>
    api.post(`/auth/reset-password/${token}`, { password }),
};
