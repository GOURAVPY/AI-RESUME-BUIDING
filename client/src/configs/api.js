import axios from "axios";

const endPoint = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Optional: attach token automatically
endPoint.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or wherever you store it
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default endPoint;