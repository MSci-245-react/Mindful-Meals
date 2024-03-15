import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Profilepage from './src/components/Profilepage';

// This jest tests if all the relevant textboxes are there
describe('Profilepage', ()=> {
    test('renders profile page', () => {

        render(<Profilepage />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Bio')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Dietary Restrictions')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'SAVE CHANGES' })).toBeInTheDocument();

    });

});