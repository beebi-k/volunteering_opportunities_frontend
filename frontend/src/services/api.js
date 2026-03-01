// api.js
import axios from "axios";

// Always use environment variable
// Fallback to deployed backend if not provided
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://volunteering-opportunities-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
};

// User services
export const userService = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  getStats: () => api.get("/users/stats"),
};

// Organization services
export const orgService = {
  getAll: (params) => api.get("/organizations", { params }),
  getById: (id) => api.get(`/organizations/${id}`),
};

// Opportunity services
export const oppService = {
  getAll: (params) => api.get("/opportunities", { params }),
  getById: (id) => api.get(`/opportunities/${id}`),
};

// Application services
export const appService = {
  apply: (opp_id) => api.post("/applications", { opp_id }),
  getMyApplications: () => api.get("/applications/my-applications"),
};

export default api;