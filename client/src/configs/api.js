import axios from "axios";

const endPoint = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default endPoint;
