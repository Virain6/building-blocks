import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-8">
      <input
        type="text"
        placeholder="Search for products..."
        className="border border-gray-300 rounded-l-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-yellow-600 text-white px-4 py-2 rounded-r-md hover:bg-yellow-700">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
