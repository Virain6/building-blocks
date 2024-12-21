import React from "react";
import SearchBar from "../components/searchBar";
import GlowBox from "../components/glowBox";
import Explore from "../components/explore";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="bg-gray-900 text-amber-500 flex flex-col justify-center items-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div class="flex items-center space-x-2">
          <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
          <h1
            class="text-4xl font-bold mb-4
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-amber-500 via-orange-600 to-yellow-500
            animate-text
            "
          >
            BLOCKS
          </h1>
        </div>
        <p className="text-lg mb-6">
          Find the best products at unbeatable prices.
        </p>
        <SearchBar />
      </div>

      {/* How It Works Section */}
      <GlowBox />

      <Explore />

      {/* Description Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            At My Product Store, we pride ourselves on providing top-quality
            products and exceptional customer service. Our mission is to make
            your shopping experience seamless and enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
