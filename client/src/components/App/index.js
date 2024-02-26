import React from 'react';
import Review from './Review';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import HomePage from '../HomePage';
import NutritionalInformation from '../NutritionalInformation';
import RecipeFinder from '../RecipeFinder';
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
          <Route
            path="/NutritionalInformation"
            element={<NutritionalInformation />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
