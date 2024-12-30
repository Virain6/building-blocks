import express from "express";
import dotenv from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js"; // Adjust path as needed
import rateLimit from "express-rate-limit";
import { sendEmail } from "../mailer.js"; // Adjust the path as needed

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

    // Send email to the customer
    const emailSubject = "Order Confirmation";
    const emailContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f8f9fa; /* Light background color */
        color: #333333;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff; /* White background */
        border: 1px solid #dddddd; /* Light border */
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      }
      .header {
        background-color: #d97706; /* Primary color */
        color: #ffffff;
        padding: 15px;
        text-align: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        margin: 0 0 10px;
        line-height: 1.6;
      }
      .order-id {
        background-color: #e9ecef; /* Light grey background */
        padding: 10px;
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
        color: #333333;
        border-radius: 5px;
      }
      .product-list {
        margin: 20px 0;
        padding: 0;
        list-style: none;
      }
      .product-list li {
        margin: 10px 0;
        padding: 10px;
        background-color: #f1f1f1; /* Light grey background */
        border-radius: 5px;
      }
      .product-list li span {
        font-weight: bold;
        color: #007bff; /* Primary color */
      }
      .total {
        font-size: 18px;
        font-weight: bold;
        color: #28a745; /* Success color */
        margin-top: 20px;
        text-align: right;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        text-align: center;
        color: #666666;
      }
      .footer a {
        color: #007bff; /* Primary color */
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>KeyStone: Order Confirmation</h1>
      </div>
      <div class="content">
        <p>Dear ${order.custName},</p>
        <p>Thank you for your order! Here are the details:</p>
        <div class="order-id">Order ID: ${newOrder}</div>
        <ul class="product-list">
          ${order.productsArray
            .map(
              (product) =>
                `<li>${product.productName} (x${product.quantity}) - <span>$${(
                  product.currentPricePerItem * product.quantity
                ).toFixed(2)}</span></li>`
            )
            .join("")}
        </ul>
        <div class="total">Total: $${order.totalPrice.toFixed(2)}</div>
      </div>
      <div class="footer">
        <p>We will notify you when your order is ready for pickup.</p>
        <p>Thank you for shopping with us!</p>
        <p>
          Need help? Contact us at
          <a href="mailto:keystonesuppliers@gmail.com">keystonesuppliers@gmail.com</a>.
        </p>
      </div>
    </div>
  </body>
</html>
`;
    await sendEmail(order.custEmail, emailSubject, emailContent);

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
