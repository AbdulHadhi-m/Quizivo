import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("quizivo_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (user?.token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // If the backend token is invalid/expired (common after reseeding),
    // force a clean auth state so protected pages work again after login.
    if (status === 401) {
      localStorage.removeItem("quizivo_user");

      // Avoid redirect loops if we're already on auth pages
      const path = window.location?.pathname || "";
      if (!path.startsWith("/login") && !path.startsWith("/register")) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;