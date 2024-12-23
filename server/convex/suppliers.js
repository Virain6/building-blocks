import { query } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("suppliers").collect();
});

export const getById = query(async ({ db }, { id }) => {
  if (!id) {
    throw new Error("ID is required to fetch a document");
  }

  const supplier = await db.get(id);
  if (!supplier) {
    throw new Error(`No supplier found with ID: ${id}`);
  }

  return supplier;
});
