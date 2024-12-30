import React, { useEffect, useState } from "react";
import {
  fetchOrdersWithPaginationAndSearch,
  updateOrderStatus,
} from "../../../utils/orderApi";
import EditOrderModal from "./editOrderModal";
import { capitalizeWords } from "../../../utils/stringUtils";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // For editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [cursor, setCursor] = useState(null); // Pagination cursor
  const [search, setSearch] = useState(""); // Search term
  const [hasMore, setHasMore] = useState(true); // Flag for pagination
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchOrders = async (reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    setIsLoading(true);

    try {
      // Use the correct status based on the viewCompleted state
      const status = viewCompleted ? "completed" : "pending";
      const response = await fetchOrdersWithPaginationAndSearch(
        reset ? null : cursor,
        10, // Limit per page
        search,
        status // Pass status to the backend
      );

      if (reset) {
        setOrders(response.results);
      } else {
        setOrders((prev) => [...prev, ...response.results]);
      }

      setCursor(response.nextCursor); // Update cursor for pagination
      setHasMore(!!response.nextCursor); // Check if more items exist
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(true); // Fetch orders when status or search changes
  }, [viewCompleted]);

  const handleSearch = () => {
    fetchOrders(true); // Trigger search when the button is clicked
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      await updateOrderStatus(orderId, { status: "completed" });
      setOrders((orders) => orders.filter((order) => order._id !== orderId)); // Remove order from list
    } catch (error) {
      console.error("Failed to update order status:", error.message);
    }
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleToggleView = () => {
    setViewCompleted((prev) => !prev); // Toggle viewCompleted
    setCursor(null); // Reset cursor for new query
    setOrders([]); // Clear existing orders
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="bg-amber-500 text-white shadow-lg rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Order Management</h2>
          <button
            onClick={handleToggleView}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {viewCompleted ? "View Pending Orders" : "View Completed Orders"}
          </button>
        </div>
        <div className="mt-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by customer name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 border text-black rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {viewCompleted ? "Completed Orders" : "Pending Orders"}
        </h2>
        {orders.map((order) => (
          <div
            key={order._id}
            className="border-b py-4 flex justify-between hover:bg-gray-200"
          >
            <div>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Customer:</strong> {capitalizeWords(order.custName)}
              </p>
              <p>
                <strong>Email:</strong> {order.custEmail}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex space-x-4">
              {!viewCompleted && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded h-11"
                  onClick={() => handleMarkAsCompleted(order._id)}
                >
                  Mark as Completed
                </button>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded h-11"
                onClick={() => handleEditOrder(order)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            className="animate-bounce w-12 h-12 rounded-full flex items-center justify-center border border-gray-300"
            onClick={() => fetchOrders(false)}
            disabled={isLoading}
            style={{
              backgroundColor: "transparent",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? (
              <div className="animate-spin mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
                    stroke="#f59e0b"
                    strokeWidth="3.55556"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
            ) : (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M10 8L14 8V10L8 16L2 10V8H6V0L10 4.76995e-08V8Z"
                  fill="#f59e0b"
                ></path>
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Edit Order Modal */}
      {isModalOpen && (
        <EditOrderModal
          order={selectedOrder}
          onClose={closeModal}
          onSave={(updatedOrder) => {
            setOrders((orders) =>
              orders.map((order) =>
                order._id === updatedOrder._id ? updatedOrder : order
              )
            );
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default OrderManagementPage;
