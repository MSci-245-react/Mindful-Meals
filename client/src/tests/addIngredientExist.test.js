import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeFinder from '../components/RecipeFinder/index.js';

// Mock the Firebase module
jest.mock('../components/Firebase', () => ({
  withFirebase: Component => props => <Component {...props} firebase={{ auth: { currentUser: { email: 'test@example.com' } } }} />
}));

// This tests if "Added Ingredients" heading exists in the recipe finder page
describe('RecipeFinder Component', () => {
  test('should contain "Added Ingredients" text on webpage', () => {
    render(<RecipeFinder />);
    const addIngredientsText = screen.getByText('Added Ingredients');
    expect(addIngredientsText).toBeInTheDocument();
  });
});
