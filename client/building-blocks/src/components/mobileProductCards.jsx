import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../utils/stringUtils.js";

const MobileProductCard = ({ product }) => {
  const navigate = useNavigate();

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
          {product.supplierName || "Unknown Supplier"} -{" "}
          {product.departmentName || "Unknown Department"}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mt-4">
          {product.discountPrice ? (
            <div className="mt-2">
              <span className="text-lg font-bold text-red-500 line-through">
                ${product.price}
              </span>
              <span className="text-lg font-bold text-green-600 ml-2">
                ${product.discountPrice}
              </span>
            </div>
          ) : (
            <p className="text-lg font-bold mt-2">${product.price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
