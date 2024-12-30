import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderDetailsById } from "../utils/orderApi";
import { capitalizeWords } from "../utils/stringUtils";

const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Get the orderId from URL params
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await fetchOrderDetailsById(orderId);
        if (!order) throw new Error("Order not found");
        setOrderDetails(order);
      } catch (error) {
        console.error("Failed to fetch order details:", error.message);
        setOrderDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="text-center mt-10">Loading order details...</div>;
  }

  if (!orderDetails) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load order details. Please try again later.
      </div>
    );
  }

  // Navigate back to home
  const handleHomeNavigation = () => {
    navigate("/");
  };

  return (
    <div
      className="container mx-auto p-4 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order Confirmation
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for your order! A confirmation email has been sent to your
          inbox. Please check your email, including the spam or junk folder.
        </p>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Order Details
          </h2>
          <div className="space-y-4">
            {orderDetails.productsArray.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <p className="text-gray-800 font-medium">
                  {capitalizeWords(product.productName)} (x{product.quantity})
                </p>
                <p className="text-gray-700">
                  ${(product.currentPricePerItem * product.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <p className="text-lg font-bold text-gray-800">Total:</p>
          <p className="text-lg font-bold text-green-600">
            ${orderDetails.totalPrice.toFixed(2)}
          </p>
        </div>
        <button
          className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          onClick={handleHomeNavigation}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
