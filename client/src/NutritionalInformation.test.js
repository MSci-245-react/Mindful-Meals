import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NutritionalInformation from './components/NutritionalInformation';

// Mock the server response
const mockData = [
  {
    Shrt_Desc: 'Butter,with salt',
    'Protein_(g)': '0.85',
    'Carbohydrt_(g)': '0.06',
    'Water_(g)': '15.87',
    'Energ_Kcal': '717',
    'Lipid_Tot_(g)': '81.11',
    'Ash_(g)': '2.11',
    'Fiber_TD_(g)': '0.0',
    'Sugar_Tot_(g)': '0.06',
    'Calcium_(mg)': '24',
    'Iron_(mg)': '0.02',
    'Vit_C_(mg)': '0'
    
  }
  
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData)
    })
  );
});

describe('NutritionalInformation', () => {
  it('renders the search input', () => {
    render(<NutritionalInformation />);
    expect(screen.getByPlaceholderText(/search ingredients.../i)).toBeInTheDocument();
  });

  it('filters the table data based on search input', async () => {
    render(<NutritionalInformation />);

    fireEvent.change(screen.getByPlaceholderText(/search ingredients.../i), {
      target: { value: 'Butter' }
    });

   
  });
});
