import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../utils/stringUtils.js";
import { fetchSuppliersById } from "../utils/supplierApi.js";
import { fetchDepartmentByCode } from "../utils/departmentApi.js";

const ProductCard = ({ product }) => {
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
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={product.picture || "https://via.placeholder.com/150"}
        alt={product.productName}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">
        {capitalizeWords(product.productName)}
      </h2>
      <h3 className="text-gray-600">
        {supplier.supplierName || "Unknown Supplier"} -{" "}
        {department.departmentName || "Unknown Department"}
      </h3>
      <p className="text-gray-600 mt-2 h-14 overflow-hidden">
        {product.description}
      </p>
      {/* Price Section */}
      <div className="mt-4">
        {product.discountPrice ? (
          <div>
            <span className="text-lg font-bold text-red-500 line-through">
              ${product.price}
            </span>
            <span className="text-lg font-bold text-green-600 ml-2">
              ${product.discountPrice}
            </span>
          </div>
        ) : (
          <p className="text-lg font-bold">${product.price}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
