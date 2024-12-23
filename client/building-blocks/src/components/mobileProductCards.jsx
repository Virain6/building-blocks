import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../utils/stringUtils.js";
import { fetchSuppliersById } from "../utils/supplierApi.js";
import { fetchDepartmentByCode } from "../utils/departmentApi.js";

const MobileProductCard = ({ product }) => {
  const [supplier, setSupplier] = useState({});
  const [department, setDepartment] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const fetchedSupplier = await fetchSuppliersById(product.supplierID);
        setSupplier(fetchedSupplier);
      } catch (error) {
        console.error("Error fetching supplier by ID:", error);
      }
    };

    const fetchDepartment = async () => {
      try {
        const fetchedDepartment = await fetchDepartmentByCode(
          product.departmentCode
        );
        setDepartment(fetchedDepartment[0] || {});
      } catch (error) {
        console.error("Error fetching department by code:", error);
      }
    };

    fetchSupplier();
    fetchDepartment();
  }, [product]);

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)} // Navigate to details page
      className="flex items-center border rounded-lg p-4 shadow hover:shadow-lg transition space-x-4"
    >
      {/* Product Image */}
      <img
        src={product.picture || "https://via.placeholder.com/100"}
        alt={product.productName}
        className="h-20 w-20 object-cover rounded-md flex-shrink-0"
      />
      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {capitalizeWords(product.productName)}
        </h2>
        <h3 className="text-sm text-gray-600">
          {supplier.supplierName || "Unknown Supplier"} -{" "}
          {department.departmentName || "Unknown Department"}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default MobileProductCard;
