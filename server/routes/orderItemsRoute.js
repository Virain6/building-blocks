import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js"; // Adjust path as needed

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const router = express.Router();
const client = new ConvexHttpClient(process.env.CONVEX_URL); // Use the URL from the .env.local file

// Get all products
router.get("/", async (req, res) => {
  try {
    const orderItems = await client.query(api.orderItems.getAll);
    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order items" });
  }
});

export default router;
