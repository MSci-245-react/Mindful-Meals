import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './src/components/SignUp';


describe('SignUp', ()=> {
    test('renders sign up form', () => {

        render(<SignUp />);

        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sign Up')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sign Up')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sign Up')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sign Up')).toBeInTheDocument();

    })


})