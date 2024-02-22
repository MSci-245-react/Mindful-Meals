import React, { useState } from 'react';

const serverURL = "";

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setErrors] = useState('');

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/signIn', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userName, password }),
            });
      
            if (response.ok) {
              setIsLoggedIn(true);
            } else {
              const errorData = await response.json();
              setError(errorData.error || 'Sign-in failed');
            }
          } catch (error) {
            setError('An error occurred while signing in');
            console.error('Error signing in:', error);
          }

          if (LoggedIn) {
            // Redirect the user to the dashboard or home page
            return <Redirect to="/Review" />;
          }

    };

    return (
        <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <br />
            <button type="submit">Sign In</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      );
}

export default SignIn;