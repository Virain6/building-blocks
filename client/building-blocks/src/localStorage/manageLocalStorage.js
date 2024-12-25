import { toast } from "react-toastify";
const key = "keystone_Cart";

export const addToCart = (product, quantity) => {
  try {
    if (product.status === "unavailable") {
      return toast.error("Product is unavailable");
    }

    const prod = { id: product._id, quantity: quantity };
    let cart = [];

    if (localStorage.getItem(key)) {
      cart = JSON.parse(localStorage.getItem(key));
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product._id
    );

    if (existingProductIndex >= 0) {
      // If product exists, update its quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Otherwise, add the new product
      cart.push(prod);
    }

    localStorage.setItem(key, JSON.stringify(cart));
    toast.success(`Added ${quantity} ${product.productName}'s to cart`);
  } catch (error) {
    toast.error("Error adding product to cart:", error);
  }
};

export const getCart = () => {
  try {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return []; // Return an empty array if cart is empty
  } catch (error) {
    toast.error("Error getting cart:", error);
  }
};

export const removeFromCart = (product) => {
  try {
    if (localStorage.getItem(key)) {
      let cart = JSON.parse(localStorage.getItem(key));
      cart = cart.filter((item) => item.id !== product._id);
      localStorage.setItem(key, JSON.stringify(cart));
      toast.success(`Removed ${product.productName} from cart`);
    }
    toast.error("Cart is empty");
  } catch (error) {
    toast.error("Error removing product from cart:", error);
  }
};

export const updateCart = (product, quantity) => {
  try {
    if (product.status === "unavailable") {
      return toast.error("Product is unavailable");
    }
    if (localStorage.getItem(key)) {
      let cart = JSON.parse(localStorage.getItem(key));
      const index = cart.findIndex((item) => item.id === product._id);

      if (index >= 0) {
        if (quantity > 0) {
          cart[index].quantity = quantity; // Update quantity
          localStorage.setItem(key, JSON.stringify(cart));
          toast.success(
            `Updated quantity of ${product.productName} to ${quantity}`
          );
        } else {
          // Remove the product if quantity is 0 or less
          cart = cart.filter((item) => item.id !== product._id);
          localStorage.setItem(key, JSON.stringify(cart));
          toast.success(`Removed ${product.productName} from cart`);
        }
      }
    }
    toast.error("Cart is empty");
  } catch (error) {
    toast.error("Error updating cart:", error);
  }
};
