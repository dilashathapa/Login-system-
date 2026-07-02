import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000, // 10 second timeout
});

// Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is expired or invalid, redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;