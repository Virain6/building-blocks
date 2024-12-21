import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Your API base URL
  timeout: 10000, // Optional: timeout for requests
});

export default axiosInstance;
