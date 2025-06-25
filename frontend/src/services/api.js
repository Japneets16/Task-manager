import axios from "axios";

const API_BASE_URL = "http://localhost:3100/api/auth";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/regis", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },
};

// Task API calls
export const taskAPI = {
  getAllTasks: async (status = "all") => {
    const response = await api.get(`/getalltask?status=${status}`);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/getalltask/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post("/create", taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.post(`/update/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.post(`/delete/${id}`);
    return response.data;
  },
};

export default api;
