import axios from "axios";

// Backend API URL
export const API_BASE_URL = "https://document-upload-nldn.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
