import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';


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

    const handleRedirect = () => {
      window.location.href='/Profilepage';
    };
  

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
              setLoggedIn(true);

              localStorage.setItem('userName', userName);
              localStorage.setItem('password', password);
              
              setTimeout(() => {
                handleRedirect();
              }, 3000);

            } else {
              const errorData = await response.json();
              setErrors(errorData.error || 'Sign-in failed');
            }
          } catch (error) {
            setErrors('An error occurred while signing in');
            console.error('Error signing in:', error);
          }
    };

    return (
        <div className='container'>
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
          {loggedIn && 
          <p>Sign In Successful!</p>}
        </div>
      );
}

export default SignIn;