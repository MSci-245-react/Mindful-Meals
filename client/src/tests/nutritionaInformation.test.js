import {CartContext} from '../components/Cart/index.js';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionalInformationTable from '../components/NutritionalInformation/index.js';

// Mock Firebase
jest.mock('../components/Firebase', () => ({
  withFirebase: Component => props =>
    (
      <Component
        {...props}
        firebase={{auth: {currentUser: {email: 'test@test.ca'}}}}
      />
    ),
}));

// Mock context value
const mockCartContextValue = {
  addToCart: jest.fn(), // Mock function for addToCart
  // Add other context values if there are any
};

describe('Nutritional Information Component', () => {
  test('should contain the appropriate headings in the chart', () => {
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <NutritionalInformationTable />
      </CartContext.Provider>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Carbohydrates (g)')).toBeInTheDocument();
    expect(screen.getByText('Protein (g)')).toBeInTheDocument();
  });
});
