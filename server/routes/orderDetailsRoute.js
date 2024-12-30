import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js"; // Adjust path as needed
import rateLimit from "express-rate-limit";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const router = express.Router();
const client = new ConvexHttpClient(process.env.CONVEX_URL); // Use the URL from the .env.local file

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 5, // Limit each IP to 5 requests per window
  message: "Too many order placement attempts. Please try again later.",
  error: "Too many order placement attempts. Please try again later",
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const orderDetails = await client.query(api.orderDetails.getAll);
    res.json(orderDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
});

router.post("/add", orderLimiter, async (req, res) => {
  try {
    const order = req.body;

    // Basic validation
    if (
      !order.custEmail ||
      !order.custName ||
      !order.productsArray ||
      !order.totalPrice
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: custEmail, custName, productsArray, or totalPrice",
      });
    }

    // Call the Convex mutation
    const newOrder = await client.mutation(api.orderDetails.addOrder, order);

    res.status(201).json({
      message: "Order successfully added",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Failed to add order" });
  }
});

router.get("/getByID/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await client.query(api.orderDetails.getById, { id: orderId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
});

export default router;
