import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDepartments } from "../utils/departmentApi";
import { fetchSuppliers } from "../utils/supplierApi";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null); // Tracks which dropdown is open
  const [query, setQuery] = useState(""); // State for the search query
  const [departments, setDepartments] = useState([]); // Departments
  const [suppliers, setSuppliers] = useState([]); // Suppliers (Brands)
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const { getNumItems } = useCart();

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

  // Update the cart count dynamically
  useEffect(() => {
    setCartCount(getNumItems()); // Initial load

    const handleStorageChange = () => {
      setCartCount(getNumItems());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [getNumItems]); // Include `getNumItems` as dependency

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
          <Link to="/cart" className="relative">
            {/* Cart Icon */}
            <button className="block focus:outline-none">
              <svg
                fill="#FFF"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 902.86 902.86"
                className="h-8 w-8"
              >
                <g>
                  <g>
                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                    <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742S619.162,694.432,619.162,716.897z" />
                  </g>
                </g>
              </svg>
            </button>
            {/* Badge for Item Count */}
            {cartCount > 0 && (
              <span className="absolute bottom-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
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
