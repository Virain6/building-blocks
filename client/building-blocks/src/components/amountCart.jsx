import React, { useState, useEffect } from "react";

const PlusMinusButton = ({
  initialCount = 0,
  min = 0,
  product,
  onChange,
  buttonName,
}) => {
  const [quantity, setQuantity] = useState(initialCount);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (buttonName === "Update") {
      // Check if the quantity is modified from the initial count
      setIsModified(quantity !== initialCount);
    }
  }, [quantity, initialCount, buttonName]);

  const handleDecrease = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center space-x-2">
      {buttonName === "Update" && isModified && (
        <button
          onClick={() => {
            onChange(product, quantity);
            setIsModified(false); // Reset modification state
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          {buttonName}
        </button>
      )}
      <div className="flex items-center space-x-2 rounded bg-gray-100">
        <button
          onClick={handleDecrease}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:text-gray-300 disabled:hover:bg-gray-200 font-bold py-1 px-3 rounded-l"
          disabled={quantity === 0}
        >
          -
        </button>
        <div className="text-center w-8">{quantity}</div>
        <button
          onClick={handleIncrease}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-r disabled:text-gray-300 disabled:hover:bg-gray-200"
          disabled={product.status === "unavailable"}
        >
          +
        </button>
      </div>
      {buttonName !== "Update" && (
        <button
          onClick={() => onChange(product, quantity)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          {buttonName}
        </button>
      )}
    </div>
  );
};

export default PlusMinusButton;
