import React, { useEffect, useState } from "react";
import {
  fetchSuppliers,
  addSupplier,
  deleteSupplier,
  editSupplier,
} from "../../../utils/supplierApi";
import SupplierFormModal from "./supplierFormModal";

const SupplierManagementPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        setLoading(true);
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  const handleSaveSupplier = async (supplier) => {
    if (supplier._id) {
      // Editing existing supplier
      try {
        const updatedSupplier = await editSupplier({
          id: supplier._id,
          supplierName: supplier.supplierName,
        });
        setSuppliers((prev) =>
          prev.map((sup) =>
            sup._id === updatedSupplier._id ? updatedSupplier : sup
          )
        );
        setIsModalOpen(false);
        setSelectedSupplier(null);
      } catch (error) {
        console.error("Error updating supplier:", error);
        alert("Failed to update supplier.");
      }
    } else {
      // Adding new supplier
      try {
        const addedSupplier = await addSupplier(supplier);
        setSuppliers((prev) => [...prev, addedSupplier]);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding supplier:", error);
        alert("Failed to add supplier.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await deleteSupplier(id);
        setSuppliers((prev) => prev.filter((sup) => sup._id !== id));
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Failed to delete supplier.");
      }
    }
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-amber-500 text-white shadow-lg rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Manage Suppliers</h2>
          <button
            onClick={() => {
              setSelectedSupplier(null);
              setIsModalOpen(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Supplier
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-700">Loading...</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Supplier Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={supplier._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{supplier.supplierName}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(supplier._id)}
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
        <SupplierFormModal
          supplier={selectedSupplier}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSupplier(null);
          }}
          onSave={handleSaveSupplier}
        />
      )}
    </div>
  );
};

export default SupplierManagementPage;
