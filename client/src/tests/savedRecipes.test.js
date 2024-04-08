import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeFinder from '../components/RecipeFinder';

jest.mock('../components/Firebase', () => ({
  withFirebase: Component => props => <Component {...props} firebase={{ auth: { currentUser: { email: 'test@test.ca' } } }} />
}));

describe('RecipeFinder Component', () => {
  jest.mock('firebase/auth', () => {
    return {
      getAuth: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      // Mock other methods as needed
    };
  });

  test('saves recipe correctly', async () => {
    const { getByText } = render(<RecipeFinder />);

    const dietary = getByText('Search Recipes');
    fireEvent.click(dietary);
  });
});
