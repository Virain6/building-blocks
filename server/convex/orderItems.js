import { query } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("orderItems").collect();
});
