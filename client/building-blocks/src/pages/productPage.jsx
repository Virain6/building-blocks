import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../utils/productsApi";
import { fetchSuppliersById } from "../utils/supplierApi.js";
import { fetchDepartmentByCode } from "../utils/departmentApi.js";
import { capitalizeWords } from "../utils/stringUtils.js";
import { addToCart } from "../localStorage/manageLocalStorage.js";
import PlusMinusButton from "../components/amountCart.jsx";

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({});
  const [supplier, setSupplier] = useState({});
  const [department, setDepartment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId); // Fetch product details
        setProduct(fetchedProduct);

        const fetchedSupplier = await fetchSuppliersById(
          fetchedProduct.supplierID
        );
        setSupplier(fetchedSupplier);

        const fetchedDepartment = await fetchDepartmentByCode(
          fetchedProduct.departmentCode
        );
        setDepartment(fetchedDepartment[0] || {});
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
            {supplier.supplierName || "Unknown Supplier"} -{" "}
            {department.departmentName || "Unknown Department"}
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
          <p className="text-gray-800 mt-6 whitespace-pre-line">
            {product.description}
          </p>
          <PlusMinusButton
            product={product}
            buttonName="Add to Cart"
            onChange={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
