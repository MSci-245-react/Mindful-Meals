import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';


const SignIn = ({ firebase }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRedirect = () => {
    window.location.href = '/Profilepage';
  };

  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect or state reset logic here
        navigate('/');
      })
      .catch(error => {
        setError(error);
      });
  };

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  return (
    <div className='container_si'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="error">{error.message}</p>}
    </div>
  );

}

export default withFirebase(SignIn);