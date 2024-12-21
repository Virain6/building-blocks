import { query, mutation } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("products").collect();
});

export const getById = query(async ({ db }, { productId }) => {
  return await db.get("products", productId);
});

export const getLatestProducts = query(async ({ db }, { limit }) => {
  const products = await db
    .query("products")
    .order("desc", "updatedAt") // Sort by numeric timestamp
    .take(limit);

  return products.map((product) => ({
    ...product,
    updatedAt: product.updatedAt, // Keep as numeric timestamp
    createdAt: product.createdAt, // Keep as numeric timestamp
  }));
});

export const addProduct = mutation(async ({ db }, product) => {
  const now = Date.now(); // Get current timestamp in milliseconds

  // Ensure required fields are present
  const {
    productName,
    description,
    price,
    stock,
    departmentCode,
    supplierID,
    leadTime,
    discountPrice,
    status,
    picture,
  } = product;

  if (!productName || !price || !departmentCode) {
    throw new Error(
      "Missing required fields: productName, price, departmentCode"
    );
  }

  const newProduct = {
    productName,
    description: description || "",
    price,
    stock: stock || 0,
    departmentCode,
    supplierID: supplierID || "",
    leadTime: leadTime || 0,
    discountPrice: discountPrice || 0,
    status: status || "available",
    picture: picture || "",
    createdAt: now, // Use timestamp
    updatedAt: now, // Use timestamp
  };

  // Insert the product into the database
  const result = await db.insert("products", newProduct);
  return result;
});

export const migrateDatesToTimestamps = mutation(async ({ db }) => {
  const products = await db.query("products").collect();

  for (const product of products) {
    // Convert ISO string to numeric timestamp
    const updatedAtTimestamp =
      typeof product.updatedAt === "string"
        ? Date.parse(product.updatedAt) // Convert ISO string to timestamp
        : product.updatedAt;

    const createdAtTimestamp =
      typeof product.createdAt === "string"
        ? Date.parse(product.createdAt) // Convert ISO string to timestamp
        : product.createdAt;

    // Update the database with numeric timestamps
    await db.patch(product._id, {
      updatedAt: updatedAtTimestamp,
      createdAt: createdAtTimestamp,
    });
  }

  return "Migration complete!";
});
