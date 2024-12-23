import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Custom hook to access auth context

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Check if user is logged in

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
