import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RecipeDetail from '../components/RecipeDetail/index.js';

describe('RecipeDetail Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({success: true}),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Checks if review inputs are sent to the DB', async () => {
    render(<RecipeDetail />);

    const title = screen.getByPlaceholderText('Enter Review Title');
    const body = screen.getByPlaceholderText('Enter Review Body');
    const button = screen.getByText('Submit Review');

    await userEvent.type(title, 'Review Title');
    await userEvent.type(body, 'Review Body');
    userEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(title).toHaveValue('');
      expect(body).toHaveValue('');
    });
  });
});
