import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfilePage from '../components/Profilepage';

jest.mock('../components/Firebase', () => ({
    withFirebase: Component => props => <Component {...props} firebase={{ auth: { currentUser: { email: 'test@test.ca' } } }} />
}));


describe('ProfilePage Component', () => {
    test('renders ProfilePage component', () => {
        const { getByText } = render(<ProfilePage />);
        const welcomeMessage = getByText(/Welcome to Mindful Meals/i);
        expect(welcomeMessage).toBeInTheDocument();
    });
});