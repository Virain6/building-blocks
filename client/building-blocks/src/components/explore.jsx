import React, { useEffect, useState } from "react";
import { fetchLatestProducts } from "../utils/productsApi"; // Correct function
import ScrollableProductList from "./scrollable";

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchLatestProducts(3); // Load first 3 products
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

  const handleViewMore = () => {
    alert("Navigate to more products");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold text-center mb-8 mt-3">Explore</h1>
      <hr></hr>
      {/* Tools Section */}
      <ScrollableProductList
        products={products}
        title="Tools"
        onViewMore={handleViewMore}
      />
      <hr></hr>
      {/* Hardware Section */}
      <ScrollableProductList
        products={products}
        title="Hardware"
        onViewMore={handleViewMore}
      />
    </div>
  );
};

export default Explore;
