// CartContext.test.js
import React, { useContext } from 'react'; // Import useContext here
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../components/Cart';

const mockSetCartItems = jest.fn();

// This dummy cartItems array will act as our initial state for the cartItems
const cartItems = [
  { id: '1', name: 'Test Item 1', quantity: 1 },
  { id: '2', name: 'Test Item 2', quantity: 2 },
];

// Create a mock CartProvider for our tests
const MockCartProvider = ({ children }) => {
  return (
    <CartContext.Provider value={{ cartItems, setCartItems: mockSetCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Our test component that uses the CartContext
const TestComponent = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))}
      <button onClick={() => setCartItems([...cartItems, { id: '3', name: 'Test Item 3', quantity: 1 }])}>
        Add Item
      </button>
    </div>
  );
};

describe('CartContext', () => {
  it('should call setCartItems when adding an item', () => {
    render(
      <MockCartProvider>
        <TestComponent />
      </MockCartProvider>
    );

    screen.getByText('Add Item').click();
    expect(mockSetCartItems).toHaveBeenCalledWith([...cartItems, { id: '3', name: 'Test Item 3', quantity: 1 }]);
  });
});
