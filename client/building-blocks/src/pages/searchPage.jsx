import React, { useState } from "react";
import { searchProducts } from "../utils/productsApi";
import ProductCard from "../components/productCard";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchProducts({
        searchTerm,
        department,
        status,
        page: 0,
        limit: 20,
      });
      setProducts(results);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">All Departments</option>
          <option value="TOOLS">Tools</option>
          <option value="HARDWARE">Hardware</option>
          <option value="SAFETY">Safety</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
