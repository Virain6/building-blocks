import React, { useState } from "react";
import { updateOrderStatus } from "../../../utils/orderApi";
import { capitalizeWords } from "../../../utils/stringUtils";
import { toast } from "react-toastify";

const EditOrderModal = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...order });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.productsArray];
    // Apply parseFloat only for numeric fields
    if (["quantity", "currentPricePerItem"].includes(field)) {
      updatedProducts[index][field] = parseFloat(value) || 0;
    } else {
      updatedProducts[index][field] = value;
    }
    const updatedTotal = updatedProducts.reduce(
      (sum, product) => sum + product.quantity * product.currentPricePerItem,
      0
    );
    setFormData((prev) => ({
      ...prev,
      productsArray: updatedProducts,
      totalPrice: parseFloat((updatedTotal * 1.13).toFixed(2)), // excluding 13% tax
    }));
  };

  const handleSave = async () => {
    try {
      const updatedFormData = {
        ...formData,
        custName: formData.custName.toLowerCase(),
      };
      const updatedOrder = await updateOrderStatus(order._id, updatedFormData);
      toast.success("Order updated successfully!");
      onSave(updatedOrder);
    } catch (error) {
      console.error("Failed to update order:", error.message);
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Order</h2>
        <div className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Customer Name
            </label>
            <input
              type="text"
              value={capitalizeWords(formData.custName)}
              onChange={(e) => handleInputChange("custName", e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          {/* Customer Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Customer Email
            </label>
            <input
              type="text"
              value={formData.custEmail}
              onChange={(e) => handleInputChange("custEmail", e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          {/* Customer Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Customer Phone Number
            </label>
            <input
              type="text"
              value={formData.custNum}
              onChange={(e) => handleInputChange("custNum", e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Pickup Date
            </label>
            <input
              type="date"
              value={
                formData.pickUpDate
                  ? new Date(formData.pickUpDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleInputChange(
                  "pickUpDate",
                  new Date(e.target.value).getTime()
                )
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Products */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Products
            </label>
            <div className="space-y-4">
              {formData.productsArray.map((product, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-gray-100 space-y-2"
                >
                  <p className="font-bold text-gray-700">
                    {capitalizeWords(product.productName)}
                  </p>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">
                        Price
                      </label>
                      <input
                        type="number"
                        value={product.currentPricePerItem}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "currentPricePerItem",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">
                        Supplier Name
                      </label>
                      <input
                        type="text"
                        value={product.supplierName}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "supplierName",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">
                        Department Name
                      </label>
                      <input
                        type="text"
                        value={product.departmentName}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "departmentName",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold">
                        Barcode ID
                      </label>
                      <input
                        type="text"
                        value={product.barcodeID}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "barcodeID",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Total */}
          <div className="text-lg font-bold text-right">
            Total (with tax): ${formData.totalPrice.toFixed(2)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
