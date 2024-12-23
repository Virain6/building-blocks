import { query } from "./_generated/server";

export const getAll = query(async ({ db }) => {
  return await db.query("department").collect();
});

export const getByDepartmentCode = query(async ({ db }, { departmentCode }) => {
  if (!departmentCode) {
    throw new Error("departmentCode is required");
  }

  return await db
    .query("department")
    .filter((q) => q.eq(q.field("departmentCode"), departmentCode))
    .collect();
});
