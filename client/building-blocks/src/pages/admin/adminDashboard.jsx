import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRouter = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };
  return (
    <div
      className=" flex bg-gray-100"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-700 text-white shadow-lg flex flex-col">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="block px-4 py-2">{currentUser.email}</p>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                to="/admin/settings"
                className="block px-4 py-2 rounded-md hover:bg-amber-500 transition"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/admin/management"
                className="block px-4 py-2 rounded-md hover:bg-amber-500 transition"
              >
                Admin Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block px-4 py-2 rounded-md hover:bg-amber-500 transition"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/departments"
                className="block px-4 py-2 rounded-md hover:bg-amber-500 transition"
              >
                Departments
              </Link>
            </li>
            <li>
              <Link
                to="/admin/suppliers"
                className="block px-4 py-2 rounded-md hover:bg-amber-500 transition"
              >
                Suppliers
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-2 rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRouter;
