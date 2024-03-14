import React from 'react';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import HomePage from '../HomePage';
import Profilepage from '../Profilepage'
import NutritionalInformation from '../NutritionalInformation';
import RecipeFinder from '../RecipeFinder';
import RecipeDetail from '../RecipeDetail';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigationBar from '../NavigationBar';

function App() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/RecipeFinder" element={<RecipeFinder />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profilepage" element={<Profilepage />} />
          <Route
            path="/NutritionalInformation"
            element={<NutritionalInformation />}
          />
          <Route path="/recipe/:RecipeId" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
