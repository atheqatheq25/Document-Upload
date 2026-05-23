import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"  || "https://document-upload-20rg.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
