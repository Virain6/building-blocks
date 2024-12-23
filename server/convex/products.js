import { query, mutation } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("products").collect();
});

export const getById = query(async ({ db }, { id }) => {
  if (!id) {
    throw new Error("ID is required to fetch a document");
  }

  const product = await db.get(id);
  if (!product) {
    throw new Error(`No product found with ID: ${id}`);
  }

  return product;
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
    productName: productName.trim().toLowerCase(), // Convert to lowercase for consistency
    description: description?.trim() || "",
    price,
    stock: stock || 0,
    departmentCode,
    supplierID: supplierID?.trim() || "",
    leadTime: leadTime || 0,
    discountPrice: discountPrice || 0,
    status: status?.trim() || "available",
    picture: picture?.trim() || "",
    createdAt: now,
    updatedAt: now,
  };

  return await db.insert("products", newProduct);
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

export const searchByName = query(
  async (
    { db },
    {
      searchTerm = "",
      departmentCode = null,
      supplierID = null,
      status = null,
      page = 0,
      limit = 10,
    }
  ) => {
    // Normalize the searchTerm to lowercase if provided
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    // Start building the query
    let query = db.query("products");

    // Add department filter if provided
    if (departmentCode) {
      query = query.filter((q) =>
        q.eq(q.field("departmentCode"), departmentCode)
      );
    }

    // Add status filter if provided
    if (status) {
      query = query.filter((q) => q.eq(q.field("status"), status));
    }

    // Add supplierID filter if provided
    if (supplierID) {
      query = query.filter((q) => q.eq(q.field("supplierID"), supplierID));
    }

    // Collect all results from the database
    const allResults = await query.collect();

    // Filter results for partial matches if a search term is provided
    let filteredResults = allResults;
    if (normalizedSearchTerm) {
      filteredResults = allResults.filter((product) =>
        product.productName.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    // Apply pagination
    const startIndex = page * limit;
    const paginatedResults = filteredResults.slice(
      startIndex,
      startIndex + limit
    );

    return {
      results: paginatedResults,
      total: filteredResults.length, // Total number of matches
      page,
      limit,
    };
  }
);
