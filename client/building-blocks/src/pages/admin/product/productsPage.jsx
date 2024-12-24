import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils/departmentApi";
import { fetchSuppliers } from "../../../utils/supplierApi";
import { searchProducts, deleteProduct } from "../../../utils/productsApi";
import CustomDropdown from "../../../components/dropdown";
import ProductFormModal from "./productFormModal";
import { capitalizeWords } from "../../../utils/stringUtils.js";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [supplierID, setSupplierID] = useState("");
  const [status, setStatus] = useState("");
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentMap, setDepartmentMap] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [supplierMap, setSupplierMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load departments and map them by code
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

        // Create a department map for quick lookup
        const departmentMap = data.reduce((map, dept) => {
          map[dept.departmentCode] = dept.departmentName;
          return map;
        }, {});
        setDepartmentMap(departmentMap);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    loadDepartments();
  }, []);

  // Load suppliers and map them by ID
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

        // Create a supplier map for quick lookup
        const supplierMap = suppliersArray.reduce((map, supplier) => {
          map[supplier._id] = supplier.supplierName;
          return map;
        }, {});
        setSupplierMap(supplierMap);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    loadSuppliers();
  }, []);

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

  const onEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        setProducts((prev) => prev.filter((product) => product._id !== id)); // Remove deleted product from state
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 overflow-y-auto">
      <div className="bg-amber-500 text-white shadow-lg rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Manage Products</h2>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 min-w-[200px] border border-gray-400 rounded-lg px-4 py-2 shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <CustomDropdown
            value={departmentCode}
            onChange={setDepartmentCode}
            options={departments}
            placeholder="All Departments"
          />
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
          <CustomDropdown
            value={supplierID}
            onChange={setSupplierID}
            options={suppliers}
            placeholder="All Suppliers"
          />
          <button
            onClick={() => handleSearch(0)}
            className="bg-black text-yellow-500 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-900 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-700">Loading...</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <div className="overflow-y-auto max-h-[500px]">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-amber-500 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Lead Time</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Supplier</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {capitalizeWords(product.productName)}
                  </td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">${product.discountPrice}</td>
                  <td className="px-4 py-2">{product.leadTime}</td>
                  <td className="px-4 py-2">
                    {departmentMap[product.departmentCode] ||
                      "Unknown Department"}
                  </td>
                  <td className="px-4 py-2">
                    {supplierMap[product.supplierID] || "Unknown Supplier"}
                  </td>
                  <td className="px-4 py-2">{product.status}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handleSearch(page - 1)}
          disabled={page === 0}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {page + 1} of {Math.ceil(total / limit)}
        </p>
        <button
          onClick={() => handleSearch(page + 1)}
          disabled={(page + 1) * limit >= total}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {!loading && products.length === 0 && (
        <p className="text-center text-red-600 mt-6">No products found</p>
      )}

      {isModalOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
