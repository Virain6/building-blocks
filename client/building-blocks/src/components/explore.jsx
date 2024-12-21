import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/productsApi";
import ProductCard from "./productCard";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchLatestProducts(5);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
