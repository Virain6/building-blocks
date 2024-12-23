import React, { useContext, useState, useEffect } from "react";
import { auth } from "../assets/firebase/firebaseConfig.js"; // Import Firebase auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to use AuthContext
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Track logged-in user
  const [loading, setLoading] = useState(true); // Track loading state

  // Sign up a new user
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in an existing user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out the current user
  const logout = () => {
    return signOut(auth);
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update currentUser when auth state changes
      setLoading(false); // Stop loading once the user state is fetched
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = {
    currentUser, // Currently logged-in user
    signup, // Function to sign up
    login, // Function to log in
    logout, // Function to log out
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}{" "}
      {/* Ensure app only loads after auth state is fetched */}
    </AuthContext.Provider>
  );
};
