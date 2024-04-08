// Import CartContext and any other dependencies
import { CartContext } from '../components/Cart/index.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionalInformationTable from '../components/NutritionalInformation/index.js';

// Mock CartContext
jest.mock('../path/to/CartContext', () => ({
  ...jest.requireActual('../path/to/CartContext'), // Use the actual CartContext module
  useContext: () => ({ addToCart: jest.fn() }), // Mock addToCart function
}));

// Mock Firebase
jest.mock('../components/Firebase', () => ({
  withFirebase: Component => props => (
    <Component {...props} firebase={{ auth: { currentUser: { email: 'test@test.ca' } } }} />
  ),
}));

describe('Nutritional Information Component', () => {
  test('should contain the appropriate headings in the chart', () => {
    render(<NutritionalInformationTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Carbohydrates (g)')).toBeInTheDocument();
    expect(screen.getByText('Protein (g)')).toBeInTheDocument();
  });
});
