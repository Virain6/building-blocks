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

export const fetchPendingOrders = async () => {
  const response = await axios.get("/orderDetails/pending");
  return response.data;
};

export const fetchCompletedOrders = async () => {
  const response = await axios.get("/orderDetails/completed");
  return response.data;
};

export const updateOrderStatus = async (orderId, updates) => {
  const response = await axios.put(`/orderDetails/update/${orderId}`, updates);
  return response.data;
};

export const fetchOrdersWithPaginationAndSearch = async (
  cursor = null,
  limit = 10,
  search = "",
  status
) => {
  console.log("Fetching orders with pagination and search..." + status); // Debug log
  try {
    const response = await axios.get("/orderDetails/search", {
      params: { cursor, limit, search, status },
    });

    return response.data; // Contains `results` and `nextCursor`
  } catch (error) {
    console.error(
      "Error fetching paginated and searched orders:",
      error.message
    );
    throw error;
  }
};
