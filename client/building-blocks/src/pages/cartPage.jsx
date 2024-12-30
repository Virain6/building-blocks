import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import PlusMinusButton from "../components/amountCart";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../utils/stringUtils.js";
import { addOrder } from "../utils/orderApi";
import PhoneNumberInput from "../components/phoneNumberInput.jsx";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    cart,
    products,
    updateCart,
    removeFromCart,
    getTotalCost,
    getMaxLeadTime,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);
  const [rawPhoneNumber, setRawPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (phone) => {
    setRawPhoneNumber(phone); // Update raw phone number
  };

  const handlePay = async () => {
    // Validate email and name
    if (!email.trim() || !name.trim()) {
      return toast.error("Please provide a valid email and name.");
    }
    setLoading(true); // Start loading

    // Prepare the order data
    const orderData = {
      custEmail: email.trim().toLowerCase(), // Normalize email
      custName: name.trim().toLowerCase(),
      custNum: rawPhoneNumber ? parseFloat(rawPhoneNumber) : null,
      productsArray: [],
      totalPrice: getTotalCost(),
    };

    // Map products to productsArray
    products.forEach((product) => {
      const cartItem = cart.find((item) => item.id === product._id);
      if (cartItem) {
        orderData.productsArray.push({
          productName: product.productName,
          quantity: cartItem.quantity,
          currentPricePerItem: product.discountPrice || product.price,
        });
      }
    });

    try {
      const newOrder = await addOrder(orderData);
      toast.success("Order placed successfully!");
      clearCart();

      // Optionally, clear the cart or navigate to a confirmation page
      navigate(`/order-confirmation/${newOrder.order}`); // Adjust this route as needed
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // 429 is the status code for Too Many Requests
        toast.error("To many requests. Please try again later.");
      } else {
        console.error("Failed to add order:", error.message);
        toast.error("Failed to place the order. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div
      className="container mx-auto p-4"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      {loading ? (
        <div
          className="flex flex-col items-center justify-center"
          style={{ minHeight: "calc(100vh - 15rem)" }}
        >
          <div className="animate-spin mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24"
            >
              <path
                d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
                stroke="#f59e0b"
                strokeWidth="3.55556"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-700">Processing...</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  Order Summary
                </h2>

                <div className="mb-4">
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-700">
                      Estimated Lead Time:
                    </span>{" "}
                    {getMaxLeadTime()} days
                  </p>
                  <p className="text-sm text-gray-500">
                    The estimated lead time is almost always accurate. You will
                    receive an email after ordering when the lead time is
                    confirmed.
                  </p>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-800 font-semibold">
                    ${getTotalCost().toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600">Tax (HST 13%)</p>
                  <p className="text-gray-800 font-semibold">
                    ${(getTotalCost() * 0.13).toFixed(2)}
                  </p>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-700">Total</p>
                  <p className="text-lg font-bold text-orange-600">
                    ${(getTotalCost() * 1.13).toFixed(2)}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-700">Please Read</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    By placing this order you confirm blash blah blah
                  </p>
                </div>
                <button
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                  onClick={() => setCheckout(!checkout)}
                >
                  {checkout ? (
                    <div className="flex items-center">
                      <svg
                        fill="#ffffff"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 92 92"
                        enableBackground="new 0 0 92 92"
                        xmlSpace="preserve"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          id="XMLID_223_"
                          d="M82,32.3V72c0,2.2-1.8,4-4,4H19.1c-2.2,0-4-1.8-4-4s1.8-4,4-4H74V36H23.7l5.5,5.6c1.6,1.6,1.6,4.2,0,5.8 c-0.8,0.8-1.8,1.2-2.8,1.2c-1,0-2-0.4-2.8-1.2L11.2,35.1c-0.8-0.8-1.2-1.8-1.2-2.8c0-1.1,0.4-2.1,1.2-2.8l12.4-12.3 c1.6-1.6,4.1-1.6,5.7,0s1.5,4,0,5.6L23.7,28H78C80.2,28,82,30.1,82,32.3z"
                        ></path>
                      </svg>
                      <p>Return to cart</p>
                    </div>
                  ) : (
                    <p>Proceed to Checkout</p>
                  )}
                </button>
              </div>
              {!checkout && (
                <div>
                  {cart.map((item) => {
                    const product = products.find((p) => p._id === item.id);
                    if (!product) return null;

                    return (
                      <div
                        key={product._id}
                        className="border p-4 rounded shadow mb-4"
                      >
                        <div className="flex justify-between items-center">
                          {/* Product Name */}
                          <h2
                            className="text-xl font-semibold hover:underline"
                            onClick={() => navigate(`/product/${product._id}`)}
                          >
                            {capitalizeWords(product.productName)}
                          </h2>

                          {/* PlusMinusButton and Remove Button */}
                          <div className="flex items-center space-x-4">
                            <PlusMinusButton
                              initialCount={item.quantity}
                              min={1}
                              product={product}
                              onChange={(product, quantity) =>
                                updateCart(product, quantity)
                              }
                              buttonName="Update"
                            />
                            <button
                              onClick={() => removeFromCart(product)}
                              className="text-red-500 hover:text-red-700 text-xl font-bold px-2 py-1 rounded focus:outline-none"
                              aria-label="Remove from cart"
                            >
                              &times;
                            </button>
                          </div>
                        </div>

                        {/* Price Section */}
                        <p>
                          Price:
                          {product.discountPrice ? (
                            <>
                              <span className="text-red-500">
                                ${product.discountPrice}
                              </span>
                              <span className="line-through ml-2 text-gray-500">
                                ${product.price}
                              </span>
                            </>
                          ) : (
                            `$${product.price}`
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              {checkout && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 text-gray-700">
                    Payment
                  </h2>
                  {/* Email and Phone Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border rounded-md text-gray-800"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-semibold mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-md text-gray-800"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <PhoneNumberInput
                    onPhoneNumberChange={handlePhoneNumberChange}
                  />
                  <div className="mt-10">
                    <p className="text-sm text-gray-500">
                      After placing the order you recieve a confirmation email
                      with your order number.
                    </p>
                  </div>
                  <button
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                    onClick={() => handlePay()}
                  >
                    <p className="mr-2">Pay</p>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V8.5C22 8.77614 21.7761 9 21.5 9L2.5 9C2.22386 9 2 8.77614 2 8.5V8ZM2.5 11C2.22386 11 2 11.2239 2 11.5V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V11.5C22 11.2239 21.7761 11 21.5 11L2.5 11ZM13 15C13 14.4477 13.4477 14 14 14H17C17.5523 14 18 14.4477 18 15C18 15.5523 17.5523 16 17 16H14C13.4477 16 13 15.5523 13 15Z"
                        fill="#ffffff"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
