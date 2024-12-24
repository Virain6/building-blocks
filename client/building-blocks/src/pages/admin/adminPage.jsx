import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminPage = () => {
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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Page</h1>
      {currentUser ? (
        <div className="text-center">
          <p className="text-lg mb-4">
            Welcome, <strong>{currentUser.email}</strong>
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500">You are not logged in!</p>
      )}
    </div>
  );
};

export default AdminPage;
