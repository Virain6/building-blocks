import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    createdAt: v.number(), // Store timestamps as numbers
    departmentCode: v.string(),
    description: v.string(),
    discountPrice: v.float64(),
    leadTime: v.float64(),
    picture: v.string(),
    price: v.float64(),
    productName: v.string(),
    status: v.string(),
    stock: v.float64(),
    supplierID: v.string(),
    supplierName: v.optional(v.string()), // New
    departmentName: v.optional(v.string()), // New
    updatedAt: v.number(), // Store timestamps as numbers
  }),

  department: defineTable({
    departmentCode: v.string(),
    departmentName: v.string(),
  }),

  orderDetails: defineTable({
    custEmail: v.string(),
    custName: v.string(),
    orderDate: v.string(),
    pickUpDate: v.string(),
    productsArray: v.array(
      v.object({
        productName: v.string(),
        quantity: v.float64(),
        currentPricePerItem: v.float64(), // Capture the price at the time of the order
      })
    ),
    status: v.string(),
    totalPrice: v.float64(),
    notes: v.optional(v.string()), // New
  }),

  suppliers: defineTable({ supplierName: v.string() }),

  users: defineTable({
    uid: v.string(), // Firebase UID
    email: v.string(),
    isAdmin: v.boolean(),
  }),
});
