import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeFinder from '../components/RecipeFinder';

describe('RecipeFinder Component', () => {
  test('saves recipe correctly', async () => {
    const { getByText } = render(<RecipeFinder />);

    const dietary = getByText('Search Recipes');
    fireEvent.click(dietary);

  });
});

