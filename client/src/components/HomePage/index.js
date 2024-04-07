import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import backgroundImage from './background.jpg';
import {useNavigate} from 'react-router-dom';

const Landing = () => {
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
      <div style={buttonContainerStyle}>
      </div>
    </div>
  </div>
  );
};

export default Landing;
