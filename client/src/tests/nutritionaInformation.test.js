import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionalInformationTable from '../components/NutritionalInformation/index.js';

describe('Nutritional Information Component', () => {
  test('should contain the appropriate headings in the chart', () => {
    render(<NutritionalInformationTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Carbohydrates (g)')).toBeInTheDocument();
    expect(screen.getByText('Protein (g)')).toBeInTheDocument();
  });
});
