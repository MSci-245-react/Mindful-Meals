import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionalInformationTable from './src/components/NutritionalInformation/index.js';

describe('Nutritional Information Component', () => {
  test('should contain the appropriate headings in the chart', () => {
    render(<NutritionalInformationTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Calories')).toBeInTheDocument();
    expect(screen.getByText('Fat Content')).toBeInTheDocument();
    expect(screen.getByText('Saturated Fat')).toBeInTheDocument();
    expect(screen.getByText('Cholesterol')).toBeInTheDocument();
    expect(screen.getByText('Sodium')).toBeInTheDocument();
    expect(screen.getByText('Carbohydrates')).toBeInTheDocument();
    expect(screen.getByText('Fiber')).toBeInTheDocument();
    expect(screen.getByText('Sugar')).toBeInTheDocument();
    expect(screen.getByText('Protein')).toBeInTheDocument();
  });
});
