import React from "react";
import ProductCard from "./productCard";

const ScrollableProductList = ({ products = [], title, onViewMore }) => {
  // Ensure products is always an array
  if (!Array.isArray(products)) {
    console.error("ScrollableProductList: products is not an array", products);
    products = [];
  }

  return (
    <div className="my-8">
      <h1 className="text-4xl font-bold ml-8 mb-6 mt-6 text-amber-500">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide max-w-[80vw]">
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-64">
              <ProductCard product={product} />
            </div>
          ))}
          {/* View More Card */}
          <div
            className="flex-shrink-0 w-64 flex items-center justify-center border border-gray-300 rounded-md bg-gray-100 text-center hover:bg-gray-200 transition"
            onClick={onViewMore}
          >
            <h3 className="text-lg font-semibold text-blue-500">View More</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableProductList;
