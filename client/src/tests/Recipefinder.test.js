import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RecipeFinder from '../components/RecipeFinder';


jest.mock('../components/Firebase', () => ({
    withFirebase: Component => props => <Component {...props} firebase={{ auth: { currentUser: { email: 'test@test.ca' } } }} />
  }));
  
describe('RecipeFinder Component', () => {
  test('checks if the "Search Recipes" button is clickable', async () => {
    render(<RecipeFinder />);

    const searchButton = screen.getByRole('button', { name: 'Search Recipes' });

    await userEvent.click(searchButton);
 
    expect(searchButton).toBeInTheDocument();

  });
});
