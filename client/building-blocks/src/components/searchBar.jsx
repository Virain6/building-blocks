import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative flex items-center w-full max-w-2xl">
        {" "}
        {/* Increased max-width */}
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full border border-gray-600 bg-gray-500 rounded-full px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-700"
        />
        <button className="absolute right-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-200">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
