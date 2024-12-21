import { query } from "./_generated/server";

export const getAllAdmins = query(async ({ db }) => {
  return await db.query("users").collect();
});
