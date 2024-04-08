import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from 'react-router-dom';
import SignOut from '../components/SignOut';

jest.mock('../components/Firebase', () => ({
  withFirebase: Component => props =>
    (
      <Component
        {...props}
        firebase={{auth: {currentUser: {email: 'test@test.ca'}}}}
      />
    ),
}));

describe('SignOut', () => {
  test('renders sign out page', () => {
    render(
      <BrowserRouter>
        <SignOut />
      </BrowserRouter>,
    );

    expect(
      screen.getByText('Are you sure you want to log out?'),
    ).toBeInTheDocument();
  });
});