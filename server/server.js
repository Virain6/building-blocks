import express from "express";
import cors from "cors";

//Route Imports
import productsRoutes from "./routes/productsRoute.js";
import usersRoutes from "./routes/usersRoute.js";
import departmentRoutes from "./routes/departmentRoute.js";
import orderDetailRoutes from "./routes/orderDetailsRoute.js";
import supplierRoutes from "./routes/suppliersRoute.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/department", departmentRoutes);
app.use("/orderDetails", orderDetailRoutes);
app.use("/suppliers", supplierRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//hello
