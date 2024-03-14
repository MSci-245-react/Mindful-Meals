import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RecipeFinder from './src/components/RecipeFinder/index.js';

describe('RecipeFinder Component', () => {
  test('checks if inputted ingredients are added to ingredient list', async () => {
    render(<RecipeFinder />);

    // Find the input field by its placeholder text
    const input = screen.getByPlaceholderText('Enter Ingredients');

    // Simulate typing "onion" into the input field
    await userEvent.type(input, 'onion');

    // Find the "Add" button and click it to add the ingredient
    const addButton = screen.getByRole('button', {name: 'Add'});
    await userEvent.click(addButton);

    // Check that the ingredient now appears in the ingredients list
    // This assumes that the ingredients are rendered as text in the document
    expect(screen.getByText('onion')).toBeInTheDocument();
  });
});
