import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/landingPage";
import Footer from "./components/footer";
import ProductSearch from "./pages/searchPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/nn" element={<LandingPage />} />
          <Route path="/" element={<ProductSearch />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
