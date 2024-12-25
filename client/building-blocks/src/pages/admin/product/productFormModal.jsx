import React, { useState, useEffect } from "react";
import { addProduct, editProduct } from "../../../utils/productsApi";
import { capitalizeWords } from "../../../utils/stringUtils.js";
import { toast } from "react-toastify";

const ProductFormModal = ({
  product,
  onClose,
  onSave,
  departments,
  suppliers,
  departmentMap,
  supplierMap,
}) => {
  const [formData, setFormData] = useState(
    product || {
      productName: "",
      description: "",
      price: 0,
      stock: 0,
      departmentCode: "",
      supplierID: "",
      leadTime: 0,
      discountPrice: 0,
      status: "available",
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumericField = [
      "price",
      "stock",
      "leadTime",
      "discountPrice",
    ].includes(name);
    setFormData((prev) => ({
      ...prev,
      [name]: isNumericField ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let savedProduct;
      let completeProduct;
      if (product) {
        // Edit existing product
        savedProduct = await editProduct(product._id, formData);
        toast.success("Product updated successfully!");
        // Create a complete product object
        completeProduct = formData;
      } else {
        // Add new product
        savedProduct = await addProduct(formData);
        toast.success("Product added successfully!");

        // Create a complete product object
        completeProduct = {
          ...formData, // Include form data
          _id: savedProduct, // Ensure the correct ID is added
        };
      }

      // Call the passed function to update the parent state
      onSave(completeProduct);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-4rem)] p-6">
          <h2 className="text-xl font-bold mb-4">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
              <input
                type="text"
                name="productName"
                value={capitalizeWords(formData.productName)}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full px-4 py-2 border rounded-md mt-2"
              ></textarea>
            </div>

            {/* Pricing Details */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Pricing Details</h3>
              <h3 className="text-md mb-2">Price</h3>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
              <h3 className="text-md mb-2">Discount (optional)</h3>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="Discount Price"
                className="w-full px-4 py-2 border rounded-md mt-2"
              />
            </div>

            {/* Inventory Details */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Inventory Details</h3>
              <h3 className="text-md mb-2">Stock (optional)</h3>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full px-4 py-2 border rounded-md"
              />
              <h3 className="text-md mb-2">Lead Time</h3>
              <input
                type="number"
                name="leadTime"
                value={formData.leadTime}
                onChange={handleChange}
                placeholder="Lead Time (days)"
                className="w-full px-4 py-2 border rounded-md mt-2"
              />
            </div>

            {/* Associations */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Associations</h3>
              <select
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              <select
                name="supplierID"
                value={formData.supplierID}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md mt-2"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.value} value={supplier.value}>
                    {supplier.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-gray-300 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
