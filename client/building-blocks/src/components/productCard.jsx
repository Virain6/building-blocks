import React from "react";
import { capitalizeWords } from "../utils/stringUtils.js";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.picture || "https://via.placeholder.com/150"}
        alt={product.productName}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">
        {capitalizeWords(product.productName)}
      </h2>
      <h3 className="text-gray-600">{product.departmentCode}</h3>
      <p className="text-gray-600 mt-2 h-14 overflow-hidden">
        {product.description}
      </p>
      <p className="text-lg font-bold mt-4">${product.price}</p>
    </div>
  );
};

export default ProductCard;
