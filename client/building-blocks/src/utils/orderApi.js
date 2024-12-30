import axios from "./axiosConfig";
import { toast } from "react-toastify";

export const addOrder = async (orderData) => {
  try {
    const response = await axios.post("/orderDetails/add", orderData);
    console.log("Order added:", response.data); // Debug log
    return response.data; // Return the added order
  } catch (error) {
    console.error("Error adding order:", error.response?.data || error.message);

    throw error; // Propagate error to the calling function
  }
};

export const fetchOrderDetailsById = async (orderId) => {
  try {
    const response = await axios.get(`/orderDetails/getByID/${orderId}`);
    console.log("Order Details Response:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    throw error;
  }
};
