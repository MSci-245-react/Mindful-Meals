import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './SignUp.css';


const serverURL = '';

const SignUp = () => {

  // create the states of the various fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValiid, setIsValid] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

  const handleFirstNameChange = event => {
    // update the state of the firstName
    setFirstName(event.target.value);

    // set the error state to false
    setErrors(prevErrors => ({...prevErrors, firstName: false}));

    // don't show confirmation message
    setShowConfirmation(false);
  };

  const handleLastNameChange = event => {
    setLastName(event.target.value);
    setErrors(prevErrors => ({...prevErrors, lastName: false}));
    setShowConfirmation(false);
  };

  const handleUserNameChange = event => {
    setUserName(event.target.value);
    setErrors(prevErrors => ({...prevErrors, userName: false}));
    setShowConfirmation(false);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({...prevErrors, email: false}));
    setShowConfirmation(false);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    setErrors(prevErrors => ({...prevErrors, password: false}));
    setShowConfirmation(false);
  };

  const handleRedirect = () => {
    window.location.href='/SignIn';
  };

  // function to call the sign up api function
  const callApiSignUp = async reviewData => {
    const url = serverURL + '/api/SignUp';
    console.log('Sending review data to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // once the button is pressed, we are checking if all the fields are filled
  const handleSubmit = event => {
    event.preventDefault();
    let hasErrors = false;
    const newErrors = {};

    // if the fields are empty then the newErrors state for that field will be true
    if (!firstName) {
      newErrors.firstName = true;
      hasErrors = true;
    }
    if (!lastName) {
      newErrors.lastName = true;
      hasErrors = true;
    }
    if (!userName) {
      newErrors.userName = true;
      hasErrors = true;
    }
    if (!email) {
      newErrors.email = true;
      hasErrors = true;
    }
    if (!password) {
      newErrors.password = true;
      hasErrors = true;
    }

    if (!isValidEmail(email)) {
      newErrors.email = true;
      hasErrors = true;
    }

    // if there is any errors, we update the state of setErrors, and confirmation
    if (hasErrors) {
      setErrors(newErrors);
      setShowConfirmation(false);
    } else {
      // create an object for the information we want to send to the database
      const reviewData = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      };

      // call the API function
      callApiSignUp(reviewData)
        .then(res => {
          console.log('callApiAddUser response: ', res);
          setShowConfirmation(true);
          setErrors({});
          setFirstName('');
          setLastName('');
          setUserName('');
          setEmail('');
          setPassword('');
          
          setTimeout(() => {
            handleRedirect();
          }, 5000);
        
        })
        .catch(error => {
          console.error('Error adding user:', error.message);
        });
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
        <br />
        {errors.firstName && (
          <span className="error">Please enter your first name</span>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        <br />
        {errors.lastName && (
          <span className="error">Please enter your last name</span>
        )}

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <br />
        {errors.userName && (
          <span className="error">Please enter a username</span>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <br />
        {errors.email && (
          <span className="error">Please enter a valid email address</span>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br />
        {errors.password && (
          <span className="error">Please enter a password</span>
        )}

        <button type="submit">Sign Up</button>
      </form>

      {showConfirmation &&
      <p>Sign up successful! Redirecting...</p>}
    </div>
  );
};

export default SignUp;
