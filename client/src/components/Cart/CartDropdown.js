// CartDropdown.js

import React, { useContext } from 'react';
import { CartContext } from '../Cart';
import './CartDropdown.css'; 

const CartDropdown = () => {
  const { cartItems, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length === 0 && <div className="empty-message">Your cart is empty</div>}
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="item-details">
              <span className="name">{item.Shrt_Desc}</span>
              <span className="price">
                <div className="quantity">
                  <div className="arrow" onClick={() => decreaseItemQuantity(item.id)}>&#10094;</div>
                  <span className="value">{item.quantity}</span>
                  <div className="arrow" onClick={() => increaseItemQuantity(item.id)}>&#10095;</div>
                </div>
                ${item.price} {/*  need to add price to your item model */}
              </span>
            </div>
            <div className="remove-button" onClick={() => removeFromCart(item.id)}>
              &#10005;
            </div>
          </div>
        ))}
      </div>
      {}
    </div>
  );
};

export default CartDropdown;
