import React, { useState, useContext } from 'react'; // Added useState to the import
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { CartContext } from '../Cart';
import CartDropdown from '../Cart/CartDropdown';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../HomePage';
import SignIn from '../SignIn';
import { withFirebase } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const NavigationBar = ({ authenticated }) => {
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderSignOutLink = authenticated ? (
    <li>
      <Link
        component={RouterLink}
        to="/SignOut"
        style={{ textDecoration: 'none', color: '#fff' }}
      >
        SignOut
      </Link>
    </li>
  ) : null;

  const renderNutritionalLink = authenticated ? (
    <li>
      <Link
        component={RouterLink}
        to="/NutritionalInformation"
        style={{ textDecoration: 'none', color: '#fff' }}
      >
        Nutritional Information
      </Link>
    </li>
  ) : null;

  const renderReceipesLink = authenticated ? (
    <li>
      <Link
        component={RouterLink}
        to="/RecipeFinder"
        style={{ textDecoration: 'none', color: '#fff' }}
      >
        Recipe Finder
      </Link>
    </li>
  ) : null;

  const renderGroceriesLink = authenticated ? (
    <li
      style={{ cursor: 'pointer', color: '#fff' }}
      onClick={() => setIsCartOpen(!isCartOpen)}
    >
      Grocery Cart ({cartItemCount})
    </li>
  ) : null;

  const renderProfileLink = authenticated ? (
    <li>
      <Link
        component={RouterLink}
        to="/Profile"
        style={{ textDecoration: 'none', color: '#fff' }}
      >
        Profile
      </Link>
    </li>
  ) : null;


  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
          *{
            margin: 0;
            padding: 0;  
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }
          ::selection{
            color: #000;
            background: #fff;
          }
          nav{
            position: fixed;
            top: 0; /* Ensures navigation bar is always at the top */
            left: 0; /* Ensures navigation bar spans from the left edge */
            right: 0; /* Ensures navigation bar spans to the right edge */
            background: #1b1b1b;
            width: 100%;
            padding: 10px 0;
            padding-bottom: 20px;
            z-index: 12; /* Ensures navigation bar is above other content */
          }
          nav .menu{
            max-width: 1250px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
          }
          .menu .logo a{
            text-decoration: none;
            color: #fff;
            font-size: 35px;
            font-weight: 600;
          }
          .menu ul{
            display: inline-flex;
          }
          .menu ul li{
            list-style: none;
            margin-left: 7px;
          }
          .menu ul li:first-child{
            margin-left: 0px;
          }
          .menu ul li a{
            text-decoration: none;
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            padding: 8px 15px;
            border-radius: 5px;
            transition: all 0.3s ease;
          }
          .menu ul li a:hover{
            background: #fff;
            color: black;
          }
        `}
      </style>
      <nav>
        <div className="menu">
          <div className="logo">
            <Link
              component={RouterLink}
              to="/"
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              Mindful Meals
            </Link>
          </div>
          <ul>
            {renderNutritionalLink}
            {renderReceipesLink}
            {renderGroceriesLink}
          </ul>
          {isCartOpen && <CartDropdown />}
          {renderProfileLink}
          {renderSignOutLink}
        </div>
      </nav >
    </div >
  );
};

export default NavigationBar;
