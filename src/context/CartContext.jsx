import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (medicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === medicine.name);
      if (existing) {
        return prev.map((item) =>
          item.name === medicine.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const updateQuantity = (name, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQ) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
