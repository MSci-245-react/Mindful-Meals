import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import backgroundImage from './background.jpg';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../Navigation/PrivateRoute';

const Landing = ({ authenticated }) => {
  const navigate = useNavigate();

  

  const containerStyle = {
    height: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const bubbleStyle = {
    background: '#1b1b1b',
    color: '#fff',
    padding: '20px',
    borderRadius: '20px',
    textAlign: 'center',
  };

  const buttonStyle = {
    margin: '10px',
  };

  const handleSignIn = () => {
    navigate('/SignIn');
  };

  const handleSignUp = () => {
    navigate('/SignUp');
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };


  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        <Typography
          variant="h3"
          color="inherit"
          noWrap
          sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}
        >

          Mindful Meals
        </Typography>
        {!authenticated && (
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleSignIn}>Sign In</button>
            <button style={buttonStyle} onClick={handleSignUp}>Sign Up</button>
          </div>
        )}
      </div>
    </div >
  );
};


export default Landing;
