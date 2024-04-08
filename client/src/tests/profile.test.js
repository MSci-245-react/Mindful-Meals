import React from 'react';
import { render } from '@testing-library/react';
import ProfilePage from '../components/Profilepage';

jest.mock('../components/Firebase', () => ({
    withFirebase: Component => props => <Component {...props} firebase={{ auth: { currentUser: { email: 'test@test.ca' } } }} />
}));

describe('ProfilePage Component', () => {
    test('renders ProfilePage component', async () => { // Note the async keyword here
        const { findByText } = render(<ProfilePage />);
        const welcomeMessage = await findByText(/Welcome to Mindful Meals/i); // Use findByText to wait for the element to appear
        expect(welcomeMessage).toBeInTheDocument();
    });
});
