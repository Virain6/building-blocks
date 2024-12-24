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

export const addSupplier = async (supplier) => {
  try {
    const response = await axios.post("/suppliers/add", supplier);
    return response.data;
  } catch (error) {
    console.error("Error adding supplier:", error);
    throw error;
  }
};

export const editSupplier = async ({ id, supplierName }) => {
  try {
    const response = await axios.put(`/suppliers/edit/${id}`, { supplierName });
    return response.data;
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
};

export const deleteSupplier = async (id, defaultSupplierId) => {
  try {
    const response = await axios.delete(`/suppliers/delete/${id}`, {
      data: { defaultSupplierId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
};
