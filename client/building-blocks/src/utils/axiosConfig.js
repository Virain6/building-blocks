import axios from "axios";
import { auth } from "../assets/firebase/firebaseConfig"; // Import Firebase auth instance

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Your API base URL
  timeout: 10000, // Optional: timeout for requests
});

// Intercept requests to add the token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(); // Get Firebase token
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
