import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../HomePage';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profilepage from '../Profilepage';
import NutritionalInformation from '../NutritionalInformation';
import RecipeFinder from '../RecipeFinder';
import RecipeDetail from '../RecipeDetail';
import CartPage from '../CartPage';
import NavigationBar from '../NavigationBar';
import SignOut from '../SignOut';
import ProfilePage from '../Profilepage';

const PrivateRoute = ({ authenticated }) => {
  return (
    <React.Fragment>
      <NavigationBar authenticated={authenticated} />
      < Routes >
        <Route path="/" element={<HomePage authenticated={authenticated} />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Profilepage" element={<Profilepage />} />
        <Route path="/SignOut" element={<SignOut />} />
        <Route path="/NutritionalInformation"
          element={<NutritionalInformation />}
        />
        <Route path="/RecipeFinder" element={<RecipeFinder />} />
        <Route path="/recipe/:RecipeId" element={<RecipeDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
      </Routes>
    </React.Fragment >
  );
};

export default PrivateRoute;
