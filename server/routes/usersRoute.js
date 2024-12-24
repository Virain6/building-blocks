import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js"; // Adjust path as needed
import { verifyTokenMiddleware } from "../middleware/authMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";

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

router.put(
  "/update-admin",
  verifyTokenMiddleware, // Validate token first
  isAdminMiddleware, // Then check if the user is an admin
  async (req, res) => {
    const { uid, isAdmin } = req.body;

    if (!uid || typeof isAdmin !== "boolean") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    try {
      const updatedUser = await client.mutation(api.users.updateAdminStatus, {
        uid,
        isAdmin,
      });
      res.status(200).json({ message: "Admin status updated.", updatedUser });
    } catch (error) {
      console.error("Error updating admin status:", error);
      res.status(500).json({ error: "Failed to update admin status." });
    }
  }
);

// Fetch all users
router.get(
  "/",
  verifyTokenMiddleware, // Validate token first
  isAdminMiddleware,
  verifyTokenMiddleware, // Validate token first
  isAdminMiddleware,
  async (req, res) => {
    try {
      const users = await client.query(api.users.getAllUsers); // Query from Convex
      res.status(200).json(users); // Send users as response
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
);

export default router;
