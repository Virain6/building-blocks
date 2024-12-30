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
      supplierName: product.supplierName || "Unknown Supplier",
      departmentName: product.departmentName || "Unknown Department",
      barcodeID: product.barcodeID || "N/A",
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

// Fetch all pending orders
export const getPendingOrders = query(async ({ db }) => {
  return await db
    .query("orderDetails")
    .filter((q) => q.eq(q.field("status"), "pending"))
    .collect();
});

// Fetch all completed orders
export const getCompletedOrders = query(async ({ db }) => {
  return await db
    .query("orderDetails")
    .filter((q) => q.eq(q.field("status"), "completed"))
    .collect();
});

// Update an order
export const updateOrder = mutation(async ({ db }, { orderId, updates }) => {
  await db.patch(orderId, updates);
  const updatedOrder = await db.get(orderId); // Fetch the updated order
  return updatedOrder; // Return the updated order
});

// Mark an order as completed
export const completeOrder = mutation(async ({ db }, { orderId }) => {
  await db.patch(orderId, { status: "completed" });
});

export const getOrdersWithPaginationAndSearch = query(
  async (
    { db },
    { cursor, limit, search, status, supplierName, departmentName }
  ) => {
    if (limit <= 0) {
      throw new Error("Limit must be greater than 0");
    }

    // Start by ordering by "orderDate" in descending order
    let query = db.query("orderDetails").order("desc", "orderDate");

    // Apply "status" filter if provided
    if (status) {
      query = query.filter((q) => q.eq(q.field("status"), status));
    }

    const results = await query.collect();

    // Apply search filtering manually (case-insensitive "starts with")
    let filteredResults = results.filter((order) =>
      search
        ? order.custName.toLowerCase().startsWith(search.toLowerCase())
        : true
    );

    // Apply "supplierName" or "departmentName" filter if provided
    if (supplierName || departmentName) {
      filteredResults = filteredResults.filter((order) =>
        order.productsArray.some((product) => {
          const supplierMatch = supplierName
            ? product.supplierName &&
              product.supplierName.toLowerCase() === supplierName.toLowerCase()
            : true;
          const departmentMatch = departmentName
            ? product.departmentName &&
              product.departmentName.toLowerCase() ===
                departmentName.toLowerCase()
            : true;
          return supplierMatch && departmentMatch;
        })
      );
    }

    // Implement pagination manually
    const startIndex = cursor
      ? filteredResults.findIndex((order) => order.orderDate === cursor) + 1
      : 0;

    const paginatedResults = filteredResults.slice(
      startIndex,
      startIndex + limit
    );

    const nextCursor =
      startIndex + limit < filteredResults.length
        ? filteredResults[startIndex + limit - 1].orderDate
        : null;

    return {
      results: paginatedResults,
      nextCursor,
    };
  }
);
