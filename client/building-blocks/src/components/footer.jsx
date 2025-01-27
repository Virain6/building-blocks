import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 Blocks. All Rights Reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-2">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </a>
          <a href="/admin" className="text-gray-400 hover:text-white mx-2">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
