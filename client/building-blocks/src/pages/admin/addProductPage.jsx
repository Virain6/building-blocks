import React, { useState } from "react";
import { addProduct } from "../../utils/productsApi";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: 0, // Default to 0
    stock: 0, // Default to 0
    departmentCode: "",
    supplierID: "",
    leadTime: 0, // Default to 0
    discountPrice: 0, // Default to 0
    status: "available", // Default value
    picture: "", // Optional
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers
    const isNumericField = [
      "price",
      "stock",
      "leadTime",
      "discountPrice",
    ].includes(name);
    setProductData((prev) => ({
      ...prev,
      [name]: isNumericField ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting product data:", productData); // Debug log
      await addProduct(productData); // Call the API to add the product
      alert("Product added successfully!");
      navigate("/admin"); // Redirect to the admin page
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>

        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={productData.productName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={productData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Department Code */}
        <div>
          <label htmlFor="departmentCode" className="block text-sm font-medium">
            Department Code
          </label>
          <input
            type="text"
            name="departmentCode"
            id="departmentCode"
            value={productData.departmentCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Supplier ID */}
        <div>
          <label htmlFor="supplierID" className="block text-sm font-medium">
            Supplier ID
          </label>
          <input
            type="text"
            name="supplierID"
            id="supplierID"
            value={productData.supplierID}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Lead Time */}
        <div>
          <label htmlFor="leadTime" className="block text-sm font-medium">
            Lead Time (days)
          </label>
          <input
            type="number"
            name="leadTime"
            id="leadTime"
            value={productData.leadTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Discount Price */}
        <div>
          <label htmlFor="discountPrice" className="block text-sm font-medium">
            Discount Price
          </label>
          <input
            type="number"
            name="discountPrice"
            id="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={productData.status}
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
