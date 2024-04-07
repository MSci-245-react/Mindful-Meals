import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';

const SignOut = ({ firebase }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogout = () => {
        firebase
            .doSignOut()
            .then(() => {
                navigate('/', { replace: true });
            })
            .catch(error => {
                setError(error);
            });
    };

    return (
        <div className='container'>
            <h1 className="logout-message">Are you sure you want to log out?</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default withFirebase(SignOut);

