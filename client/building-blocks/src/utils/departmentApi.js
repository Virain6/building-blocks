// src/utils/departmentApi.js
import axios from "./axiosConfig";

export const fetchDepartments = async () => {
  try {
    const response = await axios.get("/department");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const fetchDepartmentByCode = async (departmentCode) => {
  const response = await axios.get(`/department/${departmentCode}`);
  console.log("bycode" + response.data + " : " + departmentCode);
  return response.data;
};

export const addDepartment = async (department) => {
  const response = await axios.post("/department/add", department);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await axios.delete(`/department/delete/${id}`);
  return response.data;
};

export const editDepartment = async (department) => {
  const response = await axios.put(
    `/department/edit/${department._id}`,
    department
  );
  return response.data;
};
