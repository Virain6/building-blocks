import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../utils/productsApi";
import { capitalizeWords } from "../utils/stringUtils.js";
import { useCart } from "../context/cartContext";
import PlusMinusButton from "../components/amountCart.jsx";

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId); // Fetch product details
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <img
          src={product.picture || "https://via.placeholder.com/300"}
          alt={product.productName}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold">
            {capitalizeWords(product.productName)}
          </h1>
          <h2 className="text-lg text-gray-600 mt-2">
            {product.supplierName || "Unknown Supplier"} -{" "}
            {product.departmentName || "Unknown Department"}
          </h2>
          {product.discountPrice ? (
            <div className="mt-6">
              <span className="text-2xl font-bold text-red-500 line-through">
                ${product.price}
              </span>
              <span className="text-2xl font-bold text-green-600 ml-2">
                ${product.discountPrice}
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold mt-6">${product.price}</p>
          )}
          {/* Wait Time */}
          <p className="text-lg text-gray-700 mt-6">
            <strong>Lead Time:</strong> {product.leadTime || "Not Specified"}
          </p>

          {/* Status */}
          <p className="text-lg text-gray-700 mt-2">
            <strong>Status:</strong> {product.status || "Unknown"}
          </p>
          <p className="text-gray-800 mt-6 mb-6 whitespace-pre-line">
            {product.description}
          </p>
          <PlusMinusButton
            product={product}
            initialCount={1}
            buttonName="Add to Cart"
            onChange={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
