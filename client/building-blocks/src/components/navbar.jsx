import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-orange-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">My Company</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
