import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDepartments } from "../utils/departmentApi";
import { fetchSuppliers } from "../utils/supplierApi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null); // Tracks which dropdown is open
  const [query, setQuery] = useState(""); // State for the search query
  const [departments, setDepartments] = useState([]); // Departments
  const [suppliers, setSuppliers] = useState([]); // Suppliers (Brands)
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const navigate = useNavigate();

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(null);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Fetch departments and suppliers on mount
    const loadDropdownData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        const suppliersData = await fetchSuppliers();

        // Update state with fetched data
        setDepartments(
          departmentsData.map((dept) => ({
            value: dept.departmentCode,
            label: dept.departmentName,
          }))
        );
        setSuppliers(
          suppliersData.map((supplier) => ({
            value: supplier._id,
            label: supplier.supplierName,
          }))
        );
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    loadDropdownData();

    // Add event listener for outside clicks
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const ArrowIcon = ({ isOpen }) => (
    <span className="ml-2">
      {isOpen ? (
        <svg
          className="w-4 h-4 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </span>
  );

  return (
    <div className="bg-orange-600 text-white">
      {/* Top Navbar */}
      <nav className="p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Company Name */}
          <Link to="/" className="text-4xl font-bold whitespace-nowrap">
            <h1 className="text-4xl font-bold whitespace-nowrap">KeyStone</h1>
          </Link>

          {/* Search Section */}
          <div className="flex-grow mx-4 flex justify-center">
            <div className="flex items-center w-full max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-4 sm:px-6 py-2 bg-white text-orange-600 font-semibold rounded-md hover:bg-gray-100"
              >
                Search
              </button>
            </div>
          </div>

          {/* Cart Icon */}
          <button className="block focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h13l-2-8M9 21a2 2 0 11-4 0 2 2 0 014 0zm11 0a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Dropdown Line */}
      <div className="bg-orange-500 py-2" ref={dropdownRef}>
        <div className="container mx-auto flex justify-center space-x-8">
          {/* Dropdown 1 */}
          <div className="relative">
            <button
              className="hover:underline flex items-center"
              onClick={() => toggleDropdown("department")}
            >
              Departments
              <ArrowIcon isOpen={dropdownOpen === "department"} />
            </button>
            {dropdownOpen === "department" && (
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg z-10">
                <ul className="py-2 w-40">
                  {departments.map((dept) => (
                    <li key={dept.value}>
                      <button
                        onClick={() =>
                          navigate(`/search?departmentCode=${dept.value}`)
                        }
                        className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                      >
                        {dept.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown 2 */}
          <div className="relative">
            <button
              className="hover:underline flex items-center"
              onClick={() => toggleDropdown("products")}
            >
              Products
              <ArrowIcon isOpen={dropdownOpen === "products"} />
            </button>
            {dropdownOpen === "products" && (
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg z-10">
                <ul className="py-2 w-40">
                  <li>
                    <a
                      href="/new-arrivals"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Newly Updated
                    </a>
                  </li>
                  <li>
                    <a
                      href="/best-sellers"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Best Sellers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/sale"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      On Sale
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown 3 */}
          <div className="relative">
            <button
              className="hover:underline flex items-center"
              onClick={() => toggleDropdown("brand")}
            >
              Brand
              <ArrowIcon isOpen={dropdownOpen === "brand"} />
            </button>
            {dropdownOpen === "brand" && (
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg z-10">
                <ul className="py-2 w-40">
                  {suppliers.map((supplier) => (
                    <li key={supplier.value}>
                      <button
                        onClick={() =>
                          navigate(`/search?supplierID=${supplier.value}`)
                        }
                        className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                      >
                        {supplier.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Dropdown 4 */}
          <div className="relative">
            <button
              className="hover:underline flex items-center"
              onClick={() => toggleDropdown("info")}
            >
              Info
              <ArrowIcon isOpen={dropdownOpen === "info"} />
            </button>
            {dropdownOpen === "info" && (
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg z-10">
                <ul className="py-2 w-40">
                  <li>
                    <a
                      href="/repairs"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/installation"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/warranty"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      How it works
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Item 5 */}
          <div className="relative">
            <button className="hover:underline flex items-center">Deals</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
