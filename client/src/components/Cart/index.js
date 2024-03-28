import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Try to load the cart items from localStorage
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    // Save the cart items to localStorage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === newItem.id);
      if (itemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        // New item, add to cart
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const increaseItemQuantity = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseItemQuantity = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter((item) => item != null)
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseItemQuantity,
      decreaseItemQuantity, 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;  

