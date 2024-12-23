import { mutation, query } from "./_generated/server";

export const createUser = mutation(async ({ db }, { uid, email, isAdmin }) => {
  const existingUser = await db
    .query("users")
    .filter((q) => q.eq(q.field("uid"), uid))
    .first();

  if (!existingUser) {
    await db.insert("users", {
      uid,
      email,
      isAdmin,
    });
  }
});

export const getAllAdmins = query(async ({ db }) => {
  return await db
    .query("users")
    .filter((q) => q.eq(q.field("isAdmin"), true))
    .collect();
});
