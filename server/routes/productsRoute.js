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
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a product by ID
router.get("/searchID/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await client.query(api.products.getById, { id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
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
    res.json(latestProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
});

router.post("/add", async (req, res) => {
  const productData = req.body; // Get product data from the request body

  try {
    const addedProduct = await client.mutation(
      api.products.addProduct,
      productData
    ); // Call Convex mutation
    res.status(201).json(addedProduct); // Return the created product
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" }); // Handle errors
  }
});

router.get("/search", async (req, res) => {
  const {
    q,
    departmentCode,
    status,
    supplierID,
    page = 0,
    limit = 10,
  } = req.query;

  try {
    const results = await client.query(api.products.searchByName, {
      searchTerm: q,
      departmentCode,
      status,
      supplierID, // Pass supplierID to the query
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products by name" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await client.mutation(api.products.deleteProduct, { id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});
export default router;
