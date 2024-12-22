import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../utils/departmentApi";
import { fetchSuppliers } from "../utils/supplierApi";
import { searchProducts } from "../utils/productsApi";
import ProductCard from "../components/productCard";
import MobileProductCard from "../components/mobileProductCards.jsx";
import CustomDropdown from "../components/dropdown";
import { useSearchParams } from "react-router-dom";

const ProductSearch = () => {
  const [searchParams] = useSearchParams(); // Get URL parameters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [departmentCode, setDepartmentCode] = useState(
    searchParams.get("departmentCode") || ""
  );
  const [supplierID, setSupplierID] = useState(
    searchParams.get("supplierID") || ""
  );
  const [status, setStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Load departments on mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        const allDepartments = [{ value: "", label: "All Departments" }];
        setDepartments(
          allDepartments.concat(
            data.map((dept) => ({
              value: dept.departmentCode,
              label: dept.departmentName,
            }))
          )
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    loadDepartments();
  }, []);

  // Load suppliers on mount
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const data = await fetchSuppliers();
        const suppliersArray = Array.isArray(data)
          ? data
          : data.suppliers || [];
        const allSuppliers = [{ value: "", label: "All Suppliers" }];
        setSuppliers(
          allSuppliers.concat(
            suppliersArray.map((supplier) => ({
              value: supplier._id,
              label: supplier.supplierName,
            }))
          )
        );
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    loadSuppliers();
  }, []);

  // Perform search on initial load based on URL parameters
  useEffect(() => {
    const performInitialSearch = async () => {
      if (
        searchParams.get("query") ||
        searchParams.get("departmentCode") ||
        searchParams.get("supplierID")
      ) {
        setLoading(true);
        try {
          const { results, total } = await searchProducts({
            searchTerm: searchParams.get("query") || "",
            departmentCode: searchParams.get("departmentCode") || "",
            supplierID: searchParams.get("supplierID") || "",
            status,
            page: 0,
            limit,
          });
          setProducts(results);
          setTotal(total);
        } catch (error) {
          console.error("Error fetching initial search results:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    performInitialSearch();
  }, [searchParams]);

  const handleSearch = async (newPage = 0) => {
    setLoading(true);
    try {
      const { results, total } = await searchProducts({
        searchTerm,
        departmentCode,
        status,
        supplierID,
        page: newPage,
        limit,
      });
      setProducts(results);
      setTotal(total);
      setPage(newPage);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(0);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="bg-amber-500 text-white shadow-lg rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Search Products
        </h2>
        <div className="flex flex-wrap gap-4">
          {/* Input Box */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 min-w-[200px] border border-gray-400 rounded-lg px-4 py-2 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          {/* Department Dropdown */}
          <CustomDropdown
            value={departmentCode}
            onChange={setDepartmentCode}
            options={departments}
            placeholder="All Departments"
          />

          {/* Status Dropdown */}
          <CustomDropdown
            value={status}
            onChange={setStatus}
            options={[
              { value: "", label: "Any Status" },
              { value: "available", label: "Available" },
              { value: "unavailable", label: "Unavailable" },
            ]}
            placeholder="Any Status"
          />

          {/* Supplier Dropdown */}
          <CustomDropdown
            value={supplierID}
            onChange={setSupplierID}
            options={suppliers}
            placeholder="All Suppliers"
          />

          {/* Search Button */}
          <button
            onClick={() => handleSearch(0)}
            className="bg-black text-yellow-500 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-900 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-700">Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <React.Fragment key={product._id}>
            {/* Desktop and Tablet View */}
            <div className="hidden sm:block">
              <ProductCard product={product} />
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden">
              <MobileProductCard product={product} />
            </div>
          </React.Fragment>
        ))}
      </div>
      {!loading && products.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handleSearch(page - 1)}
            disabled={page === 0}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50 transition duration-300"
          >
            Previous
          </button>
          <p className="text-gray-700">
            Page {page + 1} of {Math.ceil(total / limit)}
          </p>
          <button
            onClick={() => handleSearch(page + 1)}
            disabled={(page + 1) * limit >= total}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 disabled:opacity-50 transition duration-300"
          >
            Next
          </button>
        </div>
      )}
      {!loading && products.length === 0 && (
        <p className="text-center text-red-600 mt-6">No products found</p>
      )}
    </div>
  );
};

export default ProductSearch;
