import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        sessionStorage.getItem("adminToken");

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {

    const url = error.config?.url ?? "";

    const isPublicAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/forgot-password") ||
      url.includes("/auth/reset-password");

    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !isPublicAuthRoute
    ) {
      sessionStorage.removeItem("adminToken");

      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;