import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // request timeout (10 seconds)
});

/* -----------------------------
   Request Interceptor
------------------------------*/

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ✅ check if token looks like JWT
    if (token && token.split(".").length === 3) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Invalid or missing JWT token:", token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* -----------------------------
   Response Interceptor
------------------------------*/

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Example: handle unauthorized globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
