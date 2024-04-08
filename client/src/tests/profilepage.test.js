import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../components/Profilepage';

jest.mock('../components/Firebase', () => ({
    withFirebase: Component => props => <Component {...props} firebase={{ auth: { currentUser: { email: 'test@test.ca' } } }} />
}));

const mockUserProfile = {
  firstName: 'Test2',
  lastName: 'test2',
  email: 'test@test.ca',
  bio: 'Hi, my name is Dhruv',
};

// Custom query function to find text in top-level element
const findByText = (content) => {
  return screen.getByText((_, node) => {
    const hasText = node.textContent === content;
    const childrenDontHaveText = Array.from(node.children).every(child => !hasText(child.textContent));
    return hasText && childrenDontHaveText;
  });
};

describe('Profile Page', () => {
  it('displays the correct heading and bio without considering Firebase directly', () => {
    render(<ProfilePage userProfile={mockUserProfile} />);

    // Use custom query function to find the text partially
    expect(findByText('Welcome to Mindful Meals')).toBeInTheDocument();
    expect(screen.getByText('Hi, my name is Dhruv')).toBeInTheDocument();
  });
});
