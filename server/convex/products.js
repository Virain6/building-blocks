import { query } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("products").collect();
});

export const getById = query(async ({ db }, { productId }) => {
  return await db.get("products", productId);
});
