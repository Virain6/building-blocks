// utils/supplierApi.js
import axios from "./axiosConfig";

export const fetchSuppliers = async () => {
  const response = await axios.get("/suppliers");
  return response.data;
};

export const fetchSuppliersById = async (id) => {
  const response = await axios.get(`/suppliers/${id}`);
  console.log("byID" + response.data + " : " + id);
  return response.data;
};
