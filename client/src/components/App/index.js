import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profilepage from '../Profilepage'
import NutritionalInformation from '../NutritionalInformation';
import RecipeFinder from '../RecipeFinder';
import RecipeDetail from '../RecipeDetail';
import NavigationBar from '../NavigationBar';
import CartProvider from '../Cart'; // Using braces for a named export
import CartPage from '../CartPage'; 

function App() {
  return (
    <CartProvider> {/* Wrap your application with CartProvider */}
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profilepage" element={<Profilepage />} />
          <Route path="/NutritionalInformation" element={<NutritionalInformation />} />
          <Route path="/RecipeFinder" element={<RecipeFinder />} />
          <Route path="/recipe/:RecipeId" element={<RecipeDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
