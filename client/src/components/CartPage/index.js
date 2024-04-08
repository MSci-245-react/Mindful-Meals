import './CartPage.css'; 
import React, { useContext } from 'react';
import { CartContext } from '../Cart'; // Ensure the path is correct

const CartPage = () => {
    const { cartItems, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useContext(CartContext);

    if (cartItems.length === 0) {
        return <h2>Your cart is empty</h2>;
    }

    return (
        <div className="cart-container">
          <h2>Cart Items</h2>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
      {cartItems.map((item) => (
        <tr key={item.id}>
          <td>{item.Shrt_Desc}</td>
          <td>{item.quantity}</td>
          <td>
            <button onClick={() => increaseItemQuantity(item.id)}>+</button>
            <button onClick={() => decreaseItemQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </td>
        </tr>
      ))}
    </tbody> 
          </table>
        </div>
      );
    };
export default CartPage;

