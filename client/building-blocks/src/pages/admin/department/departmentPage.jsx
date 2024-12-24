import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  addDepartment,
  deleteDepartment,
  editDepartment, // Add this to import
} from "../../../utils/departmentApi";
import DepartmentFormModal from "./DepartmentFormModal";

const DepartmentManagementPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoading(true);
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  const handleSaveDepartment = async (department) => {
    if (selectedDepartment) {
      // Edit existing department
      try {
        const updatedDepartment = await editDepartment(department); // Call API to edit
        setDepartments((prev) =>
          prev.map((dept) =>
            dept._id === updatedDepartment._id ? updatedDepartment : dept
          )
        );
        setIsModalOpen(false);
        setSelectedDepartment(null);
      } catch (error) {
        console.error("Error updating department:", error);
        alert("Failed to update department.");
      }
    } else {
      // Add new department
      try {
        const addedDepartment = await addDepartment(department);
        setDepartments((prev) => [...prev, addedDepartment]);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding department:", error);
        alert("Failed to add department.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        setDepartments((prev) => prev.filter((dept) => dept._id !== id));
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department.");
      }
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-amber-500 text-white shadow-lg rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Manage Departments</h2>
          <button
            onClick={() => {
              setSelectedDepartment(null); // Clear selection for new department
              setIsModalOpen(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Department
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-700">Loading...</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Department Name</th>
              <th className="px-4 py-2">Department Code</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={department._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{department.departmentName}</td>
                <td className="px-4 py-2">{department.departmentCode}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(department)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(department._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DepartmentFormModal
          department={selectedDepartment}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDepartment(null);
          }}
          onSave={handleSaveDepartment}
        />
      )}
    </div>
  );
};

export default DepartmentManagementPage;
