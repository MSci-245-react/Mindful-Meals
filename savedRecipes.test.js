import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecipeFinder from './RecipeFinder';

describe('RecipeFinder Component', () => {
  test('saves recipe correctly', () => {
    const { getByText } = render(<RecipeFinder />);

    const dietary = getByText('Search Recipes')
    fireEvent.click(dietary)

    const saveRecipeButton = getByText('Save Recipe');
    fireEvent.click(saveRecipeButton);

    const showRecipes = getByText('Show Saved Recipes')

    expect('Low-Fat Berry Blue Frozen Dessert').toBeTruthy();
  });
});
