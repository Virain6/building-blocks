import axios from "./axiosConfig";

export const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const fetchLatestProducts = async (limit) => {
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("Invalid limit parameter. It must be a positive integer.");
  }
  const response = await axios.get(`/products/latest/${limit}`);
  console.log("Fetched from API:", response.data); // Debug log
  return response.data;
};
