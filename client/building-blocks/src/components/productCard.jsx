import React from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../utils/stringUtils.js";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

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
        {product.supplierName || "Unknown Supplier"} -{" "}
        {product.departmentName || "Unknown Department"}
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
