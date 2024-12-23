import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js"; // Adjust path as needed

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const router = express.Router();
const client = new ConvexHttpClient(process.env.CONVEX_URL); // Use the URL from the .env.local file

router.post("/register", async (req, res) => {
  const { uid, email } = req.body;

  try {
    console.log("Register endpoint hit with:", { uid, email }); // Debugging log
    await client.mutation(api.users.createUser, {
      uid,
      email,
      isAdmin: false, // Default is non-admin
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

export default router;
