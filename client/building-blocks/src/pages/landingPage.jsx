import React from "react";
import SearchBar from "../components/searchBar";
import GlowBox from "../components/glowBox";
import Explore from "../components/explore";
import CompanyList from "../components/companies";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className=" bg-tool-pattern bg-repeat bg-gray-900 animate-slow-pan text-amber-500 flex flex-col justify-center items-center"
        style={{ height: "calc(100vh - 7rem)" }}
      >
        <div className="flex items-center space-x-2">
          <h1 className="text-5xl font-bold mb-4 sm:text-6xl md:text-7xl">
            Welcome to{" "}
          </h1>
          <h1
            className="text-5xl md:text-7xl sm:text-6xl font-bold mb-4
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-amber-500 via-orange-600 to-yellow-500
            animate-text
            "
          >
            KeyStone
          </h1>
        </div>
        <p className="text-m mb-6 sm:text-lg">
          View our wide ranges of construction products for your next project
        </p>
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <SearchBar />
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works">
        <GlowBox />
      </div>
      <div
        className="container mx-auto text-center"
        style={{ width: "calc(100vw - 3rem)" }}
      >
        <hr className="" />
      </div>

      {/* Companies Section */}
      <div className="bg-gray-100 py-12">
        <CompanyList />
      </div>

      {/* Explore Section */}

      <div className="bg-white py-12">
        <Explore />
      </div>

      {/* Description Section */}
      <div className="bg-gray-100 py-12 pt-8" id="about">
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
