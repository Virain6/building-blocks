import React from "react";
import { useCart } from "../context/cartContext";
import PlusMinusButton from "../components/amountCart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    products,
    updateCart,
    removeFromCart,
    getTotalCost,
    getMaxLeadTime,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div
      className="container mx-auto p-4"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {product.productName}
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
                receive an email after ordering when the lead time is confirmed.
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
            <button
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
              onClick={() => alert("Proceed to Checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
