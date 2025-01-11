import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    createdAt: v.number(), // Store timestamps as numbers
    departmentCode: v.string(),
    description: v.string(),
    discountPrice: v.float64(),
    leadTime: v.float64(),
    picture: v.optional(v.string()),
    price: v.float64(),
    productName: v.string(),
    status: v.string(),
    stock: v.float64(),
    supplierID: v.string(),
    supplierName: v.optional(v.string()), // New
    departmentName: v.optional(v.string()), // New
    updatedAt: v.number(), // Store timestamps as numbers
    barcodeID: v.optional(v.string()), // New
  }),

  department: defineTable({
    departmentCode: v.string(),
    departmentName: v.string(),
  }),

  orderDetails: defineTable({
    custEmail: v.string(),
    custNum: v.optional(v.number()),
    custName: v.string(),
    orderDate: v.number(),
    pickUpDate: v.optional(v.number()),
    productsArray: v.array(
      v.object({
        productName: v.string(),
        quantity: v.float64(),
        currentPricePerItem: v.float64(), // Capture the price at the time of the order
        supplierName: v.optional(v.string()),
        departmentName: v.optional(v.string()),
        barcodeID: v.optional(v.string()),
      })
    ),
    status: v.string(),
    totalPrice: v.float64(),
    notes: v.optional(v.string()),
  }),

  suppliers: defineTable({ supplierName: v.string() }),

  users: defineTable({
    uid: v.string(), // Firebase UID
    email: v.string(),
    isAdmin: v.boolean(),
  }),
});
