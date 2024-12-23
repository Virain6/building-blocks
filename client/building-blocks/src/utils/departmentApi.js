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
