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
    const products = await client.query(api.products.getAll);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await client.query(api.products.getById, { productId });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product by ID" });
  }
});

router.get("/latest/:limit", async (req, res) => {
  try {
    const limit = parseInt(req.params.limit, 10); // Get the limit from the route parameter
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: "Invalid limit parameter" });
    }
    const latestProducts = await client.query(api.products.getLatestProducts, {
      limit,
    });
    console.log("Latest products fetched:", latestProducts);
    res.json(latestProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
});

router.post("/migrateDates", async (req, res) => {
  try {
    const result = await client.mutation(api.products.migrateDatesToTimestamps);
    console.log("Migration result:", result);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error("Error running migration:", error);
    res.status(500).json({ error: "Failed to run migration" });
  }
});

export default router;
