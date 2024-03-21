import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RecipeFinder from '../components/RecipeFinder/index.js';

describe('RecipeFinder Component', () => {
  test('checks if inputted ingredients are added to ingredient list', async () => {
    render(<RecipeFinder />);

    const input = screen.getByPlaceholderText('Enter Ingredients');

    await userEvent.type(input, 'onion');

    const addButton = screen.getByRole('button', {name: 'Add'});
    await userEvent.click(addButton);

    expect(screen.getByText('onion')).toBeInTheDocument();
  });
});
