import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Tracks which dropdown is open

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

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
          <h1 className="text-4xl font-bold whitespace-nowrap">Blocks</h1>

          {/* Search Section */}
          <div className="flex-grow mx-4 flex justify-center">
            <div className="flex items-center w-full max-w-md">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-700"
              />
              <button className="ml-2 px-4 sm:px-6 py-2 bg-white text-orange-600 font-semibold rounded-md hover:bg-gray-100">
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
      <div className="bg-orange-500 py-2">
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
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg">
                <ul className="py-2 w-40">
                  <li>
                    <a
                      href="/tools"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Tools
                    </a>
                  </li>
                  <li>
                    <a
                      href="/hardware"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Hardware
                    </a>
                  </li>
                  <li>
                    <a
                      href="/safety"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Safety
                    </a>
                  </li>
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
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg">
                <ul className="py-2 w-40">
                  <li>
                    <a
                      href="/new-arrivals"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      New Arrivals
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
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg">
                <ul className="py-2 w-40">
                  <li>
                    <a
                      href="/repairs"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Repairs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/installation"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Installation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/warranty"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Warranty
                    </a>
                  </li>
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
              <div className="absolute left-0 mt-2 bg-white text-orange-600 rounded-md shadow-lg">
                <ul className="py-2 w-40">
                  <li>
                    <a
                      href="/repairs"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Repairs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/installation"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Installation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/warranty"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Warranty
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
