import React from 'react';
import HomePage from '../HomePage';
import SignUp from '../SignUp';
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
