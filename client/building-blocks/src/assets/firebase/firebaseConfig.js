import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_BuH0RfkpAmHZm3sp7Q6LM7JX80ff5lg",
  authDomain: "blocks-8ad39.firebaseapp.com",
  projectId: "blocks-8ad39",
  storageBucket: "blocks-8ad39.firebasestorage.app",
  messagingSenderId: "1076351814211",
  appId: "1:1076351814211:web:bf251b82e92ecceafbe2f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
