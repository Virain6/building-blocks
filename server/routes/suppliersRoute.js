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
    const suppliers = await client.query(api.suppliers.getAll);
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
});

// Get a supplier by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await client.query(api.suppliers.getById, { id });
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch supplier by ID" });
  }
});

router.post(
  "/add",
  verifyTokenMiddleware,
  isAdminMiddleware,
  async (req, res) => {
    const { supplierName } = req.body;

    if (!supplierName) {
      return res.status(400).json({ error: "Supplier name is required." });
    }

    try {
      const newSupplier = await client.mutation(api.suppliers.addSupplier, {
        supplierName,
      });
      res.status(201).json(newSupplier);
    } catch (error) {
      console.error("Error adding supplier:", error);
      res.status(500).json({ error: "Failed to add supplier." });
    }
  }
);

router.put(
  "/edit/:id",
  verifyTokenMiddleware,
  isAdminMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { supplierName } = req.body;

    if (!supplierName) {
      return res.status(400).json({ error: "Supplier name is required." });
    }

    try {
      const updatedSupplier = await client.mutation(
        api.suppliers.updateSupplier,
        {
          id,
          supplierName,
        }
      );
      res.status(200).json(updatedSupplier);
    } catch (error) {
      console.error("Error updating supplier:", error);
      res.status(500).json({ error: "Failed to update supplier." });
    }
  }
);

router.delete(
  "/delete/:id",
  verifyTokenMiddleware,
  isAdminMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const defaultSupplierId = "jx76607n42tmvmxjbgpws8hy19773rkx"; // Hardcoded default supplier ID

    try {
      await client.mutation(api.suppliers.deleteSupplier, {
        id,
        defaultSupplierId,
      });
      res.status(200).json({ message: "Supplier deleted successfully." });
    } catch (error) {
      console.error("Error deleting supplier:", error);
      res.status(500).json({ error: "Failed to delete supplier." });
    }
  }
);
export default router;
