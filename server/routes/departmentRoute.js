import express from "express";
import dotenv from "dotenv";
import { verifyTokenMiddleware } from "../middleware/authMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
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

router.post(
  "/add",
  verifyTokenMiddleware,
  isAdminMiddleware,
  async (req, res) => {
    const { departmentName, departmentCode } = req.body;

    if (!departmentName || !departmentCode) {
      return res.status(400).json({
        error: "Both departmentName and departmentCode are required.",
      });
    }

    try {
      const newDepartment = await client.mutation(
        api.department.addDepartment,
        {
          departmentName,
          departmentCode,
        }
      );
      res.status(201).json(newDepartment);
    } catch (error) {
      console.error("Error adding department:", error);
      res.status(500).json({ error: "Failed to add department." });
    }
  }
);

router.delete(
  "/delete/:id",
  verifyTokenMiddleware,
  isAdminMiddleware,
  async (req, res) => {
    const { id } = req.params;
    try {
      await client.mutation(api.department.deleteDepartment, { id }); // Correct API path
      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      console.error("Error deleting department:", error);
      res.status(500).json({ error: "Failed to delete department." });
    }
  }
);

router.put(
  "/edit/:id",
  verifyTokenMiddleware,
  isAdminMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { departmentName, departmentCode } = req.body;

    if (!departmentName || !departmentCode) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const updatedDepartment = await client.mutation(
        api.department.updateDepartment,
        {
          id,
          departmentName,
          departmentCode,
        }
      );
      res.status(200).json(updatedDepartment);
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ error: "Failed to update department." });
    }
  }
);
export default router;
