import React from "react";
import { capitalizeWords } from "../utils/stringUtils.js";

const MobileProductCard = ({ product }) => {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow hover:shadow-lg transition space-x-4">
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
        <h3 className="text-sm text-gray-600">{product.departmentCode}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </div>
    </div>
  );
};

export default MobileProductCard;
