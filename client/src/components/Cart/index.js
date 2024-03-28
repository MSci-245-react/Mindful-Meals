import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => { 
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === newItem.id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const increaseItemQuantity = (itemId) => {
    console.log('Attempting to increase quantity for item with id:', itemId);
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const decreaseItemQuantity = (itemId) => {
    console.log('Attempting to decrease quantity for item with id:', itemId);
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === itemId) {
          return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0) // This removes the item if the quantity is 0
    );
  };
  
  const removeFromCart = (itemId) => {
    console.log('Attempting to remove item with id:', itemId);
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    console.log('Cart Items Updated:', cartItems);
  }, [cartItems]);

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