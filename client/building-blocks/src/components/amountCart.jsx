import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PlusMinusButton = ({
  initialCount = 0,
  min = 0,
  product,
  onChange,
  buttonName,
}) => {
  const [quantity, setQuantity] = useState(initialCount);

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
      <button
        onClick={() => onChange(product, quantity)}
        className="bg-amber-500 text-white px-4 py-2 rounded-lg"
      >
        {buttonName}
      </button>
    </div>
  );
};

export default PlusMinusButton;
