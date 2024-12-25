import axios from "./axiosConfig";

export const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`/products/searchID/${id}`);
  return response.data;
};

export const fetchProductsByIds = async (ids) => {
  try {
    const response = await axios.post("/products/batchFetch", { ids });
    return response.data; // Returns the list of products
  } catch (error) {
    console.error("Error fetching products by IDs:", error);
    throw error;
  }
};

export const fetchLatestProducts = async (limit) => {
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("Invalid limit parameter. It must be a positive integer.");
  }
  const response = await axios.get(`/products/latest/${limit}`);
  console.log("Fetched from API:", response.data); // Debug log
  return response.data;
};

export const searchProducts = async ({
  searchTerm = "",
  departmentCode = null,
  supplierID = null,
  status = null,
  page = 0,
  limit = 20,
}) => {
  const params = {
    q: searchTerm,
    departmentCode,
    supplierID,
    status,
    page,
    limit,
  };

  console.log("Search parameters:", params); // Debugging log
  const response = await axios.get("/products/search", { params });
  console.log("Search response:", response.data); // Debugging response
  return response.data;
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post("/products/add", product); // Send product data
    console.log("Product added:", response.data); // Debug log
    return response.data; // Return added product
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error; // Propagate error to the calling function
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/products/delete/${id}`);
    console.log("Product deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(`/products/edit/${id}`, updatedData);
    console.log("Product updated:", response.data); // Debug log
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error editing product:", error);
    throw error; // Propagate error to the calling function
  }
};
