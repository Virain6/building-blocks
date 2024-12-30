import { mutation, query } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("orderDetails").collect();
});

export const addOrder = mutation(async ({ db }, order) => {
  const now = Date.now();
  const {
    custEmail,
    custName,
    custNum,
    notes = "",
    pickUpDate,
    productsArray,
    totalPrice,
  } = order;

  // Validation: Ensure required fields are provided
  if (!custEmail || !custName || !productsArray || !totalPrice) {
    throw new Error(
      "Missing required fields: custEmail, custName, productsArray, totalPrice"
    );
  }

  const newOrder = {
    custEmail: custEmail.trim().toLowerCase(), // Normalize email
    custName: custName.trim(), // Trim and normalize name
    custNum: custNum || null, // Optional field
    notes: notes?.trim() || "",
    orderDate: now,
    productsArray: productsArray.map((product) => ({
      productName: product.productName.trim(),
      quantity: product.quantity,
      currentPricePerItem: product.currentPricePerItem,
    })),
    totalPrice,
    status: "pending", // Default status
  };

  // Conditionally add pickUpDate if it exists
  if (pickUpDate) {
    newOrder.pickUpDate = pickUpDate;
  }

  // Insert the new order into the database
  return await db.insert("orderDetails", newOrder);
});

export const getById = query(async ({ db }, { id }) => {
  const order = await db.get(id);
  if (!order) {
    throw new Error(`Order with ID ${id} not found.`);
  }
  return order;
});
