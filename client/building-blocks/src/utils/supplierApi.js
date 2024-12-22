// utils/supplierApi.js
import axios from "./axiosConfig";

export const fetchSuppliers = async () => {
  const response = await axios.get("/suppliers");
  console.log("Suppliers API response:", response.data); // Debugging
  return response.data;
};
