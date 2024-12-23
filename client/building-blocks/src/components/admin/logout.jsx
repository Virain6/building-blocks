import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../assets/firebase/firebaseConfig";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully.");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
