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
export const getAllUsers = query(async ({ db }) => {
  return await db.query("users").collect(); // Fetch all users
});

export const getAllAdmins = query(async ({ db }) => {
  return await db
    .query("users")
    .filter((q) => q.eq(q.field("isAdmin"), true))
    .collect();
});

// convex/api/users.js
export const getUserByUid = query(async ({ db }, { uid }) => {
  if (!uid) {
    throw new Error("UID is required.");
  }

  const user = await db
    .query("users")
    .filter((q) => q.eq(q.field("uid"), uid))
    .first();
  if (!user) {
    throw new Error("User not found.");
  }

  return user;
});

export const updateAdminStatus = mutation(async ({ db }, { uid, isAdmin }) => {
  const user = await db
    .query("users")
    .filter((q) => q.eq(q.field("uid"), uid))
    .first();

  if (!user) {
    throw new Error(`User with UID ${uid} not found.`);
  }

  // Update admin status
  await db.patch(user._id, { isAdmin });

  return { uid, isAdmin };
});
