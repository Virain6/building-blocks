import { query, mutation } from "./_generated/server";

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

export const addDepartment = mutation(
  async ({ db }, { departmentName, departmentCode }) => {
    if (!departmentName || !departmentCode) {
      throw new Error("Both departmentName and departmentCode are required.");
    }

    const newDepartment = {
      departmentName,
      departmentCode,
    };

    const id = await db.insert("department", newDepartment);
    return { _id: id, ...newDepartment };
  }
);

export const deleteDepartment = mutation(async ({ db }, { id }) => {
  if (!id) {
    throw new Error("Department ID is required.");
  }

  const DEFAULT_DEPARTMENT_CODE = "DEFAULT";

  // Fetch the department to be deleted
  const department = await db.get(id);
  if (!department) {
    throw new Error(`Department with ID ${id} not found.`);
  }

  // Ensure the default department exists
  const defaultDepartment = await db
    .query("department")
    .filter((q) => q.eq(q.field("departmentCode"), DEFAULT_DEPARTMENT_CODE))
    .first();

  if (!defaultDepartment) {
    throw new Error("Default department not found.");
  }

  // Update all products with the departmentCode of the department being deleted
  const productsToUpdate = await db
    .query("products")
    .filter((q) => q.eq(q.field("departmentCode"), department.departmentCode))
    .collect();

  for (const product of productsToUpdate) {
    await db.patch(product._id, { departmentCode: DEFAULT_DEPARTMENT_CODE });
  }

  // Delete the department
  await db.delete(id);

  return {
    message: `Department with ID ${id} deleted. Products updated to default department.`,
  };
});

export const updateDepartment = mutation(
  async ({ db }, { id, departmentName, departmentCode }) => {
    if (!id || !departmentName || !departmentCode) {
      throw new Error("All fields are required.");
    }

    const department = await db.get(id);
    if (!department) {
      throw new Error(`Department with ID ${id} not found.`);
    }

    // Update the department
    await db.patch(id, { departmentName, departmentCode });

    // Update all products associated with the old department code
    const productsToUpdate = await db
      .query("products")
      .filter((q) => q.eq(q.field("departmentCode"), department.departmentCode))
      .collect();

    for (const product of productsToUpdate) {
      await db.patch(product._id, { departmentCode });
    }

    return { _id: id, departmentName, departmentCode };
  }
);
