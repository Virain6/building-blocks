import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { capitalizeWords } from "../utils/stringUtils";
import { fetchProductById } from "../utils/productsApi"; // Import your API call

const CartContext = createContext();

const CART_KEY = "keystone_Cart";

const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch {
    return false;
  }
};
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // Products associated with cart items
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    // Check local storage availability on initialization
    setStorageAvailable(isLocalStorageAvailable());

    if (storageAvailable) {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } else {
      console.error("Local storage is unavailable. Using in-memory cart.");
    }
  }, [storageAvailable]);

  // Initialize cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_KEY); // Remove cart if empty
    }
    fetchProductsForCart(); // Fetch product details when cart updates
  }, [cart]);

  // Fetch all product details for items in the cart
  const fetchProductsForCart = async () => {
    try {
      const fetchedProducts = await Promise.all(
        cart.map((item) => fetchProductById(item.id))
      );
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products for cart:", error);
      toast.error("Error loading cart details.");
    }
  };

  // Add product to cart
  const addToCart = (product, quantity) => {
    try {
      if (product.status === "unavailable") {
        return toast.error("Product is unavailable");
      }

      const prod = { id: product._id, quantity };
      const updatedCart = [...cart];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === product._id
      );

      if (existingProductIndex >= 0) {
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        updatedCart.push(prod);
      }

      setCart(updatedCart);
      toast.success(
        `Added ${quantity} ${capitalizeWords(product.productName)}'s to cart`
      );
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  };

  // Remove product from cart
  const removeFromCart = (product) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== product._id);
      setCart(updatedCart);
      toast.success(
        `Removed ${capitalizeWords(product.productName)} from cart`
      );
    } catch (error) {
      toast.error("Error removing product from cart");
    }
  };

  // Update product quantity in cart
  const updateCart = (product, quantity) => {
    try {
      if (product.status === "unavailable") {
        return toast.error("Product is unavailable");
      }

      const updatedCart = [...cart];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === product._id
      );

      if (existingProductIndex >= 0) {
        if (quantity > 0) {
          updatedCart[existingProductIndex].quantity = quantity;
          setCart(updatedCart);
          toast.success(
            `Updated quantity of ${capitalizeWords(
              product.productName
            )} to ${quantity}`
          );
        } else {
          // Remove the product if quantity is 0 or less
          updatedCart.splice(existingProductIndex, 1);
          setCart(updatedCart);
          toast.success(
            `Removed ${capitalizeWords(product.productName)} from cart`
          );
        }
      } else {
        toast.error("Product not found in cart");
      }
    } catch (error) {
      toast.error("Error updating cart");
    }
  };

  // Get total number of items in the cart
  const getNumItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get the total cost of items in the cart
  const getTotalCost = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p._id === item.id);
      const price =
        product?.discountPrice && product.discountPrice > 0
          ? product.discountPrice
          : product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        removeFromCart,
        updateCart,
        getNumItems,
        getTotalCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
