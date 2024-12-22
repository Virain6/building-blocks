import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // State to hold search input
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      // Navigate to the search page with query as a URL parameter
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="relative flex items-center w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full border border-gray-600 bg-gray-500 rounded-full px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
