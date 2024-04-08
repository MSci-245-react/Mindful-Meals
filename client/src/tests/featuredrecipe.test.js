import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedRecipes from '../components/FeaturedRecipes'; // Adjust the import path as necessary

describe('FeaturedRecipes Page', () => {
  it('displays the heading and each featured recipe', () => {
    render(<FeaturedRecipes />);
    
    // Check for the presence of the page heading
    expect(screen.getByText('Featured Recipes')).toBeInTheDocument();
    
    // Check for the presence of each recipe name
    const recipeNames = [
      'Low-Fat Berry Blue Frozen Dessert',
      'Butter Pecan Cookies',
      'Bourbon Pecan Pound Cake',
      'Brazilian Empadinhas',
      'Yorkshire Pudding',
      'Tofu-Vegetable Kebabs',
      'Black Bean, Corn, and Tomato Salad',
      'Chanfana Ou Lampantana'
    ];

    recipeNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // Optionally, check for the presence of images and descriptions
    const recipeDescriptions = [
      'A delicious dessert with fresh berries and yogurt.',
      // Add other descriptions as needed for testing
    ];

    recipeDescriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    // Check for images, optionally
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(8); // Assuming at least 8 recipes are displayed
  });
});
