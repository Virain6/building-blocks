import { query, mutation } from "./_generated/server";

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

export const addSupplier = mutation(async ({ db }, { supplierName }) => {
  if (!supplierName) {
    throw new Error("Supplier name is required.");
  }

  const id = await db.insert("suppliers", { supplierName });
  return { _id: id, supplierName };
});

export const updateSupplier = mutation(async ({ db }, { id, supplierName }) => {
  if (!id || !supplierName) {
    throw new Error("Supplier ID and name are required.");
  }

  // Update the supplier's name in the `suppliers` table
  await db.patch(id, { supplierName });

  // Fetch all products associated with this supplier
  const productsToUpdate = await db
    .query("products")
    .filter((q) => q.eq(q.field("supplierID"), id))
    .collect();

  // Update the supplierName in all associated products
  await Promise.all(
    productsToUpdate.map((product) =>
      db.patch(product._id, {
        supplierName, // Update the supplierName in the product
      })
    )
  );

  return { _id: id, supplierName };
});

export const deleteSupplier = mutation(
  async ({ db }, { id, defaultSupplierId }) => {
    if (!id || !defaultSupplierId) {
      throw new Error("Supplier ID and default supplier ID are required.");
    }

    const supplier = await db.get(id);
    if (!supplier) {
      throw new Error(`Supplier with ID ${id} not found.`);
    }

    // Fetch the default supplier to get its name
    const defaultSupplier = await db.get(defaultSupplierId);
    if (!defaultSupplier) {
      throw new Error(
        `Default supplier with ID ${defaultSupplierId} not found.`
      );
    }

    // Fetch all products associated with the supplier being deleted
    const productsToUpdate = await db
      .query("products")
      .filter((q) => q.eq(q.field("supplierID"), id))
      .collect();

    // Update all associated products to the default supplier's ID and name
    await Promise.all(
      productsToUpdate.map((product) =>
        db.patch(product._id, {
          supplierID: defaultSupplierId,
          supplierName: defaultSupplier.supplierName,
        })
      )
    );

    // Delete the supplier
    await db.delete(id);

    return { message: `Supplier with ID ${id} successfully deleted.` };
  }
);
