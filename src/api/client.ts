import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-org-id": localStorage.getItem("org_id") || "",
  },
});

export default apiClient;
