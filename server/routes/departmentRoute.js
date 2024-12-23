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
    const department = await client.query(api.department.getAll);
    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch department" });
  }
});

router.get("/:departmentCode", async (req, res) => {
  const { departmentCode } = req.params;

  try {
    // Ensure departmentCode is provided
    if (!departmentCode) {
      return res.status(400).json({ error: "departmentCode is required" });
    }

    // Fetch products by departmentCode
    const results = await client.query(api.department.getByDepartmentCode, {
      departmentCode,
    });

    // If no results are found, return a 404 error
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for this department code" });
    }

    // Return the fetched products
    res.json(results);
  } catch (error) {
    console.error(
      "Error fetching products by department code:",
      error.message,
      error.stack
    );
    res
      .status(500)
      .json({ error: "Failed to fetch products by department code" });
  }
});

export default router;
